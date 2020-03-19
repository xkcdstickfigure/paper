import theme from "../theme";

export default props => (
	<>
		<input {...props} />
		<style jsx>{`
			input {
				width: 100%;
				box-sizing: border-box;
				border: solid 1px ${theme.borderGrey};
				padding: 5px;
				font-size: 15px;
			}
		`}</style>
	</>
);
