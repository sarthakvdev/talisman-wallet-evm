// import config from "@contractConfig.json";
// import { UseContractConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContract";
// import { useEffect } from "react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { ConnectKitButton } from "connectkit";

import ConnectWallet from "./ConnectWallet";

// const contractConfig: UseContractConfig = {
//   addressOrName: config.address,
//   contractInterface: config.abi,
// };

const Home = () => {
  // const { data: tokenURI } = useContractRead({
  //   ...contractConfig,
  //   functionName: "commonTokenURI",
  // });

  // useEffect(() => {
  //   console.log("TokenURI", tokenURI);
  // }, [tokenURI]);

  return (
    <div className="flex flex-col items-center gap-y-9 min-h-full py-6">
      <p className="text-4xl font-bold mt-6">🧞‍♂️ hello talisman frens</p>
      <ConnectWallet />
    </div>
  );
};

export default Home;
