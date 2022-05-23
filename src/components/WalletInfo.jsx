import {
	WalletDisconnectButton,
	WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import "./WalletInfo.css";

function WalletInfo() {
	return (
		<div className="wallet-info dashboard-block">
			<section>
				<h2>WALLET ADDRESS</h2>
				<span>H7Rpt3kqnBZJ3pdtw6MrQYoHukSi2cM8oQGEyJHvkZwR</span>
			</section>
			<section>
				<h2>WALLET BALANCE</h2>
				<span>2.52 SOL</span>
			</section>
			<WalletModalProvider>
				<WalletDisconnectButton />
			</WalletModalProvider>
		</div>
	);
}

export default WalletInfo;
