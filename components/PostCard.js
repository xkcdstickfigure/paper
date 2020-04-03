import theme from "../theme";
import Link from "next/link";
import moment from "moment";

export default props => (
	<div style={{padding: "10px"}}>
		<Link href="/[userid]/[postid]" as={`/${props.username}/${props.slug}`}>
			<a style={{outline: "none"}}>
				<div className="post" style={props.style}>
					<div className="image">
						<img src={props.image} />
					</div>
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
							min-height: 450px;
						}

						.post:hover {
							border-color: ${theme.grey8};
						}

						.image {
							width: 100%;
							height: 225px;
							border-radius: 10px;
							overflow: hidden;
							display: flex;
							flex-flow: column;
							justify-content: center;
						}

						img {
							width: 100%;
							margin: 0 auto;
							border-radius: 10px;
						}

						h1 {
							font-size: 20px;
							margin: 20px 0 0 0;
						}

						h2 {
							margin: 0 0 10px 0;
							font-size: 12px;
							font-weight: 300;
						}

						p {
							margin: 0;
							color: ${theme.grey4};
							overflow-wrap: break-word;
						}
					`}</style>
				</div>
			</a>
		</Link>
	</div>
);
