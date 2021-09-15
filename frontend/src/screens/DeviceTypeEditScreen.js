import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsDeviceType, updateDeviceType } from "../actions/deviceActions";
import {
  detailsStationaryType,
  updateStationaryType,
} from "../actions/stationaryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { DEVICE_TYPE_UPDATE_RESET } from "../constants/deviceConstants";
import { STATIONAR_TYPE_UPDATE_RESET } from "../constants/stationaryConstants";

export default function DeviceTypeEditScreen(props) {
  const deviceTypeId = props.match.params.id;
  const [name, setName] = useState("");

  const deviceTypeDetails = useSelector((state) => state.deviceTypeDetails);
  const { loading, error, onedevicetype } = deviceTypeDetails;

  const deviceTypeUpdate = useSelector((state) => state.deviceTypeUpdate);
  const {
    loading: loadingUpdae,
    error: errorUpdate,
    success: successUpdate,
  } = deviceTypeUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DEVICE_TYPE_UPDATE_RESET });
      props.history.push("/devicetype");
    }
    if (!onedevicetype) {
      dispatch(detailsDeviceType(deviceTypeId));
    } else {
      setName(onedevicetype.name);
    }
  }, [dispatch, successUpdate, props.history, deviceTypeId, onedevicetype]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateDeviceType({ id: deviceTypeId, name }));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Device Type {name}</h1>
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
                Update Device Type
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
