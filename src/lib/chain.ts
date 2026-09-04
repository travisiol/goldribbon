import { base } from "wagmi/chains";
import { defineChain } from "viem";

/**
 * Base mainnet, unless overridden.
 *
 * Chosen for one reason that matters here: a 2% fee only becomes a real
 * donation if the gas to collect and forward it does not eat it, and a
 * monthly `release()` on mainnet at a bad hour can cost more than a small
 * month's fees.
 *
 * THE OPERATIONAL CONSTRAINT, which is easy to get wrong: the vault pays
 * `recipient` on this chain and cannot bridge. A charity's published donation
 * address is usually custodial and usually Ethereum-mainnet only — sending to
 * the same 0x… on Base can strand the funds permanently. Before deployment
 * the recipient must confirm, in writing, an address it controls ON THIS
 * CHAIN. If it cannot, the token belongs on the chain the charity can
 * actually receive on, and this file changes — not the promise.
 */
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL ?? null;

export const chain = RPC_URL
  ? defineChain({ ...base, rpcUrls: { default: { http: [RPC_URL] } } })
  : base;

export function explorerTx(hash: string): string {
  return `${chain.blockExplorers?.default.url ?? ""}/tx/${hash}`;
}

export function explorerAddress(address: string): string {
  return `${chain.blockExplorers?.default.url ?? ""}/address/${address}`;
}

export function shortAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
