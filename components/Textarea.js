import theme from "../theme";

export default props => (
	<>
		<textarea {...props} />
		<style jsx>{`
			textarea {
				width: 100%;
				height: 300px;
				resize: none;
				box-sizing: border-box;
				border: solid 1px ${theme.borderGrey};
				padding: 5px;
				font-size: 15px;
			}
		`}</style>
	</>
);
