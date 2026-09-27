#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

fn client_env() -> (Env, Address) {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None, Genun);
    (env, contract_id)
}

#[test]
fn initialize_and_roles() {
    let (env, contract_id) = client_env();
    let client = GenunClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let mfr = Address::generate(&env);

    client.initialize(&admin);
    assert_eq!(client.get_admin(), admin);
    assert!(!client.is_manufacturer(&mfr));

    client.add_manufacturer(&mfr);
    assert!(client.is_manufacturer(&mfr));

    client.remove_manufacturer(&mfr);
    assert!(!client.is_manufacturer(&mfr));
}

#[test]
fn create_batch_mints_balance() {
    let (env, contract_id) = client_env();
    let client = GenunClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let mfr = Address::generate(&env);
    client.initialize(&admin);
    client.add_manufacturer(&mfr);

    let batch_id = client.create_batch(
        &mfr,
        &String::from_str(&env, "Aspirin"),
        &String::from_str(&env, "Acme Pharma"),
        &100,
        &String::from_str(&env, "ipfs://meta"),
    );
    assert_eq!(batch_id, 1);
    assert_eq!(client.balance_of(&mfr, &batch_id), 100);
    assert_eq!(client.get_current_batch_id(), 1);

    let info = client.get_batch_info(&batch_id);
    assert_eq!(info.total_supply, 100);
    assert!(info.is_active);
    assert_eq!(info.creator, mfr);
}

#[test]
fn transfer_and_verify() {
    let (env, contract_id) = client_env();
    let client = GenunClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let mfr = Address::generate(&env);
    let buyer = Address::generate(&env);
    client.initialize(&admin);
    client.add_manufacturer(&mfr);

    let batch_id = client.create_batch(
        &mfr,
        &String::from_str(&env, "Watch"),
        &String::from_str(&env, "LuxCo"),
        &10,
        &String::from_str(&env, ""),
    );

    assert!(client.verify_product(&batch_id, &mfr));
    assert!(!client.verify_product(&batch_id, &buyer));

    client.transfer(&mfr, &buyer, &batch_id, &3);
    assert_eq!(client.balance_of(&mfr, &batch_id), 7);
    assert_eq!(client.balance_of(&buyer, &batch_id), 3);
    assert!(client.verify_product(&batch_id, &buyer));

    client.mark_as_verified(&buyer, &batch_id);
    assert!(client.is_verified(&buyer, &batch_id));
}

#[test]
fn deactivate_only_by_creator() {
    let (env, contract_id) = client_env();
    let client = GenunClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let mfr = Address::generate(&env);
    let other_mfr = Address::generate(&env);
    client.initialize(&admin);
    client.add_manufacturer(&mfr);
    client.add_manufacturer(&other_mfr);

    let batch_id = client.create_batch(
        &mfr,
        &String::from_str(&env, "Shoe"),
        &String::from_str(&env, "ShoeCo"),
        &5,
        &String::from_str(&env, ""),
    );

    assert!(client.try_deactivate_batch(&other_mfr, &batch_id).is_err());

    client.deactivate_batch(&mfr, &batch_id);
    assert!(!client.verify_product(&batch_id, &mfr));
    let info = client.get_batch_info(&batch_id);
    assert!(!info.is_active);
}

#[test]
fn unauthorized_cannot_create() {
    let (env, contract_id) = client_env();
    let client = GenunClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let stranger = Address::generate(&env);
    client.initialize(&admin);

    let result = client.try_create_batch(
        &stranger,
        &String::from_str(&env, "X"),
        &String::from_str(&env, "Y"),
        &1,
        &String::from_str(&env, ""),
    );
    assert!(result.is_err());
}
