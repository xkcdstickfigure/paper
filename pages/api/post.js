import auth from "../../util/auth";
import getUser from "../../util/getUser";
import db from "../../db";
import md from "../../util/md";

export default async (req, res) => {
    const user = await auth(req.headers.authorization);
    if (typeof req.query.username !== "string" || typeof req.query.slug !== "string") return res.status(400).json({err: "invalidQueryParameters"});

	//Get Author
	var author;
	try {
		author = await getUser(req.query.username, true);
	} catch (err) {
		if (err.response && err.response.data.err === "invalidUser") {
			return res.status(400).json({err: "invalidUser"});
		} else {
			return res.status(500).json({err: "internalError"});
		}
	}

	//Get Post
	const post = await db.Post.findOne({
		where: {
			authorId: author.id,
			slug: req.query.slug
		}
	});
	if (!post) return res.status(400).json({err: "invalidPost"});

	//Get Liked
	const liked = user
		? (
				await post.getLikes({
					where: {
						userId: user.id
					}
				})
		  ).length > 0
		: null;

	//Response
	res.json({
		id: post.id,
		author: {
			id: author.id,
			username: author.username,
			name: author.name,
			nickname: author.nickname,
			about: author.about,
			plus: author.plus
		},
		slug: post.slug,
		title: post.title,
		rawContent: post.content,
		htmlContent: md(post.content),
		image: post.image,
		createdAt: post.createdAt,
		updatedAt:
			post.updatedAt.getTime() !== post.createdAt.getTime()
				? post.updatedAt
				: null,
		likes: await post.countLikes(),
		liked
	});
};
