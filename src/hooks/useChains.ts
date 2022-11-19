import { Chain } from "wagmi";
import { Network, ChainId, MOONRIVER_RPC_URL } from "@contants";

export default function useChains() {
  const moonriver: Chain = {
    id: ChainId.moonriver,
    name: "Moonriver",
    network: Network.moonriver,
    rpcUrls: {
      default: MOONRIVER_RPC_URL,
      pubic: MOONRIVER_RPC_URL,
    },
    blockExplorers: {
      etherscan: {
        name: "MoonScan",
        url: "https://moonriver.moonscan.io/",
      },
      default: {
        name: "MoonScan",
        url: "https://moonriver.moonscan.io/",
      },
    },
    nativeCurrency: {
      name: "MOVR",
      symbol: "MOVR",
      decimals: 18
    },
  };

  return {
    moonriver
  }
}
