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

	const [lastTimeout, setLastTimeout] = useState(null);
	const showMsg = (msg, disappearInSecs = 0) => {
		setMsg(msg);

		if (disappearInSecs > 0) {
			if (lastTimeout !== null) {
				clearTimeout(lastTimeout);
			}
			const timeout = setTimeout(() => {
				setMsg("");
			}, 1000 * disappearInSecs);
			setLastTimeout(timeout);
		}
	};

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
			showMsg("ERROR: FORM DATA IS INVALID.", 10);
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
			showMsg("ASKING FOR APPROVAL...");
			const signature = await wallet.sendTransaction(transaction, connection);
			showMsg("TRANSACTION IN PROGRESS...");

			await connection.confirmTransaction(signature, "processed");
			showMsg("TRANSACTION IN PROGRESS... (PROCESSED)");

			await connection.confirmTransaction(signature, "confirmed");
			showMsg("TRANSACTION IN PROGRESS... (CONFIRMED)");

			await connection.confirmTransaction(signature, "finalized");
			showMsg("TRANSACTION SUCCESSFUL.", 60);
		} catch (err) {
			console.error(err);
			showMsg("TRANSACTION FAILED!", 60);
		}

		// Refresh account info
		pullAccountInfo();
	};

	return (
		<div className="dashboard-block send-sols">
			<section>
				<h2 className="mb">SEND SOLS</h2>
				<form onSubmit={formSubmitHandler}>
					<table className="form-table mb">
						<tbody>
							<tr className="form-row">
								<td className="form-row__label">
									<label htmlFor="send-sols__to">TO:</label>
								</td>
								<td className="form-row__input">
									<input
										type="text"
										name="to"
										id="send-sols__to"
										placeholder="RECEIVER WALLET ADDRESS"
									/>
								</td>
							</tr>
							<tr className="form-row">
								<td className="form-row__label">
									<label htmlFor="send-sols__amount">AMOUNT:</label>
								</td>
								<td className="form-row__input">
									<input
										type="number"
										name="amount"
										id="send-sols__amount"
										min="0"
										step="any"
										placeholder="SOLS TO SEND"
									/>
								</td>
							</tr>
						</tbody>
					</table>
					<div>
						<button type="submit" className="btn">
							SEND
						</button>
					</div>
				</form>
				{msg && <div className="result mt">{msg}</div>}
			</section>
		</div>
	);
}

export default SendSols;
