# Genun API

Express + MongoDB registry for manufacturers and products. Blockchain writes happen in the frontend via Freighter; this API stores `stellarAddress` and optional `batchId`.

## Env

Copy `.env.example` to `.env`.

Required: `MONGO_URI`, `POos_jwtPrivateKey`, Cloudinary, Gmail host vars.
Stellar: `GENUN_CONTRACT_ID` (shared Soroban contract).

## Run

```bash
npm install
npm start
```

Listens on port 3000.
