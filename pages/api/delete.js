import auth from "../../util/auth";
import db from "../../db";

export default async (req, res) => {
	const user = await auth(req.headers.authorization);
	if (!user) return res.status(400).json({err: "invalidSession"});
	if (typeof req.query.slug !== "string")
		return res.status(400).json({err: "invalidQueryParameters"});

	//Get Post
	const post = await db.Post.findOne({
		where: {
			authorId: user.id,
			slug: req.query.slug
		}
	});
	if (!post) return res.status(400).json({err: "invalidPost"});

	//Delete Post
	await post.destroy();

	//Response
	res.json({});
};
