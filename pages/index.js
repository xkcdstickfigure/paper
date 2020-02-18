import Page from "../components/Page";
import theme from "../theme";

export default () => {
	return (
		<Page>
			<section className="greeting">
				<h1>Hello, Archie.</h1>
			</section>

			<style jsx>{`
				section.greeting {
					background: white;
					padding: 20px 50px;
					border: solid 1px ${theme.borderGrey};
					max-width: 1000px;
					margin: 20px auto;
					box-sizing: border-box;
					overflow: auto;
				}

				section.greeting h1 {
					font-size: 30px;
				}
			`}</style>
		</Page>
	);
};
