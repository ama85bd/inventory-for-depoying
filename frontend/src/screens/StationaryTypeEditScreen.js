import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsStationaryType,
  updateStationaryType,
} from "../actions/stationaryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { STATIONAR_TYPE_UPDATE_RESET } from "../constants/stationaryConstants";

export default function StationaryTypeEditScreen(props) {
  const stTypeId = props.match.params.id;
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const stationaryTypeDetails = useSelector(
    (state) => state.stationaryTypeDetails
  );
  const { loading, error, stationaryType } = stationaryTypeDetails;

  const stationaryTypeUpdate = useSelector(
    (state) => state.stationaryTypeUpdate
  );
  const {
    loading: loadingUpdae,
    error: errorUpdate,
    success: successUpdate,
  } = stationaryTypeUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STATIONAR_TYPE_UPDATE_RESET });
      props.history.push("/stationarytype");
    }
    if (!stationaryType) {
      dispatch(detailsStationaryType(stTypeId));
    } else {
      setName(stationaryType.name);
      setUnit(stationaryType.unit);
    }
  }, [dispatch, stTypeId, stationaryType, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateStationaryType({ id: stTypeId, name, unit }));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Stationary Type {name}</h1>
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
              <label htmlFor="unit">Unit</label>
              <input
                id="unit"
                type="text"
                placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
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
