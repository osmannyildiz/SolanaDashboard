import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect } from "react";
import ConnectWallet from "../ConnectWallet";
import SendSol from "../SendSol";
import WalletInfo from "../WalletInfo";

function Dashboard() {
	// const { connection } = useConnection();
	const wallet = useWallet();

	useEffect(() => {
		console.log(wallet);
	}, [wallet]);

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
