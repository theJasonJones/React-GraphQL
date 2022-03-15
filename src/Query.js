export const query = (pageCount, queryString) => {

return { 
  query: `
{
    viewer {
      name
    }
    search(
      query: "${queryString} user:thejasonjones sort:updated-desc"
      type: REPOSITORY
      first: ${pageCount}
    ) {
      repositoryCount
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
`}
};

