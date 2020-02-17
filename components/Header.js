import Link from "next/link";
import {Fragment} from "react";
import theme from "../theme";

export default props => (
	<header>
		<div className="breadcrumbs">
			<Link href="/">
				<a className="home">Paper</a>
			</Link>
			{
				props.breadcrumbs ? props.breadcrumbs.map((segment, i) => (
					<Fragment key={i}>
						<span>/</span>
						{
							segment.href ? (
								<Link href={segment.href} as={segment.as}>
									<a className="bc">{segment.name}</a>
								</Link>
							) : (
								<a className="bc">{segment.name}</a>
							)
						}
					</Fragment>
				)) : <></>
			}
		</div>

		{props.user ? (
			<Link href="/me">
				<a className="profilePicture">
					<img src={`https://avatar.alles.cx/user/${props.user.id}`} />
				</a>
			</Link>
		) : (
			<></>
		)}

		<style jsx>{`
			header {
				display: flex;
				padding: 10px;
				border-bottom: solid 1px ${theme.borderGrey};
				flex-shrink: 0;
			}

			.breadcrumbs {
				flex-grow: 1;
				display: flex;
				overflow-x: auto;
				font-size: 25px;
				vertical-align: middle;
			}

			a.home {
				color: inherit;
				text-decoration: none;
				padding: 0 10px;
				margin: auto 5px;
			}

			a.home {
				font-weight: 700;
			}

			.breadcrumbs span {
				color: ${theme.grey8};
				font-size: 15px;
				margin: auto 0;
			}

			.breadcrumbs a.bc {
				color: ${theme.grey4};
				margin: auto 15px;
				font-size: 15px;
			}

			a.profilePicture {
				margin: auto 0 auto 5px;
			}

			a.profilePicture img {
				border: solid 1px ${theme.borderGrey};
				border-radius: 50%;
				height: 2.5em;
				width: 2.5em;
				cursor: pointer;
			}
		`}</style>
	</header>
);