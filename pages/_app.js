import "../node_modules/highlight.js/styles/default.css";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", url => {
	console.log(`Loading: ${url}`);
	NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};
