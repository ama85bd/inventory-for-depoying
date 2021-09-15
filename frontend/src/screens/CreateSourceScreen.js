import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSource } from "../actions/sourceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { SOURCE_CREATE_RESET } from "../constants/sourceConstants";

export default function CreateSourceScreen(props) {
  const [name, setName] = useState("");

  const sourceCreate = useSelector((state) => state.sourceCreate);
  const { success, loading, error } = sourceCreate;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSource(name));
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: SOURCE_CREATE_RESET });
      props.history.push(`/sourcelist`);
    }
  }, [dispatch, props.history, success]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Stationary Type</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Create Source
          </button>
        </div>
      </form>
    </div>
  );
}
