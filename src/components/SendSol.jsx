import "./SendSol.css";

function SendSol() {
	return (
		<div className="send-sol dashboard-block">
			<section>
				<h2>SEND SOL</h2>
				<div>
					TO: <input type="text" placeholder="RECEIVER WALLET ADDRESS" />
				</div>
				<div>
					<button type="button">SEND</button>
				</div>
				<div className="result">TRANSACTION SUCCESSFUL!</div>
			</section>
		</div>
	);
}

export default SendSol;
