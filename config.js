const dev = process.env.NODE_ENV === "development";

export default {
	apiUrl: `${dev ? "http://localhost" : "https://paper.alles.cx"}/api/v1`,
	dev,
	inputBounds: {
		title: {
			min: 5,
			max: 125
		},
		slug: {
			min: 5,
			max: 35
		},
		image: {
			min: 16,
			max: 255
		},
		content: {
			min: 50,
			max: 15000
		}
	}
};
