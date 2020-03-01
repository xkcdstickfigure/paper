const dev = process.env.NODE_ENV === "development";

export default {
	apiUrl: `${dev ? "http://localhost" : "https://paper.alles.cx"}/api/v1`,
	dev
};