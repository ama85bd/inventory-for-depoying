import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listSource } from "../actions/sourceActions";
import { listStationaryType } from "../actions/stationaryActions";
import { createStationaryPurchase } from "../actions/stationaryPurchaseActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { STATIONARY_PURCHASE_CREATE_RESET } from "../constants/stationaryPurchaseConstants";

export default function CreateStationaryPurchaseScreen(props) {
  const stationaryTypeList = useSelector((state) => state.stationaryTypeList);
  const { loading, error, allStationaryType } = stationaryTypeList;
  const sourceList = useSelector((state) => state.sourceList);
  const { loading: loadingSource, error: errorSource, allSource } = sourceList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const EntryBy = userInfo.id;
  const stationaryPurchaseCreate = useSelector(
    (state) => state.stationaryPurchaseCreate
  );
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = stationaryPurchaseCreate;
  const [StaTypeId, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [SourceTypeId, setSource] = useState("");
  const [purchaseDate, setStartDate] = useState(new Date());

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createStationaryPurchase(
        quantity,
        purchaseDate,
        EntryBy,
        StaTypeId,
        SourceTypeId
      )
    );
  };
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: STATIONARY_PURCHASE_CREATE_RESET });
      props.history.push(`/stationarypurchase`);
    }

    dispatch(listSource());
    dispatch(listStationaryType());
  }, [dispatch, successCreate, props.history]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Stationary Purchase</h1>
        </div>

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <label htmlFor="name">Stationary Name</label>
            <select
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            >
              <option value="">Select Stationary Name</option>
              {allStationaryType.map((sttype) => (
                <option key={sttype.id} value={sttype.id}>
                  {sttype.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            placeholder="Quantity"
            required
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        {loadingSource ? (
          <LoadingBox></LoadingBox>
        ) : errorSource ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <label htmlFor="source">Source</label>
            <select
              name="source"
              required
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="">Select Source</option>
              {allSource.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="date">Date</label>
          <DatePicker
            selected={purchaseDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Create Stationary Purchase
          </button>
        </div>
      </form>
    </div>
  );
}
