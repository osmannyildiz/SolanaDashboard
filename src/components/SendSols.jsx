import { useConnection } from "@solana/wallet-adapter-react";
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";
import { useState } from "react";
import "./SendSols.css";

function SendSols({ wallet, pullAccountInfo }) {
	const { connection } = useConnection();

	const [msg, setMsg] = useState("");

	const solsToLamports = (sols) => sols * LAMPORTS_PER_SOL;

	const formSubmitHandler = async (event) => {
		event.preventDefault();

		// Get form data
		const formEl = event.target;
		const formData = {
			to: formEl.querySelector("[name='to']").value.trim(),
			amount: Number(formEl.querySelector("[name='amount']").value).toFixed(9),
		};

		// Validate form data
		if (
			!(
				formData.to &&
				formData.amount &&
				formData.to.length === 44 &&
				formData.amount >= 0.000_000_001
			)
		) {
			setMsg("ERROR: FORM DATA IS INCORRECT.");
			return;
		}

		// Perform transaction
		try {
			const transaction = new Transaction().add(
				SystemProgram.transfer({
					fromPubkey: wallet.publicKey,
					toPubkey: new PublicKey(formData.to),
					lamports: solsToLamports(formData.amount),
				})
			);
			setMsg("ASKING FOR APPROVAL...");
			const signature = await wallet.sendTransaction(transaction, connection);
			setMsg("TRANSACTION IN PROGRESS...");

			await connection.confirmTransaction(signature, "processed");
			setMsg("TRANSACTION IN PROGRESS... (PROCESSED)");

			await connection.confirmTransaction(signature, "confirmed");
			setMsg("TRANSACTION IN PROGRESS... (CONFIRMED)");

			await connection.confirmTransaction(signature, "finalized");
			setMsg("TRANSACTION SUCCESSFUL.");
		} catch (err) {
			console.error(err);
			setMsg("TRANSACTION FAILED!");
		}

		// Refresh account info
		pullAccountInfo();

		// Clear message after 30 seconds
		setTimeout(() => {
			setMsg("");
		}, 1000 * 30);
	};

	return (
		<div className="send-sol dashboard-block">
			<section>
				<h2>SEND SOL</h2>
				<form onSubmit={formSubmitHandler}>
					<div>
						TO:{" "}
						<input
							type="text"
							name="to"
							placeholder="RECEIVER WALLET ADDRESS"
						/>
					</div>
					<div>
						AMOUNT:{" "}
						<input
							type="number"
							name="amount"
							min="0"
							step="any"
							placeholder="SOLS TO SEND"
						/>
					</div>
					<div>
						<button type="submit" className="btn">
							SEND
						</button>
					</div>
				</form>
				{msg && <div className="result">{msg}</div>}
			</section>
		</div>
	);
}

export default SendSols;
