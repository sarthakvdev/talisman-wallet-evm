import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-y-9 min-h-full py-6">
      <p className="text-4xl font-bold mt-6">🧞‍♂️ hello talisman frens</p>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Home;
