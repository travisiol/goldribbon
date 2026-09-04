import { createConfig, http, injected } from "wagmi";
import { chain } from "@/lib/chain";

/**
 * Injected wallets only. There is no backend and nothing here custodies
 * anything; the single write this app ever sends is `release()` on the vault,
 * which pays the charity and cannot pay the caller.
 */
export const wagmiConfig = createConfig({
  chains: [chain],
  connectors: [injected()],
  transports: {
    [chain.id]: http(),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
