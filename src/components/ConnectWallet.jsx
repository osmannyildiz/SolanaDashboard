import {
	WalletModalProvider,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";

function ConnectWallet() {
	return (
		<React.Fragment>
			<h2>
				Wallet not connected.
				<br />
				Please click the button 👇
			</h2>
			<WalletModalProvider>
				<WalletMultiButton />
			</WalletModalProvider>
		</React.Fragment>
	);
}

export default ConnectWallet;
