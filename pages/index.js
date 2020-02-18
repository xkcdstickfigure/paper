import Page from "../components/Page";
import theme from "../theme";

import Post from "../components/PostCard";

export default () => {
	return (
		<Page>
			<section className="greeting">
				<h1>Hello, Archie.</h1>
			</section>

			<Post
				title="Building Paper"
				username="archie"
				slug="building-paper"
				image="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg"
				excerpt="Twitter. It's a place for short, quick-fire thoughts. It's nice, but full of ads, people tend to be toxic, and it's far from an alternative to blogging..."
			/>

			<style jsx>{`
				section.greeting {
					background: white;
					padding: 20px 50px;
					border: solid 1px ${theme.borderGrey};
					overflow: auto;
				}

				section.greeting h1 {
					font-size: 30px;
				}
			`}</style>
		</Page>
	);
};
