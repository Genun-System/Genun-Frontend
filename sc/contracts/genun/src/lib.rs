#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol,
};

const ADMIN: Symbol = symbol_short!("ADMIN");
const NEXT_ID: Symbol = symbol_short!("NEXT_ID");

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    NotInitialized = 1,
    AlreadyInitialized = 2,
    Unauthorized = 3,
    InvalidQuantity = 4,
    EmptyProductName = 5,
    BatchNotFound = 6,
    BatchInactive = 7,
    InsufficientBalance = 8,
    NotBatchCreator = 9,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BatchInfo {
    pub batch_id: u64,
    pub product_name: String,
    pub manufacturer_name: String,
    pub creator: Address,
    pub total_supply: u64,
    pub manufacture_date: u64,
    pub metadata_uri: String,
    pub is_active: bool,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Manufacturer(Address),
    Batch(u64),
    Balance(Address, u64),
    Verified(Address, u64),
}

#[contract]
pub struct Genun;

#[contractimpl]
impl Genun {
    pub fn initialize(env: Env, admin: Address) -> Result<(), Error> {
        if env.storage().instance().has(&ADMIN) {
            return Err(Error::AlreadyInitialized);
        }
        admin.require_auth();
        env.storage().instance().set(&ADMIN, &admin);
        env.storage().instance().set(&NEXT_ID, &0u64);
        Ok(())
    }

    pub fn add_manufacturer(env: Env, manufacturer: Address) -> Result<(), Error> {
        Self::require_admin(&env)?;
        env.storage()
            .persistent()
            .set(&DataKey::Manufacturer(manufacturer), &true);
        Ok(())
    }

    pub fn remove_manufacturer(env: Env, manufacturer: Address) -> Result<(), Error> {
        Self::require_admin(&env)?;
        env.storage()
            .persistent()
            .remove(&DataKey::Manufacturer(manufacturer));
        Ok(())
    }

    pub fn is_manufacturer(env: Env, account: Address) -> bool {
        env.storage()
            .persistent()
            .get(&DataKey::Manufacturer(account))
            .unwrap_or(false)
    }

    pub fn create_batch(
        env: Env,
        caller: Address,
        product_name: String,
        manufacturer_name: String,
        quantity: u64,
        metadata_uri: String,
    ) -> Result<u64, Error> {
        caller.require_auth();
        if !Self::is_manufacturer(env.clone(), caller.clone()) {
            return Err(Error::Unauthorized);
        }
        if quantity == 0 {
            return Err(Error::InvalidQuantity);
        }
        if product_name.len() == 0 {
            return Err(Error::EmptyProductName);
        }

        let mut next_id: u64 = env.storage().instance().get(&NEXT_ID).unwrap_or(0);
        next_id += 1;
        env.storage().instance().set(&NEXT_ID, &next_id);

        let batch = BatchInfo {
            batch_id: next_id,
            product_name: product_name.clone(),
            manufacturer_name: manufacturer_name.clone(),
            creator: caller.clone(),
            total_supply: quantity,
            manufacture_date: env.ledger().timestamp(),
            metadata_uri,
            is_active: true,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Batch(next_id), &batch);
        env.storage()
            .persistent()
            .set(&DataKey::Balance(caller.clone(), next_id), &quantity);

        env.events().publish(
            (symbol_short!("batch"), symbol_short!("created")),
            (next_id, product_name, manufacturer_name, quantity),
        );

        Ok(next_id)
    }

    pub fn transfer(
        env: Env,
        from: Address,
        to: Address,
        batch_id: u64,
        amount: u64,
    ) -> Result<(), Error> {
        from.require_auth();
        if amount == 0 {
            return Err(Error::InvalidQuantity);
        }
        let from_bal = Self::balance_of(env.clone(), from.clone(), batch_id);
        if from_bal < amount {
            return Err(Error::InsufficientBalance);
        }
        let to_bal = Self::balance_of(env.clone(), to.clone(), batch_id);

        env.storage()
            .persistent()
            .set(&DataKey::Balance(from.clone(), batch_id), &(from_bal - amount));
        env.storage()
            .persistent()
            .set(&DataKey::Balance(to.clone(), batch_id), &(to_bal + amount));

        env.events().publish(
            (symbol_short!("batch"), symbol_short!("xfer")),
            (batch_id, from, to, amount),
        );
        Ok(())
    }

    pub fn balance_of(env: Env, owner: Address, batch_id: u64) -> u64 {
        env.storage()
            .persistent()
            .get(&DataKey::Balance(owner, batch_id))
            .unwrap_or(0)
    }

    pub fn verify_product(env: Env, batch_id: u64, owner: Address) -> bool {
        let Some(batch) = Self::get_batch_opt(&env, batch_id) else {
            return false;
        };
        if !batch.is_active {
            return false;
        }
        Self::balance_of(env, owner, batch_id) > 0
    }

    pub fn mark_as_verified(env: Env, caller: Address, batch_id: u64) -> Result<(), Error> {
        caller.require_auth();
        let batch = Self::get_batch_opt(&env, batch_id).ok_or(Error::BatchNotFound)?;
        if !batch.is_active {
            return Err(Error::BatchInactive);
        }
        if Self::balance_of(env.clone(), caller.clone(), batch_id) == 0 {
            return Err(Error::InsufficientBalance);
        }
        env.storage()
            .persistent()
            .set(&DataKey::Verified(caller.clone(), batch_id), &true);
        env.events().publish(
            (symbol_short!("batch"), symbol_short!("verified")),
            (batch_id, caller),
        );
        Ok(())
    }

    pub fn is_verified(env: Env, owner: Address, batch_id: u64) -> bool {
        env.storage()
            .persistent()
            .get(&DataKey::Verified(owner, batch_id))
            .unwrap_or(false)
    }

    pub fn get_batch_info(env: Env, batch_id: u64) -> Result<BatchInfo, Error> {
        Self::get_batch_opt(&env, batch_id).ok_or(Error::BatchNotFound)
    }

    pub fn deactivate_batch(env: Env, caller: Address, batch_id: u64) -> Result<(), Error> {
        caller.require_auth();
        let mut batch = Self::get_batch_opt(&env, batch_id).ok_or(Error::BatchNotFound)?;
        if batch.creator != caller {
            return Err(Error::NotBatchCreator);
        }
        if !batch.is_active {
            return Err(Error::BatchInactive);
        }
        batch.is_active = false;
        env.storage()
            .persistent()
            .set(&DataKey::Batch(batch_id), &batch);
        env.events()
            .publish((symbol_short!("batch"), symbol_short!("deact")), batch_id);
        Ok(())
    }

    pub fn get_current_batch_id(env: Env) -> u64 {
        env.storage().instance().get(&NEXT_ID).unwrap_or(0)
    }

    pub fn get_admin(env: Env) -> Result<Address, Error> {
        env.storage()
            .instance()
            .get(&ADMIN)
            .ok_or(Error::NotInitialized)
    }

    fn require_admin(env: &Env) -> Result<(), Error> {
        let admin: Address = env
            .storage()
            .instance()
            .get(&ADMIN)
            .ok_or(Error::NotInitialized)?;
        admin.require_auth();
        Ok(())
    }

    fn get_batch_opt(env: &Env, batch_id: u64) -> Option<BatchInfo> {
        env.storage().persistent().get(&DataKey::Batch(batch_id))
    }
}

#[cfg(test)]
mod test;