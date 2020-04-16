import getUser from "../../util/getUser";
import postCardData from "../../util/postCardData";
import db from "../../db";

export default async (req, res) => {
    //Get User from Alles API
	var u;
	try {
        u = await getUser(req.query.username, true);
	} catch (err) {
		if (err.response && err.response.data.err === "invalidUser") {
			return res.status(400).json({err: "invalidUser"});
		} else {
			return res.status(500).json({err: "internalError"});
		}
	}

	//Form Response
	const response = {
		id: u.id,
		username: u.username,
		name: u.name,
		about: u.about,
		plus: u.plus
	};

	//Get Posts
	if (typeof req.query.posts !== "undefined") {
		const posts = await db.Post.findAll({
			where: {
				authorId: u.id
			},
			order: [["createdAt", "DESC"]]
		});
		response.posts = posts.map(post => postCardData(post, u.username));
	}

	//Respond
    res.json(response);
};