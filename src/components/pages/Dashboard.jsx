import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import ConnectWallet from "../ConnectWallet";
import SendSol from "../SendSol";
import WalletInfo from "../WalletInfo";

function Dashboard() {
	const wallet = useWallet();

	return (
		<React.Fragment>
			<main>
				<h1>SOLANA DASHBOARD</h1>
				{!wallet.connected && <ConnectWallet />}
				{wallet.connected && <WalletInfo wallet={wallet} />}
				{wallet.connected && <SendSol />}
			</main>
		</React.Fragment>
	);
}

export default Dashboard;
