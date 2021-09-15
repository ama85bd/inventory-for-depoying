import React from "react";

export default function Users(props) {
  const { user } = props;
  return (
    <div key={user.id} class="card">
      <div class="card-body">
        <a href={`/user/${user.id}`}>
          <h2>{user.name}</h2>
          <h2>{user.email}</h2>
        </a>
        <div class="price">{user.dept}</div>
      </div>
    </div>
  );
}
