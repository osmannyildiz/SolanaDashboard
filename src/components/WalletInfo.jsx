import {
	WalletDisconnectButton,
	WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useContext, useEffect, useState } from "react";
import { MySolanaContext } from "../contexts";
import "./WalletInfo.css";

function WalletInfo({ wallet }) {
	const { endpoint } = useContext(MySolanaContext);
	const [accountInfo, setAccountInfo] = useState(null);

	useEffect(() => {
		(async () => {
			const connection = new Connection(endpoint);
			let accountInfo = await connection.getAccountInfo(wallet.publicKey);
			if (accountInfo === null) {
				accountInfo = {
					lamports: 0,
				};
			}
			setAccountInfo(accountInfo);
		})();
	}, [endpoint]);

	const lamportsToSols = (lamports) => lamports / LAMPORTS_PER_SOL;

	return (
		<div className="wallet-info dashboard-block">
			<section>
				<h2>WALLET ADDRESS</h2>
				<span>{wallet.publicKey.toBase58()}</span>
			</section>
			{accountInfo && (
				<section>
					<h2>WALLET BALANCE</h2>
					<span>{lamportsToSols(accountInfo.lamports)} SOL</span>
				</section>
			)}
			<WalletModalProvider>
				<WalletDisconnectButton />
			</WalletModalProvider>
		</div>
	);
}

export default WalletInfo;
