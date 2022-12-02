import { useEffect } from "react";
import { useContractRead } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import config from "@contractConfig.json";
import { UseContractConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContract";

const contractConfig: UseContractConfig = {
  addressOrName: config.address,
  contractInterface: config.abi,
};

const Home = () => {
  const { data: tokenName } = useContractRead({
    ...contractConfig,
    functionName: "name",
  });

  useEffect(() => {
    console.log("token", tokenName);
  }, [tokenName]);

  return (
    <div className="flex flex-col items-center gap-y-9 min-h-full py-6">
      <p className="text-4xl font-bold mt-6">🧞‍♂️ hello talisman frens</p>
      <ConnectWallet />
    </div>
  );
};

export default Home;
