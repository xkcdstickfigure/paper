import Page from "../../../components/Page";
import withAuth from "../../../reactants/withAuth";
import axios from "axios";
import config from "../../../config";
import theme from "../../../reactants/theme";
import Link from "next/link";
import {useState, useEffect} from "react";
import moment from "moment";
import NewButton from "../../../reactants/NewButton";
import {Heart} from "react-feather";

moment.updateLocale("en", {
	relativeTime: {
		future: "in %s",
		past: "%s ago",
		s: "seconds",
		ss: "%ss",
		m: "a minute",
		mm: "%dm",
		h: "an hour",
		hh: "%dh",
		d: "a day",
		dd: "%dd",
		M: "a month",
		MM: "%dM",
		y: "a year",
		yy: "%dY"
	}
});

const postPage = props => {
	if (props.post) {
		const [showFeaturedImage, setShowFeaturedImage] = useState(true);
		const [liked, setLiked] = useState(props.post.liked);
		const [createdAt, setCreatedAt] = useState("");
		const [fullCreatedAt, setFullCreatedAt] = useState("");
		const [relCreatedAt, setRelCreatedAt] = useState("");
		const [updatedAt, setUpdatedAt] = useState("");

		useEffect(() => {
			setCreatedAt(
				`${moment(props.post.createdAt).format("LL")} (${moment(
					props.post.createdAt
				).fromNow()})`
			);
			setFullCreatedAt(moment(props.post.createdAt).format("LLL"));
			setRelCreatedAt();
			if (props.post.updatedAt)
				setUpdatedAt(moment(props.post.updatedAt).format("LLL"));
		}, []);

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
					<h1 className="postTitle">{props.post.title}</h1>
					<h2 className="belowPostTitle">
						<Link href="/[userid]" as={`/${props.post.author.username}`}>
							<a>
								<img
									src={`https://avatar.alles.cx/user/${props.post.author.id}`}
								/>{" "}
								{props.post.author.name}
							</a>
						</Link>{" "}
						// <span title={fullCreatedAt}>{createdAt}</span>
						{props.user && props.post.author.id === props.user.id ? (
							<>
								{" "}
								//{" "}
								<Link
									href="/[userid]/[postid]/edit"
									as={`/${props.post.author.username}/${props.post.slug}/edit`}
								>
									<a className="normal">Edit</a>
								</Link>
							</>
						) : (
							<></>
						)}
					</h2>

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
						dangerouslySetInnerHTML={{__html: props.post.htmlContent}}
					></div>
					{props.post.updatedAt ? (
						<p
							style={{
								color: theme.grey4,
								fontStyle: "italic",
								fontSize: 12
							}}
						>
							Updated at {updatedAt}
						</p>
					) : (
						<></>
					)}
					{props.user ? (
						<p className="like">
							{liked
								? props.post.liked
									? props.post.likes
									: props.post.likes + 1
								: props.post.liked
								? props.post.likes - 1
								: props.post.likes}
							<Heart
								style={{
									verticalAlign: "middle",
									color: liked ? "#ff0044" : undefined,
									fill: liked ? "#ff0044" : undefined,
									cursor: "pointer",
									height: 20,
									marginLeft: 5
								}}
								onClick={() => {
									setLiked(!liked);
									axios.post(
										`${config.apiUrl}/${liked ? "unlike" : "like"}?username=${
											props.post.author.username
										}&slug=${props.post.slug}`,
										{},
										{
											headers: {
												authorization: props.user.sessionToken
											}
										}
									);
								}}
							/>
						</p>
					) : (
						<></>
					)}
				</main>

				{props.user ? (
					<Link href="/new">
						<a>
							<NewButton />
						</a>
					</Link>
				) : (
					<></>
				)}

				<style jsx>{`
					main {
						background: white;
						border: solid 1px ${theme.borderGrey};
						width: 100%;
						padding: 50px;
						box-sizing: border-box;
						overflow: hidden;
					}

					.postTitle {
						font-size: 40px;
						margin-bottom: 10px;
					}

					.belowPostTitle {
						font-weight: 400;
						font-size: 15px;
						color: ${theme.grey4};
					}

					.belowPostTitle img {
						border-radius: 50%;
						height: 25px;
						width: 25px;
						margin-right: 5px;
						display: inline-block;
						vertical-align: middle;
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

					.like {
						text-align: right;
						color: ${theme.grey4};
					}
				`}</style>

				<style jsx global>{`
					.content img {
						min-width: 200px;
						max-width: 100%;
						display: block;
						margin: 50px auto;
						border-radius: 10px;
					}

					.content a {
						text-decoration: underline;
						color: ${theme.accent};
					}

					.content code,
					.content pre {
						font-family: inherit;
					}

					.content code {
						background: ${theme.greyF};
						display: inline-block;
						padding: 0 5px;
						border: solid 1px ${theme.borderGrey};
					}

					.content pre code {
						padding: 10px;
						display: block;
						border-radius: 10px;
						margin: 50px 30px;
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
	const {username, slug} = ctx.query;

	var apiReq;
	try {
		apiReq = await axios.get(
			`${config.apiUrl}/post?username=${encodeURIComponent(
				username.toLowerCase()
			)}&slug=${encodeURIComponent(slug.toLowerCase())}`,
			{
				headers: ctx.user
					? {
							authorization: ctx.user.sessionToken
					  }
					: {}
			}
		);
	} catch (err) {
		return;
	}

	return {
		post: apiReq.data
	};
};

export default withAuth(postPage, `${config.apiUrl}/me`, true);
