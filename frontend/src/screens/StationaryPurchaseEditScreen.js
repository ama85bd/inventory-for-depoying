import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  detailsStationaryType,
  listStationaryType,
  updateStationaryType,
} from "../actions/stationaryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { STATIONAR_TYPE_UPDATE_RESET } from "../constants/stationaryConstants";
import { listSource } from "../actions/sourceActions";
import {
  detailsStationaryPurchaseOne,
  updateStationaryPurchase,
} from "../actions/stationaryPurchaseActions";
import {
  STATIONARY_ONE_PURCHASE_DETAILS_RESET,
  STATIONARY_PURCHASE_DETAILS_RESET,
  STATIONARY_PURCHASE_UPDATE_RESET,
} from "../constants/stationaryPurchaseConstants";

export default function StationaryPurchaseEditScreen(props) {
  const stPurchaseId = props.match.params.id;
  const [name, setName] = useState("");
  const [StaTypeId, setNameId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [source, setSource] = useState("");
  const [SourceTypeId, setSourceId] = useState(0);
  const [purchaseDate, setStartDate] = useState(null);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const EntryBy = userInfo.id;
  const stationaryPurchaseOneDetails = useSelector(
    (state) => state.stationaryPurchaseOneDetails
  );
  const { loading, error, onepurchase } = stationaryPurchaseOneDetails;

  const stationaryTypeList = useSelector((state) => state.stationaryTypeList);
  const {
    loading: loadingStType,
    error: errorStType,
    allStationaryType,
  } = stationaryTypeList;

  const sourceList = useSelector((state) => state.sourceList);
  const { loading: loadingSource, error: errorSource, allSource } = sourceList;

  const statinaryPurchaseUpdate = useSelector(
    (state) => state.statinaryPurchaseUpdate
  );
  const {
    loading: loadingUpdae,
    error: errorUpdate,
    success: successUpdate,
  } = statinaryPurchaseUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STATIONARY_PURCHASE_UPDATE_RESET });
      props.history.push("/stationarypurchase");
    }
    if (!onepurchase) {
      dispatch(detailsStationaryPurchaseOne(stPurchaseId));
      dispatch(listSource());
      dispatch(listStationaryType());
    } else {
      setName(onepurchase.StaType.name);
      setNameId(onepurchase.StaType.id);
      setQuantity(onepurchase.quantity);
      setSource(onepurchase.SourceType.name);
      setSourceId(onepurchase.SourceType.id);
      setStartDate(new Date(onepurchase.purchaseDate));
    }
    // dispatch({ type: STATIONARY_PURCHASE_DETAILS_RESET });
  }, [dispatch, stPurchaseId, onepurchase, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateStationaryPurchase(
        stPurchaseId,
        quantity,
        purchaseDate,
        EntryBy,
        StaTypeId,
        SourceTypeId
      )
    );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Stationary Purchase - {name}</h1>
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
              {loadingStType ? (
                <LoadingBox></LoadingBox>
              ) : errorStType ? (
                <MessageBox variant="danger">{errorStType}</MessageBox>
              ) : (
                <div>
                  <label htmlFor="name">Stationary Name</label>
                  <select
                    name="name"
                    onChange={(e) => setNameId(e.target.value)}
                    // defaultValue=
                  >
                    <option value="">{name}</option>
                    {allStationaryType.map((sttype) => (
                      <option key={sttype.id} value={sttype.id}>
                        {sttype.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                id="quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              {loadingSource ? (
                <LoadingBox></LoadingBox>
              ) : errorSource ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <div>
                  <label htmlFor="source">Source</label>
                  <select
                    name="source"
                    onChange={(e) => setSourceId(e.target.value)}
                  >
                    <option value="">{source}</option>
                    {allSource.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <DatePicker
                selected={purchaseDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                // timeFormat="hh:mm aa"
                // timeIntervals={15}
                // timeCaption="Time"
                dateFormat="MM-dd-yyyy"
              />
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
