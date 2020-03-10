import Page from "../../components/Page";
import withAuth from "../../util/withAuth";
import axios from "axios";
import config from "../../config";
import theme from "../../theme";
import Link from "next/link";
import { useState } from "react";

const postPage = props => {
	if (props.post) {
		const [showFeaturedImage, setShowFeaturedImage] = useState(true);

		return (
			<Page
				title={props.post.title}
				user={props.user}
				breadcrumbs={[
					{
						name: `@${props.post.author.username}`,
						href: "/[userid]",
						as: `/${props.post.author.username}`
					},
					{
						name: props.post.title
					}
				]}
			>
				<main>
					<Link href="/[userid]" as={`/${props.post.author.username}`}>
						<a className="author">
							<img
								src={`https://avatar.alles.cx/user/${props.post.author.id}`}
							/>
							<h1>{props.post.author.name}</h1>
						</a>
					</Link>

					<h1 className="postTitle">{props.post.title}</h1>
					{showFeaturedImage ? (
						<img
							className="image"
							src={props.post.image}
							onError={() => setShowFeaturedImage(false)}
						/>
					) : (
						<></>
					)}

					<div
						className="content"
						dangerouslySetInnerHTML={{ __html: props.post.htmlContent }}
					></div>
				</main>

				<style jsx>{`
					main {
						background: white;
						border: solid 1px ${theme.borderGrey};
						width: 100%;
						padding: 50px;
						box-sizing: border-box;
						overflow: hidden;
					}

					.author {
						display: flex;
					}

					.author img {
						border-radius: 50%;
						height: 30px;
						width: 30px;
						margin-right: 10px;
					}

					.author h1 {
						margin: auto 0;
						font-weight: 400;
						font-size: 25px;
					}

					.postTitle {
						font-size: 40px;
					}

					.image {
						min-width: 200px;
						max-width: 100%;
						display: block;
						margin: 0 auto;
						border-radius: 10px;
						margin-bottom: 50px;
					}

					.content {
						line-height: 30px;
					}
				`}</style>

				<style jsx global>{`
					.content img {
						min-width: 200px;
						max-width: 100%;
						display: block;
						margin: 20px auto;
						border-radius: 10px;
					}

					.content a {
						text-decoration: underline;
						color: ${theme.accent};
					}

					.content code, .content pre {
						font-family: inherit;
					}

					.content code {
						background: ${theme.greyF};
						display: inline-block;
						padding: 10px;
					}
				`}</style>
			</Page>
		);
	} else {
		return (
			<Page user={props.user}>
				<h1>404: This page does not exist</h1>
			</Page>
		);
	}
};

postPage.getInitialProps = async ctx => {
	const { userid, postid } = ctx.query;

	var apiReq;
	try {
		apiReq = await axios.get(
			`${config.apiUrl}/post/${encodeURIComponent(
				userid.toLowerCase()
			)}/${encodeURIComponent(postid.toLowerCase())}`
		);
	} catch (err) {
		return;
	}

	return {
		post: apiReq.data
	};
};

export default withAuth(postPage, true);
