import Page from "../../components/Page";
import withAuth from "../../reactants/withAuth";
import axios from "axios";
import config from "../../config";
import theme from "../../reactants/theme";
import Post from "../../components/PostCard";
import NewButton from "../../reactants/NewButton";
import Link from "next/link";

const userPage = props =>
	props.requestedUser ? (
		<Page
			title={`@${props.requestedUser.username}`}
			user={props.user}
			breadcrumbs={[
				{
					name: `@${props.requestedUser.username}`
				}
			]}
		>
			<main>
				<img
					className="profilePicture"
					src={`https://avatar.alles.cx/user/${props.requestedUser.id}`}
				/>
				<div className="basicInfo">
					<h1 className="name">
						{props.requestedUser.name}
						{props.requestedUser.plus ? <sup>+</sup> : <></>}
					</h1>
					<p className="about">{props.requestedUser.about}</p>
				</div>
			</main>

			<section className="posts">
				{props.requestedUser.posts.map(post => (
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
				main {
					width: 100%;
					padding: 20px;
					box-sizing: border-box;
					display: flex;
					overflow: hidden;
				}

				.profilePicture {
					border-radius: 50%;
					width: 200px;
					height: 200px;
					margin-right: 50px;
					border: solid 1px ${theme.borderGrey};
				}

				@media screen and (max-width: 700px) {
					main {
						display: block;
					}

					.profilePicture {
						margin: 0 auto;
						display: block;
					}

					.basicInfo {
						text-align: center;
					}
				}

				h1.name {
					font-weight: 500;
					margin: 0;
					margin-bottom: 5px;
				}

				p.about {
					margin-top: 0;
					color: ${theme.grey4};
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
	) : (
		<Page user={props.user}>
			<h1>404: This page does not exist</h1>
		</Page>
	);

userPage.getInitialProps = async ctx => {
	const {username} = ctx.query;

	var apiReq;
	try {
		apiReq = await axios.get(
			`${config.apiUrl}/user?username=${encodeURIComponent(
				username.toLowerCase()
			)}&posts`,
			{
				headers: {
					authorization: ctx.user.sessionToken
				}
			}
		);
	} catch (err) {
		return;
	}

	return {
		requestedUser: apiReq.data
	};
};

export default withAuth(userPage, `${config.apiUrl}/me`);
