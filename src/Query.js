export const query = {
query: `
{
    viewer {
     name
      repositories(last: 10){
        nodes {
          name
          description
          id
          url
        }
      }
    }
  }
`
};

