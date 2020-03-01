import Page from "../../components/Page";
import theme from "../../theme";
import withAuth from "../../util/withAuth";

const postPage = props => (
	<Page
		title="Building Paper"
		user={props.user}
		breadcrumbs={[
			{
				name: "@archie",
				href: "/[userid]",
				as: "/archie"
			},
			{
				name: "Building Paper"
			}
		]}
	></Page>
);

export default withAuth(postPage, true);
