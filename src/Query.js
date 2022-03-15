export const query = (pageCount, queryString, pagenationKeyword, pagenationString) => {

return { 
  query: `
{
    viewer {
      name
    }
    search(
      query: "${queryString} user:thejasonjones sort:updated-desc"
      type: REPOSITORY
      ${pagenationKeyword}: ${pageCount}
      ${pagenationString}
    ) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            description
            url
            viewerSubscription
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
}
`}
};

