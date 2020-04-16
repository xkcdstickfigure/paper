import auth from "../../util/auth";
import getUser from "../../util/getUser";
import postCardData from "../../util/postCardData";
import db from "../../db";

export default async (req, res) => {
    const user = await auth(req.headers.authorization);
    if (!user) return res.status(400).json({err: "invalidSession"});

	res.json({
		posts: await Promise.all(
			(
				await db.Post.findAll({
					order: [["createdAt", "DESC"]],
					limit: 30
				})
			).map(async p => {
				const author = await getUser(p.authorId);
				return postCardData(p, author.username);
			})
		)
	});
};
