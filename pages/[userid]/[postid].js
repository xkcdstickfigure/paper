import Page from "../../components/Page";
import theme from "../../theme";

const postPage = props => (
    <Page
        title="Building Paper"
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
    >

    </Page>
);

export default postPage;