import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listSource } from "../actions/sourceActions";
import { DEVICE_PURCHASE_UPDATE_RESET } from "../constants/deviceConstants";
import {
  detailsDevicePurchaseOne,
  listDeviceType,
  updateDevicePurchase,
} from "../actions/deviceActions";

export default function DevicePurchaseEditScreen(props) {
  const devicePurchaseId = props.match.params.id;
  const [name, setName] = useState("");
  const [deviceTypeId, setNameId] = useState(0);
  const [serial, setSerial] = useState("");
  const [brand, setBrand] = useState("");
  const [source, setSource] = useState("");
  const [SourceTypeId, setSourceId] = useState(0);
  const [purchaseDate, setStartDate] = useState(null);
  const [warranty, setWarranty] = useState(null);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const EntryBy = userInfo.id;
  const devicePurchaseOneDetails = useSelector(
    (state) => state.devicePurchaseOneDetails
  );
  const { loading, error, onepurchase } = devicePurchaseOneDetails;

  const deviceTypeList = useSelector((state) => state.deviceTypeList);
  const {
    loading: loadingStType,
    error: errorStType,
    allDeviceType,
  } = deviceTypeList;

  const sourceList = useSelector((state) => state.sourceList);
  const { loading: loadingSource, error: errorSource, allSource } = sourceList;

  const devicePurchaseUpdate = useSelector(
    (state) => state.devicePurchaseUpdate
  );
  const {
    loading: loadingUpdae,
    error: errorUpdate,
    success: successUpdate,
  } = devicePurchaseUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DEVICE_PURCHASE_UPDATE_RESET });
      props.history.push("/devicepurchase");
    }
    if (!onepurchase) {
      dispatch(detailsDevicePurchaseOne(devicePurchaseId));
      dispatch(listSource());
      dispatch(listDeviceType());
    } else {
      setName(onepurchase.deviceType.name);
      setNameId(onepurchase.deviceType.id);
      setSerial(onepurchase.serial);
      setBrand(onepurchase.brand);
      setSource(onepurchase.SourceType.name);
      setSourceId(onepurchase.SourceType.id);
      setStartDate(new Date(onepurchase.purchaseDate));
      setWarranty(new Date(onepurchase.warranty));
    }
    // dispatch({ type: STATIONARY_PURCHASE_DETAILS_RESET });
  }, [dispatch, devicePurchaseId, onepurchase, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDevicePurchase(
        devicePurchaseId,
        serial,
        brand,
        purchaseDate,
        warranty,
        EntryBy,
        deviceTypeId,
        SourceTypeId
      )
    );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Device Purchase - {name}</h1>
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
                  <label htmlFor="name">Device Name</label>
                  <select
                    name="name"
                    onChange={(e) => setNameId(e.target.value)}
                    // defaultValue=
                  >
                    <option value="">{name}</option>
                    {allDeviceType.map((sttype) => (
                      <option key={sttype.id} value={sttype.id}>
                        {sttype.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="serial">Serial</label>
              <input
                type="text"
                id="serial"
                placeholder="Serial"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
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
              <label htmlFor="warranty">Warranty</label>
              <DatePicker
                selected={warranty}
                onChange={(date) => setWarranty(date)}
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
