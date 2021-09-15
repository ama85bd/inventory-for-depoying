import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDeviceType } from "../actions/deviceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { DEVICE_TYPE_CREATE_RESET } from "../constants/deviceConstants";

export default function CreateDeviceTypeScreen(props) {
  const [name, setName] = useState("");

  const deviceTypeCreate = useSelector((state) => state.deviceTypeCreate);
  const { success, loading, error } = deviceTypeCreate;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDeviceType(name));
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: DEVICE_TYPE_CREATE_RESET });
      props.history.push(`/devicetype`);
    }
  }, [dispatch, props.history, success]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Device Type</h1>
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
            Create Device Type
          </button>
        </div>
      </form>
    </div>
  );
}
