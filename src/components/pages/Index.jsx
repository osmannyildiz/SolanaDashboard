import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import ConnectWallet from "../ConnectWallet";
import SendSols from "../SendSols";
import WalletInfo from "../WalletInfo";

function Index() {
	const wallet = useWallet();

	return (
		<React.Fragment>
			<main>
				<h1>SOLANA DASHBOARD</h1>
				{!wallet.connected && <ConnectWallet />}
				{wallet.connected && <WalletInfo wallet={wallet} />}
				{wallet.connected && <SendSols />}
			</main>
		</React.Fragment>
	);
}

export default Index;
