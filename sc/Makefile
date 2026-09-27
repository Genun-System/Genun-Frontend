.PHONY: build test clean deploy-testnet

# Keep artifacts inside the repo (avoid sandbox/cache target dirs)
export CARGO_TARGET_DIR ?= $(CURDIR)/target

build:
	cargo build --release --target wasm32v1-none --package genun
	@mkdir -p target/wasm
	@cp target/wasm32v1-none/release/genun.wasm target/wasm/genun.wasm
	@echo "Built target/wasm/genun.wasm"

test:
	cargo test --package genun

clean:
	cargo clean
	rm -rf target/wasm

# Requires: stellar CLI on PATH, funded TESTNET identity `genun-admin`
deploy-testnet: build
	@mkdir -p deployments
	stellar contract deploy \
		--wasm target/wasm/genun.wasm \
		--source genun-admin \
		--network testnet \
		> deployments/testnet.contract_id.tmp
	@CONTRACT_ID=$$(cat deployments/testnet.contract_id.tmp | tr -d '\n'); \
	echo "{ \"network\": \"testnet\", \"contractId\": \"$$CONTRACT_ID\", \"rpcUrl\": \"https://soroban-testnet.stellar.org\", \"networkPassphrase\": \"Test SDF Network ; September 2015\", \"horizonUrl\": \"https://horizon-testnet.stellar.org\" }" > deployments/testnet.json; \
	echo "Deployed $$CONTRACT_ID"; \
	stellar contract invoke \
		--id $$CONTRACT_ID \
		--source genun-admin \
		--network testnet \
		-- initialize \
		--admin $$(stellar keys address genun-admin)
