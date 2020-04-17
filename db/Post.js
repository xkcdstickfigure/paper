import {DataTypes} from "sequelize";

export default db => {
	db.Post = db.define(
		"post",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false
			},
			authorId: {
				type: DataTypes.UUID,
				allowNull: false
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false
			},
			tags: {
				type: DataTypes.STRING,
				defaultValue: "[]",
				allowNull: false,
				get() {
					return JSON.parse(this.getDataValue("tags"));
				},
				set(value) {
					this.setDataValue("tags", JSON.stringify(value));
				}
			}
		},
		{
			paranoid: true
		}
	);
};
