import theme from "../theme";
import Link from "next/link";
import moment from "moment";

export default props => (
	<div style={{padding: "10px"}}>
		<Link href="/[userid]/[postid]" as={`/${props.username}/${props.slug}`}>
			<a style={{outline: "none"}}>
				<div className="post" style={props.style}>
					<img src={props.image} />
					<h1>{props.title}</h1>
					<h2>
						@{props.username} // {moment(props.createdAt).format("LL")}
					</h2>
					<p>{props.excerpt}</p>

					<style jsx>{`
						.post {
							border: solid 1px ${theme.borderGrey};
							background: white;
							width: 250px;
							box-sizing: border-box;
							padding: 15px;
							transition: 0.1s;
						}

						.post:hover {
							border-color: ${theme.grey8};
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
							font-size: 12px;
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
	</div>
);
