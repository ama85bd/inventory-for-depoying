import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStationaryType } from "../actions/stationaryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { STATIONAR_TYPE_CREATE_RESET } from "../constants/stationaryConstants";
import { USER_CREATE_RESET } from "../constants/userConstants";

export default function CreateStationaryTypeScreen(props) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const stationaryTypeCreate = useSelector(
    (state) => state.stationaryTypeCreate
  );
  const { success, loading, error } = stationaryTypeCreate;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createStationaryType(name, unit));
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: STATIONAR_TYPE_CREATE_RESET });
      props.history.push(`/stationarytype`);
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
          <label htmlFor="Unit">Unit</label>
          <input
            type="text"
            id="Unit"
            placeholder="Unit"
            required
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Create Stationary Type
          </button>
        </div>
      </form>
    </div>
  );
}
