import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllStationary } from "../actions/stationaryPurchaseActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function StationaryConsumeScreen(props) {
  const allStationaryList = useSelector((state) => state.allStationaryList);
  const { loading, error, allStationary } = allStationaryList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStationary());
  }, [dispatch]);
  return (
    <div>
      <div className="row">
        <h1>Stationary List</h1>
        <Link to="/stationaryassign">
          <button className="primary"> Assign Stationary</button>
        </Link>
      </div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Stationary Name</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {allStationary.map((stationary) => (
              <tr key={stationary.id}>
                <td>{stationary.id}</td>
                <td>{stationary.name}</td>
                <td>
                  {stationary.total} {stationary.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
