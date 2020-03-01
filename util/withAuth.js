import config from "../config";
import nextCookie from "next-cookies";
import axios from "axios";
import Router from "next/router";

export default (WrappedComponent, allowGuest) => {
	const Wrapper = props => {
		if (props.user || allowGuest) {
			return <WrappedComponent {...props} />;
		} else {
			return <p>Unauthorized</p>;
		}
	};

	Wrapper.getInitialProps = async ctx => {
		const user = await auth(ctx);

		//Unauthorized Redirect
		if (!user && !allowGuest) {
            ctx.res.writeHead(302, { Location: `https://alles.cx/login?redirect=${encodeURIComponent("https://paper.alles.cx")}` });
			ctx.res.end();
			return { user: null };
		}

		//Child getIntialProps
		ctx.user = user;
		const childProps = WrappedComponent.getInitialProps
			? await WrappedComponent.getInitialProps(ctx)
			: {};

		//Return Props
		return {
			user: user,
			...childProps
		};
	};

	return Wrapper;
};

const auth = async ctx => {
	const { sessionToken } = nextCookie(ctx);
    if (!sessionToken) return;
	var apiReq;
	try {
		apiReq = await axios.get(`${config.apiUrl}/me`, {
			headers: {
				authorization: sessionToken
			}
		});
	} catch (err) {
		return;
    }

	return {
		sessionToken,
		...apiReq.data
	};
};
