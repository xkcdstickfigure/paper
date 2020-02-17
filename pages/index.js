import Page from "../components/Page";

export default () => {
  return (
    <Page breadcrumbs={[
      {
        name: "@archie",
        href: "/test"
      },
      {
        name: "Hello World"
      }
    ]}>
      <p>test</p>
    </Page>
  );
};