import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
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

  const { connectors } = getDefaultWallets({
    appName: "talisman-wallet-evm",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
