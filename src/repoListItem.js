import React from "react";

const RepoListItem = ({ id, url, name, description,viewerSubscription}) => (
<li key={id} className="list-group-item">
  <div className="d-flex justify-content-between align-items-center">
    <div className="d-flex flex-column">
      <a href={url} className="h5 mb-0 text-decoration-none">
        {name}
      </a>
      <p className="small">{description}</p>
    </div>
    <span className={ "px-1 py-1 ms-1 d-inline-block btn btn-sm" +
      (viewerSubscription === "SUBSCRIBED" ? " btn-success" : " btn-outline-secondary")}
    >
      {viewerSubscription}</span>
  </div>
</li>);

export default RepoListItem;