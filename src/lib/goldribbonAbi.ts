/**
 * The vault's interface, declared ahead of deployment.
 *
 * This mirrors `contracts/FeeVault.sol` exactly. It exists so the page can be
 * wired to the chain the day the contract lands without a second pass, and so
 * the reads the page performs are visible next to the contract that serves
 * them: three views and one event, nothing that moves money.
 */
export const feeVaultAbi = [
  {
    type: "function",
    name: "recipient",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    type: "function",
    name: "totalReleased",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "releaseCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "pending",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "release",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "event",
    name: "Released",
    inputs: [
      { name: "index", type: "uint256", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
] as const;
