import Page from "../components/Page";
import withAuth from "../reactants/withAuth";
import Post from "../components/PostCard";
import NewButton from "../reactants/NewButton";
import config from "../config";
import axios from "axios";
import Link from "next/link";

const Homepage = props => {
	if (props.posts) {
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
							createdAt={post.createdAt}
							style={{
								width: "100%"
							}}
						/>
					))}
				</section>

				<Link href="/new">
					<a>
						<NewButton />
					</a>
				</Link>

				<style jsx>{`
					section.greeting {
						padding: 20px 19px;
					}

					section.greeting h1 {
						font-size: 30px;
					}

					section.posts {
						display: grid;
						grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
					}

					@media screen and (max-width: 750px) {
						section.posts {
							grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
						}
					}

					@media screen and (max-width: 500px) {
						section.posts {
							grid-template-columns: minmax(0, 1fr);
						}
					}
				`}</style>
			</Page>
		);
	} else {
		return (
			<Page user={props.user}>
				<p style={{textAlign: "center"}}>An error occurred</p>
			</Page>
		);
	}
};

Homepage.getInitialProps = async ctx => {
	var apiReq;
	try {
		apiReq = await axios.get(`${config.apiUrl}/posts`, {
			headers: {
				authorization: ctx.user.sessionToken
			}
		});
	} catch (err) {
		return;
	}

	return {
		posts: apiReq.data.posts
	};
};

export default withAuth(Homepage, `${config.apiUrl}/me`);
