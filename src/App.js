import React, { useEffect, useState, useCallback } from "react";
import github from "./db.js";
import { query } from "./Query";

import "./custom.scss";
import RepoListItem from "./repoListItem.js";

function App() {
  let [userName, setuserName] = useState('');
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState("react");
  let [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback( () => {
    const queryText = JSON.stringify(query(pageCount, queryString));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers, 
      body: queryText
    })
    .then(response => response.json())
    .then(d => {
      console.log('d', d);
      const { data } = d;
      console.log('data', data);
      
      setuserName(data.viewer);
      setRepoList(data.search.nodes)

      //setPageCount(data.search.repositoryCount)
      setTotalCount(data.search.repositoryCount)
    })
    .catch(err => console.error(err))
  }, [pageCount, queryString])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const { name } = userName;

  return (
    <div className="container mt-5">
      <h1 className="text-primary"><i className="bi bi-diagram-2-fill"></i>Repos</h1>
      <p><strong>Hello {name}</strong></p>
      <p>
        <strong>Search for: {queryString}</strong> | <strong>Items per page: {pageCount}</strong> | <strong>Repos found: {totalCount}</strong>
      </p>
      { repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map(repo =>
            <RepoListItem key={repo.id} {...repo} />
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
