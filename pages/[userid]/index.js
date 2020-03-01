import Page from "../../components/Page";
import withAuth from "../../util/withAuth";

const userPage = props => (
	<Page
		title="@archie"
		user={props.user}
		breadcrumbs={[
			{
				name: "@archie"
			}
		]}
	></Page>
);

export default withAuth(userPage);
