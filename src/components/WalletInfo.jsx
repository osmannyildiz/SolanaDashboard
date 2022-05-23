import {
	WalletDisconnectButton,
	WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import "./WalletInfo.css";

function WalletInfo({ wallet, accountInfo, pullAccountInfo }) {
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
				<button type="button" className="btn mr" onClick={pullAccountInfo}>
					REFRESH
				</button>
				<WalletDisconnectButton />
			</WalletModalProvider>
		</div>
	);
}

export default WalletInfo;
