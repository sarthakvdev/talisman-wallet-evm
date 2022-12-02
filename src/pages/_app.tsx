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
import { SubWalletConnector } from "@wagmi-connector";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Hooks
import useChains from "@hooks/useChains";
// import { chain as wagmiChain } from "wagmi";
import { MOONRIVER_RPC_URL } from "@contants";

function MyApp({ Component, pageProps }) {
  const chain = useChains();

  const { chains, provider } = configureChains(
    [chain.moonriver],
    // [wagmiChain.goerli],
    [
      jsonRpcProvider({
        rpc: () => ({
          http: MOONRIVER_RPC_URL,
          // http: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        }),
      }),
    ]
  );

  const wagmiClient = createClient({
    autoConnect: true,
    provider,
    connectors: [
      new SubWalletConnector({ chains }),
      new TalismanConnector({ chains }),
    ],
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
