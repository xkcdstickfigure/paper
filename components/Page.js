import theme from "../theme";

import Head from "next/head";
import Link from "next/link";

import Header from "./Header";

export default props => (
	<div className="pageContainer">
		<Head>
			<title>{props.title ? `Paper // ${props.title}` : `Paper`}</title>
			<link rel="shortcut icon" href="/icon.png" />
		</Head>

		<Header breadcrumbs={props.breadcrumbs} />
		<main>
			<div className="innerMain">{props.children}</div>
		</main>

		<style jsx>{`
			.pageContainer {
				display: flex;
				flex-flow: column;
				min-height: 100vh;
			}

			main {
				padding: 20px;
				flex-grow: 1;
				background: ${theme.greyF};
			}

			.innerMain {
				max-width: 1000px;
				margin: 20px auto;
			}
		`}</style>

		<style jsx global>{`
			@import url("https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900&display=swap");
			@import url("https://use.fontawesome.com/releases/v5.12.0/css/all.css");

			body {
				font-family: Rubik, sans-serif;
				margin: 0;
			}

			a {
				color: inherit;
				text-decoration: none;
			}

			a.normal {
				color: ${theme.accent};
				text-decoration: underline;
			}

			a.nocolor {
				text-decoration: underline;
			}
		`}</style>
	</div>
);