import theme from "../reactants/theme";
import Head from "../reactants/Head";
import Header from "../reactants/Header";
import GlobalStyles from "../reactants/GlobalStyles";
import consoleWarning from "../reactants/consoleWarning";
import {useEffect} from "react";

export default props => {
	useEffect(consoleWarning, []);

	return (
		<div className="page">
			<Head title={props.title ? `Paper // ${props.title}` : `Paper`}>
				<link rel="shortcut icon" href="/icon.png" />
			</Head>
	
			<Header
				title="Paper"
				userId={props.user ? props.user.id : null}
				breadcrumbs={props.breadcrumbs}
			/>
			<main>
				<div className="innerMain">{props.children}</div>
			</main>
	
			<style jsx>{`
				.page {
					display: flex;
					flex-flow: column;
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
				@import url("/nprogress.css");
			`}</style>
	
			<GlobalStyles />
		</div>
	);
};
