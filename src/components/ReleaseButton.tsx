"use client";

import { useSyncExternalStore } from "react";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { chainConfig, isLive } from "@/lib/site-config";
import { feeVaultAbi } from "@/lib/goldribbonAbi";
import { explorerTx } from "@/lib/chain";

/*
 * The one write this site can send. It calls release(), which moves the
 * vault's balance to the charity and returns nothing to the caller beyond a
 * gas bill — so there is no approval flow, no amount field and no way for
 * this button to be pointed at a different address.
 *
 * Disabled until the vault exists. It is rendered rather than hidden in that
 * state on purpose: a reader should be able to see that the escape hatch is
 * there before deciding whether to trust the schedule.
 */

const dark =
  "inline-flex items-center justify-center gap-2 rounded-[44px] px-5 py-3 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-150 ring-1 ring-inset ring-slate-line text-slate-ink hover:bg-slate-ink hover:text-slate disabled:cursor-not-allowed disabled:text-slate-muted disabled:hover:bg-transparent disabled:hover:text-slate-muted";

const subscribe = () => () => {};

export function ReleaseButton() {
  // wagmi reports a disconnected wallet during SSR, so the label is only
  // allowed to depend on connection state once the client has taken over.
  // useSyncExternalStore gives that as a value rather than as an effect that
  // sets state on mount, which would cost a second render pass.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const { isConnected } = useAccount();
  const { connect, isPending: connecting } = useConnect();
  const { writeContract, isPending, data: hash, error } = useWriteContract();

  const ready = isLive && chainConfig.vaultAddress !== null;

  if (!ready) {
    return (
      <button type="button" disabled className={dark}>
        Release the vault
      </button>
    );
  }

  if (mounted && !isConnected) {
    return (
      <button
        type="button"
        className={dark}
        disabled={connecting}
        onClick={() => connect({ connector: injected() })}
      >
        {connecting ? "Connecting…" : "Connect a wallet"}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        className={dark}
        disabled={isPending}
        onClick={() =>
          writeContract({
            address: chainConfig.vaultAddress as `0x${string}`,
            abi: feeVaultAbi,
            functionName: "release",
          })
        }
      >
        {isPending ? "Confirm in your wallet…" : "Release the vault"}
      </button>

      {hash ? (
        <a
          href={explorerTx(hash)}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[12px] text-slate-ink underline decoration-slate-line underline-offset-4"
        >
          Sent — view the transaction
        </a>
      ) : null}

      {error ? (
        <p className="font-mono text-[12px] text-slate-muted">
          {/* Most often "nothing to release" — an empty vault, not a fault. */}
          Not sent. The vault may be empty.
        </p>
      ) : null}
    </div>
  );
}
