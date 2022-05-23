import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import "./styles/walletAdapterOverrides.css";

function App() {
	const network = WalletAdapterNetwork.Devnet;
	const walletAdapters = useMemo(
		() => [new PhantomWalletAdapter({ network })],
		[network]
	);

	return (
		<WalletProvider wallets={walletAdapters} autoConnect>
			<Dashboard />
		</WalletProvider>
	);
}

export default App;
