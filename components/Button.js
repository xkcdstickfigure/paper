import theme from "../theme";

export default ({secondary, ...props}) => (
	<>
		<button {...props} />

		<style jsx>{`
			button {
				width: 100%;
				border: none;
				padding: 10px;
				font-size: 1em;
				box-sizing: border-box;
				margin: 10px 0px;
				background: ${!secondary ? theme.accent : "none"};
				border: solid 1px ${!secondary ? theme.accent : theme.borderGrey};
				color: ${!secondary ? "white" : "unset"};
				cursor: pointer;
				transition: all 0.1s;
				transition-timing-function: ease-in-out;
			}

			button:disabled {
				border-color: ${theme.borderGrey};
				background: ${theme.disabledBackground};
				color: ${theme.grey4};
				cursor: default;
			}

			button:hover:enabled {
				opacity: 0.8;
			}

			button:active:enabled {
				opacity: 0.5;
			}

			button::-moz-focus-inner {
				border: 0;
			}
		`}</style>
	</>
);
