import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSource, listSource } from "../actions/sourceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SourceListScreen(props) {
  const sourceList = useSelector((state) => state.sourceList);
  const { loading, error, allSource } = sourceList;
  const sourceDelete = useSelector((state) => state.sourceDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = sourceDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listSource());
  }, [dispatch, successDelete]);
  const deleteHandler = (source) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteSource(source.id));
    }
  };
  return (
    <div>
      <div className="row">
        <h1>Source List</h1>
        <Link to="/createsource">
          <button className="primary"> Create Source</button>
        </Link>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Source Deleted Successfully</MessageBox>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allSource.map((source) => (
              <tr key={source.id}>
                <td>{source.id}</td>
                <td>{source.name}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/sourceedit/${source.id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(source)}
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
