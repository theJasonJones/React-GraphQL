import React, { useEffect, useState, useCallback } from "react";
import github from "./db.js";
import { query } from "./Query";

import "./custom.scss";

function App() {
  let [userName, setuserName] = useState('');
  let [repoList, setRepoList] = useState(null);

  const fetchData = useCallback( () => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers, 
      body: JSON.stringify(query)
    })
    .then(response => response.json())
    .then(d => {
      const { data } = d;
      console.log(data);
      setuserName(data.viewer);
      setRepoList(data.viewer.repositories.nodes)
    })
    .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const { name } = userName;
  console.log('repo',repoList);
  return (
    <div className="container mt-5">
      <h1 className="text-primary"><i className="bi bi-diagram-2-fill"></i>Repos</h1>
      <p><strong>{name}</strong></p>
      { repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map(repo => <li key={repo.id} className="list-group-item">
            <a href={repo.url} className="h5 mb-0 text-decoration-none">
              {repo.name}</a>
              <p className="small">{repo.description}</p>
          </li>)}
        </ul>
      )}
    </div>
  );
}

export default App;
