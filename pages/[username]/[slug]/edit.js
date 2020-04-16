import Page from "../../../components/Page";
import withAuth from "../../../reactants/withAuth";
import axios from "axios";
import config from "../../../config";
import theme from "../../../reactants/theme";
import {useState} from "react";
import Input from "../../../reactants/Input";
import Textarea from "../../../reactants/TextArea";
import Button from "../../../reactants/Button";

const editPage = props => {
	if (props.post && props.post.author.id === props.user.id) {
		const [postTitle, setPostTitle] = useState(props.post.title);
		const [postImage, setPostImage] = useState(props.post.image);
		const [postContent, setPostContent] = useState(props.post.rawContent);
		const [formError, setFormError] = useState("");
		const [formBusy, setFormBusy] = useState(false);

		return (
			<Page
				title={`Edit: ${props.post.title}`}
				user={props.user}
				breadcrumbs={[
					{
						name: `@${props.post.author.username}`,
						href: "/[userid]",
						as: `/${props.post.author.username}`
					},
					{
						name: props.post.title,
						href: "/[userid]/[postid]",
						as: `/${props.post.author.username}/${props.post.slug}`
					},
					{
						name: "edit"
					}
				]}
			>
				<main>
					<h1>{props.post.title}</h1>

					<form
						onSubmit={e => {
							e.preventDefault();
							if (postTitle.length < config.inputBounds.title.min)
								return setFormError(
									`Post title must be at least ${config.inputBounds.title.min} characters long.`
								);
							if (postImage.length < config.inputBounds.image.min)
								return setFormError(
									`Post image must be at least ${config.inputBounds.image.min} characters long.`
								);
							if (postContent.length < config.inputBounds.content.min)
								return setFormError(
									`Post content must be at least ${config.inputBounds.content.min} characters long.`
								);
							if (
								props.post.title === postTitle &&
								props.post.image === postImage &&
								props.post.rawContent === postContent
							)
								return (location.href = `/${props.post.author.username}/${props.post.slug}`);

							setFormBusy(true);
							axios
								.post(
									`${config.apiUrl}/edit?slug=${props.post.slug}`,
									{
										title: postTitle,
										image: postImage,
										content: postContent
									},
									{
										headers: {
											authorization: props.user.sessionToken
										}
									}
								)
								.then(() => {
									location.href = `/${props.post.author.username}/${props.post.slug}`;
								})
								.catch(err => {
									if (err.response && err.response.data.err === "badImageUrl") {
										setFormError("The image url specified is not allowed.");
									} else {
										setFormError("Something went wrong.");
									}
									setFormBusy(false);
								});
						}}
					>
						<h2>Name</h2>
						<Input
							defaultValue={props.post.title}
							onInput={e => setPostTitle(e.target.value.trim())}
							maxLength={config.inputBounds.title.max}
							wide
						/>

						<h2>Image</h2>
						<Input
							defaultValue={props.post.image}
							onInput={e => setPostImage(e.target.value.trim())}
							maxLength={config.inputBounds.image.max}
							wide
						/>

						<h2>Content</h2>
						<Textarea
							defaultValue={props.post.rawContent}
							onInput={e => setPostContent(e.target.value.trim())}
							maxLength={config.inputBounds.content.max}
							wide
							style={{
								height: 300
							}}
						></Textarea>

						<Button type="submit" disabled={formBusy} wide>
							Update Post
						</Button>
					</form>

					<Button
						secondary
						disabled={formBusy}
						onClick={() => {
							setFormBusy(true);
							axios
								.post(
									`${config.apiUrl}/delete?slug=${props.post.slug}`,
									{},
									{
										headers: {
											authorization: props.user.sessionToken
										}
									}
								)
								.then(() => {
									location.href = "/";
								})
								.catch(() => {
									setFormError("Something went wrong.");
									setFormBusy(false);
								});
						}}
						wide
					>
						Delete Post
					</Button>

					{formError ? <p style={{color: "red"}}>{formError}</p> : <></>}
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

					h1 {
						font-size: 40px;
						margin-bottom: 10px;
					}

					h2 {
						margin: 50px 0 10px 0;
						color: ${theme.grey4};
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

editPage.getInitialProps = async ctx => {
	const {username, slug} = ctx.query;

	var apiReq;
	try {
		apiReq = await axios.get(
			`${config.apiUrl}/post?username=${encodeURIComponent(
				username.toLowerCase()
			)}&slug=${encodeURIComponent(slug.toLowerCase())}`,
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
		post: apiReq.data
	};
};

export default withAuth(editPage, `${config.apiUrl}/me`);
