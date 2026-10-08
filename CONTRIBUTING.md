# Contributing to Genun

Thanks for your interest in Genun — a product-authenticity stack on **Stellar (Soroban)**. This guide covers how to get the three packages running locally, what we expect in a pull request, and the one hard rule about chains.

## The one hard rule: Genun is Stellar-only

Genun runs entirely on **Stellar / Soroban**, signing with [Freighter](https://freighter.app/). Please do not add or restore EVM tooling — `wagmi`, `RainbowKit`, `viem`, `ethers`, or any other chain's SDK. This repository was an EVM app earlier in its life, so that old code is still reachable in git history below commit `b3c33a2`. If you find it in a search result or an old diff, don't carry it forward; open an issue instead.

New chain features go through `soroban-sdk` in `sc/` and `@stellar/stellar-sdk` + `@stellar/freighter-api` on the frontend.

## Repository layout

This repo is a monorepo despite the `-Frontend` name:

| Path | Role | Stack |
|------|------|-------|
| [`sc/`](sc/) | Soroban smart contract — batches, manufacturer roles, verify/deactivate | Rust, `soroban-sdk` |
| [`api/`](api/) | Auth, product metadata, `stellarAddress` | Express, MongoDB, Mongoose |
| `src/` (root) | Mint batches, QR codes, consumer verify | Next.js 14 (App Router), Freighter |

## Prerequisites

- **Node.js 18+**
- **Rust** with a wasm target — `rustup target add wasm32v1-none` (or `wasm32-unknown-unknown`)
- **[Stellar CLI](https://developers.stellar.org/docs/tools/cli)** on your `PATH`
- **MongoDB** running locally, or a connection string
- **[Freighter](https://freighter.app/)** browser extension, with Testnet enabled

## Local setup

### 1. Contract (`sc/`)

You can run the contract tests without deploying anything:

```bash
cd sc
make test     # cargo test --package genun
make build    # writes target/wasm/genun.wasm
```

To deploy your own Testnet instance — needed if you're working on anything that writes on-chain:

```bash
stellar keys generate genun-admin --network testnet --fund
make deploy-testnet          # writes sc/deployments/testnet.json with contractId
```

Grant yourself the manufacturer role, using your Freighter address (`G…`):

```bash
CONTRACT_ID=$(jq -r .contractId deployments/testnet.json)
stellar contract invoke --id "$CONTRACT_ID" --source genun-admin --network testnet \
  -- add_manufacturer --manufacturer GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

See [`sc/README.md`](sc/README.md) for the full contract interface.

### 2. API (`api/`)

```bash
cd api
cp .env.example .env
# set MONGO_URI, POos_jwtPrivateKey, Cloudinary keys, and GENUN_CONTRACT_ID=<contractId>
npm install
npm run dev    # nodemon, listens on :3000
```

### 3. Frontend (repo root)

```bash
cp .env.example .env.local
# set NEXT_PUBLIC_GENUN_CONTRACT_ID=<contractId>
npm install
npm run dev -- -p 3001
```

> **Run the frontend on port 3001.** The API hardcodes port 3000 (`api/app.js`), and Next's dev server also defaults to 3000, so they collide if you don't pass `-p 3001`. `NEXT_PUBLIC_APP_URL` in `.env.example` already assumes `3001`.

Note that `NEXT_PUBLIC_DEV_URL` and `NEXT_PUBLIC_PROD_URL` **must end with a trailing `/api/`**.

### Environment variables

| Variable | Lives in |
|----------|----------|
| `GENUN_CONTRACT_ID` | `api/.env` |
| `NEXT_PUBLIC_GENUN_CONTRACT_ID` | `.env.local` |
| `NEXT_PUBLIC_DEV_URL` / `NEXT_PUBLIC_PROD_URL` | `.env.local` — must end with `/api/` |
| Stellar RPC / Horizon / passphrase | both; default to Testnet in the examples |

Never commit a real `.env`. `.gitignore` already excludes every `.env*` except the `.env.example` files — please keep it that way, and add any new variable to the matching `.env.example` so others know it exists.

## Making a change

1. **Open an issue first** for anything beyond a small fix, so we can agree on the approach before you spend time on it.
2. **Branch off `main`.** Use a short descriptive prefix: `feat/qr-batch-download`, `fix/freighter-signing-error`, `docs/contributing`, `chore/bump-stellar-sdk`.
3. **Keep the PR focused.** One concern per pull request; unrelated refactors are much harder to review and to revert.
4. **Match the surrounding code.** The frontend is plain JavaScript (`.jsx`) with Tailwind, no TypeScript migration in progress. Follow the conventions of the file you're editing rather than introducing a new style.

### Commit messages

Use a `type: summary` prefix in the imperative mood — `fix: resolve production API URL connection issues` is the style we want to standardise on:

```
feat: add batch QR download to manufacturer dashboard
fix: handle rejected Freighter signature on create_batch
docs: document the 3001 dev port
```

Types in use: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`.

### Before you open the PR

Run whatever covers the area you touched:

```bash
npm run lint                 # frontend — next lint
npm run build                # frontend — catches SSR/build breakage
cd sc && make test           # contract — cargo test
```

The frontend is server-rendered, so **guard anything that touches browser-only APIs**. `window`, `localStorage`, `indexedDB` and the Freighter API are not available during SSR, and unguarded access is historically the most common way this app has broken in production. Confirm `npm run build` passes, not just `npm run dev`.

## Pull requests

- Fill in the PR template — what changed, why, and how you tested it.
- Link the issue it closes (`Closes #12`).
- Include screenshots or a short clip for UI changes.
- Say explicitly if your change needs a **contract redeploy** or a **new environment variable**, since those need coordination before merge.
- A maintainer reviews and merges. Pushing to `main` deploys the frontend to Netlify, so `main` should always build.

## Reporting bugs and security issues

Use the [issue templates](.github/ISSUE_TEMPLATE) for bugs and feature requests.

For anything with security impact — a contract flaw, an auth bypass, a leaked key — **please don't open a public issue.** Contact the maintainers privately so it can be fixed before disclosure. Keys and seed phrases should never appear in an issue, a PR, or a log you paste.

## Questions

If something in this guide is wrong or out of date, that's a bug too — open an issue or send a PR.
