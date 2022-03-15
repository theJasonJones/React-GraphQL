import React, { useEffect, useState, useCallback } from "react";
import github from "./db.js";
import { query } from "./Query";

import "./custom.scss";
import RepoListItem from "./repoListItem.js";
import SearchBox from "./SearchBox.js";
import NavButtons from "./NavButton.js";

function App() {
  let [userName, setuserName] = useState('');
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(5);
  let [queryString, setQueryString] = useState("react");
  let [totalCount, setTotalCount] = useState(null);

  let [startCursor, setStartCursor] = useState(null);
  let [endCursor, setEndCursor] = useState(null);
  let [hasPreviousPage, setPreviousPage] = useState(false);
  let [hasNextPage, setHasNextpage] = useState(true);
  let [paginationKeyword, setPaginationKeyword] = useState("first");
  let [paginationString, setPaginationString] = useState("");

  const fetchData = useCallback( () => {
    const queryText = JSON.stringify(query(pageCount, queryString, paginationKeyword, paginationString));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers, 
      body: queryText
    })
    .then(response => response.json())
    .then(d => {
      const { data } = d;
      console.log('data', data);
      
      setuserName(data.viewer);
      setRepoList(data.search.edges);
      setTotalCount(data.search.repositoryCount);
      setStartCursor(data.search.pageInfo?.startCursor);
      setEndCursor(data.search.pageInfo?.endCursor);
      setHasNextpage(data.search.pageInfo?.hasNextPage);
      setPreviousPage(data.search.pageInfo?.hasPreviousPage);
    })
    .catch(err => console.error(err))
  }, [pageCount, queryString, paginationString, paginationKeyword])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const { name } = userName;

  return (
    <div className="container mt-5">
      <h1 className="text-primary"><i className="bi bi-diagram-2-fill"></i>Repos</h1>
      <p><strong>Hello {name}</strong></p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={(myString) =>{ setQueryString(myString)}}
        onTotalChange={(myNumber) =>{ setPageCount(myNumber)}}
      />
      <NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(myKeyword, myString) => {
          setPaginationKeyword(myKeyword);
          setPaginationString(myString);
        }}
      />
      <p>
        <strong>Search for: {queryString}</strong> | <strong>Items per page: {pageCount}</strong> | <strong>Repos found: {totalCount}</strong>
      </p>
      { repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map(repo =>
            <RepoListItem key={repo.node.id} {...repo.node} />
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
