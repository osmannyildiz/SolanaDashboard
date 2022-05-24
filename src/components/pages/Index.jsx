import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useContext, useEffect, useState } from "react";
import { MySolanaContext } from "../../contexts";
import ConnectWallet from "../ConnectWallet";
import SendSols from "../SendSols";
import WalletInfo from "../WalletInfo";
import "./Index.css";

function Index() {
	const wallet = useWallet();
	const { endpoint } = useContext(MySolanaContext);

	const [accountInfo, setAccountInfo] = useState(null);

	const pullAccountInfo = async () => {
		if (wallet.publicKey) {
			const connection = new Connection(endpoint);
			let accountInfo = await connection.getAccountInfo(wallet.publicKey);
			if (accountInfo === null) {
				accountInfo = {
					lamports: 0,
				};
			}
			setAccountInfo(accountInfo);
		}
	};

	useEffect(() => {
		pullAccountInfo();
	}, [wallet.publicKey]);

	return (
		<main>
			<h1 className="main-header">SOLANA DASHBOARD</h1>
			{!wallet.publicKey && <ConnectWallet />}
			{wallet.publicKey && (
				<div className="dashboard">
					<WalletInfo
						wallet={wallet}
						accountInfo={accountInfo}
						pullAccountInfo={pullAccountInfo}
					/>
					<SendSols wallet={wallet} pullAccountInfo={pullAccountInfo} />
				</div>
			)}
		</main>
	);
}

export default Index;
