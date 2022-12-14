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
      {!isConnected ? (
        <div className="flex flex-col gap-y-3">
          {connectors.map((connector) => (
            <button
              onClick={() => connect({ connector })}
              disabled={!connector.ready}
              className="px-4 py-2 rounded-lg bg-blue-300 font-bold active:bg-blue-300"
            >
              {!isLoading
                ? `Connect ${connector.name} Wallet`
                : "Connecting..."}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <label className="text-zinc-600 block mb-2">
            Wallet Address Connected on{" "}
            <span className="text-zinc-800 font-bold bg-zinc-200 px-2 py-0.5 rounded-md">
              {chain ? chain.name : ""}
            </span>
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
    </ClientOnly>
  );
};

export default ConnectWallet;
