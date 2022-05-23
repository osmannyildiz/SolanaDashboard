import "./SendSols.css";

function SendSols() {
	const formSubmitHandler = () => {
		console.log("hey");
	};

	return (
		<div className="send-sol dashboard-block">
			<section>
				<h2>SEND SOL</h2>
				<form onSubmit={formSubmitHandler}>
					<div>
						TO: <input type="text" placeholder="RECEIVER WALLET ADDRESS" />
					</div>
					<div>
						AMOUNT: <input type="text" placeholder="SOLS TO SEND" />
					</div>
					<div>
						<button type="submit">SEND</button>
					</div>
				</form>
				<div className="result">TRANSACTION SUCCESSFUL!</div>
			</section>
		</div>
	);
}

export default SendSols;
