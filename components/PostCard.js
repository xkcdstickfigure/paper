import theme from "../theme";

import Link from "next/link";

export default props => (
	<Link href="/p/[user]/[id]" as={`/p/${props.username}/${props.slug}`}>
		<a style={{ margin: "15px auto" }}>
			<div className="post">
				<img src={props.image} />
				<h1>{props.title}</h1>
				<h2>@{props.username}</h2>
				<p>{props.excerpt}</p>

				<style jsx>{`
					.post {
						border: solid 1px ${theme.borderGrey};
						background: white;
						width: 300px;
						box-sizing: border-box;
						padding: 15px;
					}

					img {
						width: 100%;
						border-radius: 10px;
					}

					h1 {
						font-size: 20px;
						margin: 10px 0 0 0;
					}

					h2 {
						margin: 0 0 10px 0;
						font-size: 15px;
						font-weight: 300;
					}

					p {
						margin: 0;
						color: ${theme.grey4};
					}
				`}</style>
			</div>
		</a>
	</Link>
);
