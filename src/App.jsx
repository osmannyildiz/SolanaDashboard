import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
	PhantomWalletAdapter,
	SolflareWalletAdapter,
	SolletExtensionWalletAdapter,
	SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import "./App.css";
import Index from "./components/pages/Index";
import { MySolanaContext } from "./contexts";
import "./styles/walletAdapterOverrides.css";

function App() {
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	const walletAdapters = useMemo(
		() => [
			new PhantomWalletAdapter({ network }),
			new SolflareWalletAdapter({ network }),
			new SolletWalletAdapter({ network }),
			new SolletExtensionWalletAdapter({ network }),
		],
		[network]
	);

	const mySolanaContext = {
		network,
		endpoint,
	};

	return (
		<MySolanaContext.Provider value={mySolanaContext}>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={walletAdapters} autoConnect>
					<Index />
				</WalletProvider>
			</ConnectionProvider>
		</MySolanaContext.Provider>
	);
}

export default App;
