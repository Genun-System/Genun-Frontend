# Genun Soroban contract

Product-authentication contract on Stellar Testnet. Each batch ID holds a fungible supply of authenticated units.

## Functions

| Method | Who | Purpose |
|--------|-----|---------|
| `initialize(admin)` | once | Set admin |
| `add_manufacturer` / `remove_manufacturer` | admin | Grant mint rights |
| `create_batch(...)` | manufacturer | Mint batch, returns `batch_id` |
| `transfer(from, to, batch_id, amount)` | holder | Move units |
| `verify_product(batch_id, owner)` | anyone (read) | Active + balance > 0 |
| `mark_as_verified` / `deactivate_batch` | holder / creator | Verify flag / recall |

## Build & test

```bash
# wasm target (one of these)
rustup target add wasm32v1-none
# or: rustup target add wasm32-unknown-unknown

make test
make build
```

## Deploy (Testnet)

```bash
stellar keys generate genun-admin --network testnet --fund
make deploy-testnet
# writes deployments/testnet.json with contractId
```

Grant a manufacturer:

```bash
stellar contract invoke --id $CONTRACT_ID --source genun-admin --network testnet \
  -- add_manufacturer --manufacturer G...
```

Copy `contractId` into `api` (`GENUN_CONTRACT_ID`) and `fe` (`NEXT_PUBLIC_GENUN_CONTRACT_ID`).
