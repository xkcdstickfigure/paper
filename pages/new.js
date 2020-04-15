import Page from "../components/Page";
import withAuth from "../reactants/withAuth";
import axios from "axios";
import config from "../config";
import theme from "../reactants/theme";
import {useState} from "react";
import Input from "../reactants/Input";
import Textarea from "../reactants/TextArea";
import Button from "../reactants/Button";
import Link from "next/link";

const newPage = props => {
	const [postTitle, setPostTitle] = useState("");
	const [postSlug, setPostSlug] = useState("");
	const [customSlug, setCustomSlug] = useState(false);
	const [postImage, setPostImage] = useState("");
	const [postContent, setPostContent] = useState("");
	const [formError, setFormError] = useState("");
	const [formBusy, setFormBusy] = useState(false);

	return (
		<Page
			title="New Post"
			user={props.user}
			breadcrumbs={[
				{
					name: "new"
				}
			]}
		>
			<main>
				<h1>New Post</h1>
				<p>
					Make sure you check our{" "}
					<Link href="/[userid]/[postid]" as={"/archie/paper#rules"}>
						<a className="normal" target="_blank">
							rules
						</a>
					</Link>{" "}
					before you post.
				</p>

				<form
					onSubmit={e => {
						e.preventDefault();
						if (postTitle.length < config.inputBounds.title.min)
							return setFormError(
								`Post title must be at least ${config.inputBounds.title.min} characters long.`
							);
						if (postSlug.length < config.inputBounds.slug.min)
							return setFormError(
								`Post slug must be at least ${config.inputBounds.slug.min} characters long.`
							);
						if (postImage.length < config.inputBounds.image.min)
							return setFormError(
								`Post image must be at least ${config.inputBounds.image.min} characters long.`
							);
						if (postContent.length < config.inputBounds.content.min)
							return setFormError(
								`Post content must be at least ${config.inputBounds.content.min} characters long.`
							);

						setFormBusy(true);
						axios
							.post(
								`${config.apiUrl}/new/${postSlug}`,
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
								location.href = `/${props.user.username}/${postSlug}`;
							})
							.catch(err => {
								if (err.response && err.response.data.err === "badImageUrl") {
									setFormError("The image url specified is not allowed.");
								} else if (
									err.response &&
									err.response.data.err === "badSlug"
								) {
									setFormError("You can't use this post slug.");
								} else {
									setFormError("Something went wrong.");
								}
								setFormBusy(false);
							});
					}}
				>
					<h2>Name</h2>
					<Input
						onInput={e => {
							setPostTitle(e.target.value.trim());
							if (!customSlug) setPostSlug(makeSlug(e.target.value.trim()));
						}}
						maxLength={config.inputBounds.title.max}
						placeholder="Stuff I want to work on"
						wide
					/>

					{customSlug ? (
						<>
							<h2>Slug</h2>
							<Input
								defaultValue={postSlug}
								onInput={e => setPostSlug(e.target.value.trim())}
								maxLength={config.inputBounds.slug.max}
								placeholder="stuff-i-want-to-work-on"
								wide
							/>
						</>
					) : (
						<p style={{color: theme.grey8}}>
							https://paper.alles.cx/{props.user.username}/{postSlug}{" "}
							<i
								className="material-icons"
								style={{cursor: "pointer"}}
								onClick={() => setCustomSlug(true)}
							>edit</i>
						</p>
					)}

					<h2>Image</h2>
					<Input
						onInput={e => setPostImage(e.target.value.trim())}
						maxLength={config.inputBounds.image.max}
						placeholder="https://img.alles.cx/1234567890"
						wide
					/>

					<h2>Content</h2>
					<Textarea
						onInput={e => setPostContent(e.target.value.trim())}
						maxLength={config.inputBounds.content.max}
						placeholder={`Since my last post, pretty much nothing has changed. Really, the only reason I'm even writing this post is to have more blog post elements on the homepage to test the styling with, but I guess I'll explain what I'm going to work on, and what I've recently built.
- [Bluebird](https://bluebird.alles.cx) (Alles) - Twitter profile graphs and metrics
- [Alles](https://alles.cx) (Major Project) - An account service you use to login to some of the projects below, and a site which shows you news, weather, messaging, etc.
- Spectare (Alles) - A video platform without advertisers. Users pay money which is distributed to creators proportional to watch time.
- Bithop (Alles) - *Stealth Mode*
- Nitrogen (Alles) - The messaging part of Alles
- Argon (Major Project) - I'll explain this in a lot of detail in another post
- Crosshatch (Major Project) - Analytics service
Anyway, that's probably 200 characters.`}
						wide
						style={{
							height: 300
						}}
					></Textarea>

					<Button type="submit" disabled={formBusy} wide>
						Create Post
					</Button>
				</form>

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
};

export default withAuth(newPage, `${config.apiUrl}/me`);

//Make a post slug
const makeSlug = v =>
	v
		.toLowerCase()
		.replace(/[^\w]+/g, "-")
		.substr(0, config.inputBounds.slug.max);
