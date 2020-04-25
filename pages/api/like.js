import auth from "../../util/auth";
import getUser from "../../util/getUser";
import db from "../../db";

export default async (req, res) => {
	const user = await auth(req.headers.authorization);
	if (!user) return res.status(401).json({err: "invalidSession"});
	if (
		typeof req.query.username !== "string" ||
		typeof req.query.slug !== "string"
	)
		return res.status(400).json({err: "invalidQueryParameters"});

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
	const liked = (
		await post.getLikes({
			where: {
				userId: user.id
			}
		})
	)[0];
	if (liked) return res.json({});

	//Create Like
	const like = await db.Like.create({
		userId: user.id
	});
	await post.addLike(like);

	//Response
	res.json({});
};
