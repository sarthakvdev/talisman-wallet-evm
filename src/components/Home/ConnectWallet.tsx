import { useEffect, useState } from "react";
import { chainId, useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import ClientOnly from "@components/ClientOnly";

const ConnectWallet = () => {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      chainId: chainId.mainnet,
      connector: new MetaMaskConnector(),
    });
  const { disconnect } = useDisconnect();

  return (
    <ClientOnly>
      <div className="flex flex-col gap-y-3">
        {connectors.map((connector) => (
          <div key={connector.id}>
            {!isConnected ? (
              <button
                onClick={() => connect({ connector })}
                disabled={!connector.ready}
                className="px-4 py-2 rounded-lg bg-blue-300 font-bold active:bg-blue-300"
              >
                {!isLoading ? "Connect Wallet" : "Connecting..."}
              </button>
            ) : (
              <div>
                <label className="text-zinc-400 block mb-2">
                  Wallet Address Connected
                </label>
                <code className="bg-zinc-700 text-zinc-200 p-4 rounded block mb-4">
                  <pre>{address}</pre>
                </code>
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 rounded-lg bg-red-300 font-bold active:bg-red-400"
                >
                  disconnect
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ClientOnly>
  );
};

export default ConnectWallet;
