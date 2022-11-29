import {
  chainId,
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
} from "wagmi";
import ClientOnly from "@components/ClientOnly";
import { ChainId } from "@contants";

const ConnectWallet = () => {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { chain, chains } = useNetwork();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      chainId: ChainId.moonriver,
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
                  Wallet Address Connected on{" "}
                  <span className="text-zinc-600 font-medium">{chain ? chain.name : ""}</span>
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
