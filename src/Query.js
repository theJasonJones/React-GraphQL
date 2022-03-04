export const query = {
query: `
{
    viewer {
      name
    }
    search(
      query: "user:thejasonjones sort:updated-desc"
      type: REPOSITORY
      first: 10
    ) {
      nodes {
        ... on Repository {
          id
          name
          description
          url
          viewerSubscription
        }
      }
    }
}
`
};

