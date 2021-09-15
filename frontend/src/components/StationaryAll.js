import React from "react";
import { Link } from "react-router-dom";

export default function StationaryAll(props) {
  const { stationary } = props;
  return (
    <div key={stationary.id} className="card">
      <div className="card-body">
        {/* <Link to={`/product/${stationary.id}`}> */}
        <h2>{stationary.name}</h2>
        {/* </Link> */}
        <div className="row">
          <div className="price">
            <h5>
              {stationary.total} {stationary.unit}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
