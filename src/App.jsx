import { useState } from "react";
import "./App.css";
import SendSol from "./components/SendSol";
import WalletInfo from "./components/WalletInfo";
// import {PhantomWalletAdapter} from "@solana/wallet-adapter-wallets"

function App() {
	const [wallet, setWallet] = useState(null);

	return (
		<main>
			<h1>SOLANA DASHBOARD</h1>
			{!wallet && <h2>wallet not connected blabla</h2>}
			{wallet && <WalletInfo wallet={wallet} />}
			{wallet && <SendSol />}
		</main>
	);
}

export default App;
