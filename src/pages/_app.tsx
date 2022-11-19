import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { TalismanConnector } from "@talismn/wagmi-connector";
import useChains from "@hooks/useChains";
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
    connectors: [new TalismanConnector({ chains })],
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
