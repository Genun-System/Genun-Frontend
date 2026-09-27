"use client";

import {
  Contract,
  rpc,
  TransactionBuilder,
  Account,
  BASE_FEE,
  Networks,
  Address,
  nativeToScVal,
  scValToNative,
  xdr,
} from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";
import { STELLAR } from "../config";

function networkPassphrase() {
  return STELLAR.networkPassphrase || Networks.TESTNET;
}

function getServer() {
  return new rpc.Server(STELLAR.rpcUrl, { allowHttp: true });
}

function requireContractId() {
  if (!STELLAR.contractId || STELLAR.contractId === "REPLACE_AFTER_DEPLOY") {
    throw new Error("Set NEXT_PUBLIC_GENUN_CONTRACT_ID to the deployed Genun contract ID");
  }
  return STELLAR.contractId;
}

function addressToScVal(gAddress) {
  return Address.fromString(gAddress).toScVal();
}

async function simulateAndSend({ sourceAddress, operation }) {
  const server = getServer();
  const account = await server.getAccount(sourceAddress);
  let tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: networkPassphrase(),
  })
    .addOperation(operation)
    .setTimeout(180)
    .build();

  const simulated = await server.simulateTransaction(tx);
  if (rpc.Api.isSimulationError(simulated)) {
    throw new Error(simulated.error || "Simulation failed");
  }

  tx = rpc.assembleTransaction(tx, simulated).build();
  const xdrStr = tx.toXDR();

  const signed = await signTransaction(xdrStr, {
    networkPassphrase: networkPassphrase(),
    address: sourceAddress,
  });
  const signedXdr = typeof signed === "string" ? signed : signed?.signedTxXdr;
  if (!signedXdr) {
    throw new Error(signed?.error || "Freighter did not return a signed transaction");
  }

  const sent = await server.sendTransaction(
    TransactionBuilder.fromXDR(signedXdr, networkPassphrase())
  );

  if (sent.status === "ERROR") {
    throw new Error(sent.errorResult?.toXDR?.("base64") || "Transaction submit error");
  }

  // Poll until success / fail
  let getResponse = await server.getTransaction(sent.hash);
  const start = Date.now();
  while (getResponse.status === "NOT_FOUND" && Date.now() - start < 60000) {
    await new Promise((r) => setTimeout(r, 1500));
    getResponse = await server.getTransaction(sent.hash);
  }
  if (getResponse.status !== "SUCCESS") {
    throw new Error(`Transaction ${getResponse.status}`);
  }
  return getResponse;
}

function parseReturnValue(getResponse) {
  const meta = getResponse.resultMetaXdr;
  // Prefer returnValue on newer SDK responses
  if (getResponse.returnValue) {
    return scValToNative(getResponse.returnValue);
  }
  try {
    const resultMeta = xdr.TransactionMeta.fromXDR(meta, "base64");
    const v3 = resultMeta.v3?.() || resultMeta.value?.();
    const sorobanMeta = v3?.sorobanMeta?.();
    const retval = sorobanMeta?.returnValue?.();
    if (retval) return scValToNative(retval);
  } catch (_) {}
  return null;
}

export async function createBatch({
  caller,
  productName,
  manufacturerName,
  quantity,
  metadataUri = "",
}) {
  const contractId = requireContractId();
  const contract = new Contract(contractId);
  const op = contract.call(
    "create_batch",
    addressToScVal(caller),
    nativeToScVal(productName, { type: "string" }),
    nativeToScVal(manufacturerName, { type: "string" }),
    nativeToScVal(BigInt(quantity), { type: "u64" }),
    nativeToScVal(metadataUri, { type: "string" })
  );
  const result = await simulateAndSend({ sourceAddress: caller, operation: op });
  const batchId = parseReturnValue(result);
  return { batchId: Number(batchId), hash: result.txHash || result.hash };
}

export async function verifyProductOnChain({ batchId, owner }) {
  const contractId = requireContractId();
  const server = getServer();
  const contract = new Contract(contractId);
  const account = new Account(owner, "0");
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: networkPassphrase(),
  })
    .addOperation(
      contract.call(
        "verify_product",
        nativeToScVal(BigInt(batchId), { type: "u64" }),
        addressToScVal(owner)
      )
    )
    .setTimeout(30)
    .build();

  const simulated = await server.simulateTransaction(tx);
  if (rpc.Api.isSimulationError(simulated)) {
    return false;
  }
  if (simulated.result?.retval) {
    return Boolean(scValToNative(simulated.result.retval));
  }
  return false;
}

export async function isManufacturerOnChain(account) {
  const contractId = requireContractId();
  const server = getServer();
  const contract = new Contract(contractId);
  const tx = new TransactionBuilder(new Account(account, "0"), {
    fee: BASE_FEE,
    networkPassphrase: networkPassphrase(),
  })
    .addOperation(contract.call("is_manufacturer", addressToScVal(account)))
    .setTimeout(30)
    .build();
  const simulated = await server.simulateTransaction(tx);
  if (rpc.Api.isSimulationError(simulated)) return false;
  if (simulated.result?.retval) {
    return Boolean(scValToNative(simulated.result.retval));
  }
  return false;
}

export async function fetchXlmBalance(address) {
  try {
    const res = await fetch(`${STELLAR.horizonUrl}/accounts/${address}`);
    if (!res.ok) return null;
    const data = await res.json();
    const native = (data.balances || []).find((b) => b.asset_type === "native");
    return native ? Number(native.balance) : 0;
  } catch (_) {
    return null;
  }
}
