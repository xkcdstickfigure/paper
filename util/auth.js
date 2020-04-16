import config from "../config";
import credentials from "../credentials";
import axios from "axios";
import getUser from "./getUser";

export default async sessionToken => {
	try {
		if (typeof sessionToken !== "string") throw "No Auth Header";
		const session = (
			await axios.get(
				`${config.fpApiUrl}/session?token=${encodeURIComponent(sessionToken)}`,
				{
					auth: {
						username: credentials.allesOAuth.id,
						password: credentials.allesOAuth.secret
					}
				}
			)
		).data;
		return await getUser(session.user);
	} catch (e) {
		return;
	}
};
