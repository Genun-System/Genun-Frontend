# Genun Frontend

Next.js App Router UI for Genun on **Stellar Testnet** (Freighter wallet).

## Setup

```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_DEV_URL / PROD_URL (include trailing /api/)
# Set NEXT_PUBLIC_GENUN_CONTRACT_ID from sc/deployments/testnet.json
npm install
npm run dev
```

## Wallet

Uses [@stellar/freighter-api](https://docs.freighter.app/) + `@stellar/stellar-sdk` for Soroban invokes (`create_batch`, `verify_product`, `is_manufacturer`).
