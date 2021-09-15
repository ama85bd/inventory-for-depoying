import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteStationaryType,
  listStationaryType,
} from "../actions/stationaryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { STATIONAR_TYPE_DETAILS_RESET } from "../constants/stationaryConstants";

export default function StationaryTypeListScreen(props) {
  const stationaryTypeList = useSelector((state) => state.stationaryTypeList);
  const { loading, error, allStationaryType } = stationaryTypeList;
  const stationaryTypeDelete = useSelector(
    (state) => state.stationaryTypeDelete
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = stationaryTypeDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listStationaryType());
    dispatch({ type: STATIONAR_TYPE_DETAILS_RESET });
  }, [dispatch, successDelete]);
  const deleteHandler = (stType) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteStationaryType(stType.id));
    }
  };
  return (
    <div>
      <div className="row">
        <h1>Stationary Type</h1>
        <Link to="/createstationarytype">
          <button className="primary"> Create Stationary Type</button>
        </Link>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">
          Stationary Type Deleted Successfully
        </MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allStationaryType.map((stType) => (
              <tr key={stType.id}>
                <td>{stType.id}</td>
                <td>{stType.name}</td>
                <td>{stType.unit}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(
                        `/stationarytypeedit/${stType.id}/edit`
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(stType)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
