import Page from "../components/Page";
import withAuth from "../util/withAuth";

import Post from "../components/PostCard";

const Homepage = props => {
	return (
		<Page user={props.user}>
			<section className="greeting">
				<h1>
					Hello, {props.user.nickname}
					{props.user.plus ? <sup>+</sup> : <></>}
				</h1>
			</section>

			<section className="posts">
				{props.posts.map(post => (
					<Post
						key={post.id}
						title={post.title}
						username={post.username}
						slug={post.slug}
						image={post.image}
						excerpt={post.excerpt}
						style={{
							width: "100%"
						}}
					/>
				))}
			</section>

			<style jsx>{`
				section.greeting {
					padding: 20px 19px;
				}

				section.greeting h1 {
					font-size: 30px;
				}

				section.posts {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
				}

				@media screen and (max-width: 750px) {
					section.posts {
						grid-template-columns: 1fr 1fr;
					}
				}

				@media screen and (max-width: 500px) {
					section.posts {
						grid-template-columns: 1fr;
					}
				}
			`}</style>
		</Page>
	);
};

Homepage.getInitialProps = ctx => {
	return {
		posts: [
			{
				id: 0,
				title: "Building Paper",
				username: "archie",
				slug: "building-paper",
				image:
					"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg",
				excerpt:
					"Twitter. It's a place for short, quick-fire thoughts. It's nice, but full of ads, people tend to be toxic, and it's far from an alternative to blogging..."
			},
			{
				id: 1,
				title: "Building Paper",
				username: "archie",
				slug: "building-paper",
				image:
					"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg",
				excerpt:
					"Twitter. It's a place for short, quick-fire thoughts. It's nice, but full of ads, people tend to be toxic, and it's far from an alternative to blogging..."
			},
			{
				id: 2,
				title: "Building Paper",
				username: "archie",
				slug: "building-paper",
				image:
					"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg",
				excerpt:
					"Twitter. It's a place for short, quick-fire thoughts. It's nice, but full of ads, people tend to be toxic, and it's far from an alternative to blogging..."
			},
			{
				id: 3,
				title: "Building Paper",
				username: "archie",
				slug: "building-paper",
				image:
					"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg",
				excerpt:
					"Twitter. It's a place for short, quick-fire thoughts. It's nice, but full of ads, people tend to be toxic, and it's far from an alternative to blogging..."
			},
			{
				id: 4,
				title: "Building Paper",
				username: "archie",
				slug: "building-paper",
				image:
					"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg",
				excerpt:
					"Twitter. It's a place for short, quick-fire thoughts. It's nice, but full of ads, people tend to be toxic, and it's far from an alternative to blogging..."
			}
		]
	};
};

export default withAuth(Homepage);
