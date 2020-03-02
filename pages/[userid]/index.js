import Page from "../../components/Page";
import withAuth from "../../util/withAuth";
import axios from "axios";
import config from "../../config";
import theme from "../../theme";

const userPage = props =>
	props.requestedUser ? (
		<Page
			title={`@${props.requestedUser.username}`}
			user={props.user}
			breadcrumbs={[
				{
					name: `@${props.requestedUser.username}`
				}
			]}
		>
			<main>
				<img className="profilePicture" src={`https://avatar.alles.cx/user/${props.requestedUser.id}`} />
				<div className="basicInfo">
					<h1 className="name">{props.requestedUser.name}
						{props.requestedUser.plus ? <sup>+</sup> : <></>}
					</h1>
					<p className="about">{props.requestedUser.about}</p>
				</div>
			</main>
			
			<style jsx>{`
				main {
					background: white;
					border: solid 1px ${theme.borderGrey};
					width: 100%;
					padding: 20px;
					box-sizing: border-box;
					display: flex;
					overflow: hidden;
				}

				.profilePicture {
					border-radius: 50%;
					width: 200px;
					height: 200px;
					margin-right: 50px;
					border: solid 1px ${theme.borderGrey};
				}

				@media screen and (max-width: 700px) {
					main {
						display: block;
					}

					.profilePicture {
						margin: 0 auto;
						display: block;
					}

					.basicInfo {
						text-align: center;
					}
				}

				h1.name {
					font-weight: 500;
					margin-bottom: 5px;
				}

				p.about {
					margin-top: 0;
					color: ${theme.grey4};
				}
			`}</style>
		</Page>
	) : (
		<Page
			user={props.user}
			breadcrumbs={[
				{
					name: "???"
				}
			]}
		>
			<h1>404: This page does not exist</h1>
		</Page>
	);

userPage.getInitialProps = async ctx => {
	const {userid} = ctx.query;

	var apiReq;
	try {
		apiReq = await axios.get(
			`${config.apiUrl}/user?username=${encodeURIComponent(
				userid.toLowerCase()
			)}`
		);
	} catch (err) {
		return;
	}

	return {
		requestedUser: apiReq.data
	};
};

export default withAuth(userPage);
