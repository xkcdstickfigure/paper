import credentials from "../credentials";
import Sequelize from "sequelize";

//Create Instance
const db = new Sequelize(
	credentials.db.name,
	credentials.db.username,
	credentials.db.password,
	{
		host: credentials.db.host,
		dialect: "mariadb",
		logging: false,
		dialectOptions: {
			timezone: "Etc/GMT0"
		}
	}
);
module.exports = db;

//Models
require("./Post")(db);
require("./Like")(db);
