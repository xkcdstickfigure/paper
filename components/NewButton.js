import Link from "next/link";
import theme from "../theme";

export default () => (
	<Link href="/new">
		<a>
			<i className="fas fa-plus"></i>
			<style jsx>{`
				a {
					position: fixed;
					bottom: 50px;
					right: 50px;
					width: 1em;
					text-align: center;
					background: #ffffff;
					color: ${theme.grey4};
					padding: 20px;
					border: solid 1px ${theme.borderGrey};
					border-radius: 50%;
					box-shadow: 0 0 10px -5px ${theme.grey8};
					transition-duration: 0.1s;
				}

				a:hover {
					color: ${theme.accent};
					box-shadow: 0 0 50px -5px ${theme.grey8};
					animation: colors 2s infinite;
				}
			`}</style>
		</a>
	</Link>
);
