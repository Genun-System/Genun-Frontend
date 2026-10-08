## What changed

<!-- A short description of the change. -->

## Why

<!-- The problem this solves. Link the issue: Closes #__ -->

## Which package(s)

- [ ] `sc/` — Soroban contract
- [ ] `api/` — Express + MongoDB
- [ ] `src/` — Next.js frontend
- [ ] Docs / tooling

## How I tested it

<!-- Commands you ran and what you clicked through. Screenshots or a clip for UI changes. -->

## Checks

- [ ] `npm run lint` passes
- [ ] `npm run build` passes (not just `npm run dev` — this app is server-rendered)
- [ ] `cd sc && make test` passes, if the contract changed
- [ ] Browser-only APIs (`window`, `localStorage`, `indexedDB`, Freighter) are SSR-guarded
- [ ] No EVM tooling added (`wagmi`, `RainbowKit`, `viem`, `ethers`) — Genun is Stellar-only
- [ ] No secrets, keys or seed phrases committed; new env vars added to the relevant `.env.example`

## Coordination needed

- [ ] Needs a contract redeploy
- [ ] Needs a new environment variable set on the deploy
- [ ] Neither
