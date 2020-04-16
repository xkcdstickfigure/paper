import config from "../config";
import credentials from "../credentials";
import axios from "axios";

export default async (param, username) =>
	(
		await axios.get(
			`${config.fpApiUrl}/user?${
				username ? "username" : "id"
			}=${encodeURIComponent(param)}`,
			{
				auth: {
					username: credentials.allesOAuth.id,
					password: credentials.allesOAuth.secret
				}
			}
		)
	).data;
