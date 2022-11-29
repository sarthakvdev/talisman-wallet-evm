import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";

// Providers
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

// Connectors
import { TalismanConnector } from "@talismn/wagmi-connector";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Hooks
import useChains from "@hooks/useChains";
import { chain as wagmiChain } from "wagmi";
import { MOONRIVER_RPC_URL } from "@contants";

function MyApp({ Component, pageProps }) {
  const chain = useChains();

  const { chains, provider } = configureChains(
    [chain.moonriver],
    [
      jsonRpcProvider({
        rpc: () => ({ http: MOONRIVER_RPC_URL }),
      }),
      publicProvider(),
    ]
  );

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
