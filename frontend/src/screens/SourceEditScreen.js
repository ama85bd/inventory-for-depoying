import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsSource, updateSource } from "../actions/sourceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { SOURCE_UPDATE_RESET } from "../constants/sourceConstants";

export default function SourceEditScreen(props) {
  const sourceId = props.match.params.id;
  const [name, setName] = useState("");

  const sourceDetails = useSelector((state) => state.sourceDetails);
  const { loading, error, source } = sourceDetails;

  const sourceUpdate = useSelector((state) => state.sourceUpdate);
  const {
    loading: loadingUpdae,
    error: errorUpdate,
    success: successUpdate,
  } = sourceUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SOURCE_UPDATE_RESET });
      props.history.push("/sourcelist");
    }
    if (!source) {
      dispatch(detailsSource(sourceId));
    } else {
      setName(source.name);
    }
  }, [dispatch, sourceId, source, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSource({ id: sourceId, name }));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Source {name}</h1>
          {loadingUpdae && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
