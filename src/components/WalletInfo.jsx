import {
	WalletDisconnectButton,
	WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import "./WalletInfo.css";

function WalletInfo({ wallet, accountInfo, pullAccountInfo }) {
	const [refreshBtnText, setRefreshBtnText] = useState("REFRESH");
	const [refreshBtnDisabled, setRefreshBtnDisabled] = useState(false);

	const lamportsToSols = (lamports) => lamports / LAMPORTS_PER_SOL;

	const refreshBtnClickHandler = async () => {
		setRefreshBtnDisabled(true);
		setRefreshBtnText("REFRESHING...");

		await pullAccountInfo();

		setRefreshBtnText("REFRESHED.");
		setTimeout(() => {
			setRefreshBtnText("REFRESH");
			setRefreshBtnDisabled(false);
		}, 1000 * 5);
	};

	return (
		<div className="dashboard-block wallet-info">
			<section className="mb">
				<h2>WALLET ADDRESS</h2>
				<span>{wallet.publicKey.toBase58()}</span>
			</section>
			<section className="mb">
				<h2>WALLET BALANCE</h2>
				<span>
					{accountInfo ? lamportsToSols(accountInfo.lamports) : "?"} SOL
				</span>
			</section>
			<WalletModalProvider>
				<button
					type="button"
					className="btn"
					onClick={refreshBtnClickHandler}
					disabled={refreshBtnDisabled}
				>
					{refreshBtnText}
				</button>
				<WalletDisconnectButton />
			</WalletModalProvider>
		</div>
	);
}

export default WalletInfo;
