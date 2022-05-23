import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import React, { useContext, useEffect, useState } from "react";
import { MySolanaContext } from "../../contexts";
import ConnectWallet from "../ConnectWallet";
import SendSols from "../SendSols";
import WalletInfo from "../WalletInfo";

function Index() {
	const wallet = useWallet();
	const { endpoint } = useContext(MySolanaContext);

	const [accountInfo, setAccountInfo] = useState(null);
	// const [intervalId, setIntervalId] = useState(null);

	const pullAccountInfo = async () => {
		if (wallet.publicKey) {
			console.log("hey pull start");
			const connection = new Connection(endpoint);
			let accountInfo = await connection.getAccountInfo(wallet.publicKey);
			if (accountInfo === null) {
				accountInfo = {
					lamports: 0,
				};
			}
			setAccountInfo(accountInfo);
			console.log("hey pull end");
		} else {
			console.log("hey pull not connected");
		}
	};

	// useEffect(() => {
	// 	if (intervalId === null) {
	// 		console.log("hey set interval");
	// 		const temp = setInterval(() => {
	// 			console.log("hey interval");
	// 			pullAccountInfo();
	// 		}, 1000 * 5);
	// 		setIntervalId(temp);
	// 	}
	// }, []);

	useEffect(() => {
		console.log("hey effect");
		pullAccountInfo();
	}, [wallet.publicKey]);

	return (
		<React.Fragment>
			<main>
				<h1>SOLANA DASHBOARD</h1>
				{!wallet.publicKey && <ConnectWallet />}
				{wallet.publicKey && (
					<WalletInfo
						wallet={wallet}
						accountInfo={accountInfo}
						pullAccountInfo={pullAccountInfo}
					/>
				)}
				{wallet.publicKey && (
					<SendSols wallet={wallet} pullAccountInfo={pullAccountInfo} />
				)}
			</main>
		</React.Fragment>
	);
}

export default Index;
