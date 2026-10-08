# Genun

Product-authenticity stack on **Stellar (Soroban)** — frontend, API, and smart contract in one repo (`Genun-FE` / Genun-Frontend).

```text
.
├── sc/     Soroban smart contract
├── api/    Express + MongoDB backend
├── src/    Next.js + Freighter frontend
├── README.md
└── .gitignore
```

## Packages

| Path | Role |
|------|------|
| [`sc/`](sc/) | Soroban contract — batches, manufacturer roles, verify/deactivate |
| [`api/`](api/) | Express + MongoDB — auth, product metadata, `stellarAddress` |
| root | Next.js + Freighter — mint batches, QR, consumer verify |

## Prerequisites

- [Freighter](https://freighter.app/) (Testnet enabled)
- Node.js 18+
- Rust (`wasm32v1-none` or `wasm32-unknown-unknown` target)
- [Stellar CLI](https://developers.stellar.org/docs/tools/cli) (`stellar`) — e.g. `~/.local/bin/stellar`
- MongoDB

## Quick start

### 1. Deploy Genun contract (Testnet)

```bash
cd sc
make test
make build
stellar keys generate genun-admin --network testnet --fund
make deploy-testnet
# writes sc/deployments/testnet.json with contractId
```

Grant a manufacturer Freighter address (G…):

```bash
CONTRACT_ID=$(jq -r .contractId deployments/testnet.json)
stellar contract invoke --id "$CONTRACT_ID" --source genun-admin --network testnet \
  -- add_manufacturer --manufacturer GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 2. API

```bash
cd api
cp .env.example .env
# set MONGO_URI, JWT, Cloudinary, and GENUN_CONTRACT_ID=<contractId>
npm install && npm start   # :3000
```

### 3. Frontend

```bash
# from repo root
cp .env.example .env.local
# set NEXT_PUBLIC_* URLs and NEXT_PUBLIC_GENUN_CONTRACT_ID=<contractId>
npm install && npm run dev
```

### 4. Manufacturer flow

1. Sign up / verify email / log in
2. Connect Freighter → save Stellar address
3. Admin grants manufacturer role (step 1)
4. Create category → create product (Freighter signs `create_batch`) → download QR

### 5. Consumer verify

Open `/product-verification/<productId>` (or scan QR). API returns product metadata; FE optionally calls on-chain `verify_product`.

## Env summary

| Var | Where |
|-----|--------|
| `GENUN_CONTRACT_ID` | `api/.env` |
| `NEXT_PUBLIC_GENUN_CONTRACT_ID` | `.env.local` |
| `NEXT_PUBLIC_DEV_URL` / `PROD_URL` | must end with `/api/` |
| Stellar RPC / Horizon / passphrase | defaults to Testnet in examples |

## Architecture notes

- **One shared Soroban contract** (not per-manufacturer factory).
- API does not talk to the chain except storing addresses / returning `contractId`.
- Product create: on-chain `create_batch` first, then Mongo product with `batchId`.
- Deactivate is restricted to the **batch creator** address.

## Contributing

Contributions are welcome. See **[CONTRIBUTING.md](CONTRIBUTING.md)** for local setup of all three packages, the branch and PR workflow, and the checks to run before opening a pull request.

Two things to know up front:

- **Genun is Stellar-only.** Don't add EVM tooling (`wagmi`, `RainbowKit`, `viem`, `ethers`) — the repo was an EVM app earlier in its history, and that code is dead.
- **Run the frontend on port 3001** (`npm run dev -- -p 3001`); the API already occupies 3000.

Bug reports and feature requests go through the [issue templates](.github/ISSUE_TEMPLATE). For anything with security impact, contact the maintainers privately instead of opening a public issue.
