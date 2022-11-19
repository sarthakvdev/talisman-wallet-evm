import { useConnect, useAccount } from "wagmi";
import { ChainId } from "@contants";

const Home = () => {
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      chainId: ChainId.moonriver,
    });

  return (
    <div className="flex flex-col items-center gap-y-9 min-h-full py-6">
      <p className="text-4xl font-bold mt-6">🧞‍♂️ hello talisman frens</p>
      {/* Wallet Connect */}
      <div className="flex flex-col gap-y-3">
        {isConnected && <div>Connected to {activeConnector.name}</div>}
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            disabled={!connector.ready}
            className="px-4 py-2 rounded-xl shadow-lg bg-blue-200 font-bold hover:scale-105 active:scale-100 active:bg-blue-300 transition-all duration-200"
          >
            {!isConnected
              ? isLoading && pendingConnector?.id == connector.id
                ? "(connecting) "
                : "Connect "
              : "Connected "}
            {connector.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
