import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listSource } from "../actions/sourceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { DEVICE_PURCHASE_CREATE_RESET } from "../constants/deviceConstants";
import { listDeviceType, createDevicePurchase } from "../actions/deviceActions";

export default function CreateDevicePurchaseScreen(props) {
  const deviceTypeList = useSelector((state) => state.deviceTypeList);
  const { loading, error, allDeviceType } = deviceTypeList;
  const sourceList = useSelector((state) => state.sourceList);
  const { loading: loadingSource, error: errorSource, allSource } = sourceList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const EntryBy = userInfo.id;
  const devicePurchaseCreate = useSelector(
    (state) => state.devicePurchaseCreate
  );
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = devicePurchaseCreate;
  const [deviceTypeId, setName] = useState("");
  const [serial, setSerial] = useState("");
  const [brand, setBrand] = useState("");
  const [SourceTypeId, setSource] = useState("");
  const [purchaseDate, setStartDate] = useState(new Date());
  const [warranty, setWarranty] = useState(new Date());

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createDevicePurchase(
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
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: DEVICE_PURCHASE_CREATE_RESET });
      props.history.push(`/devicepurchase`);
    }

    dispatch(listSource());
    dispatch(listDeviceType());
  }, [dispatch, successCreate, props.history]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Device Purchase</h1>
        </div>

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <label htmlFor="name">Device Name</label>
            <select
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            >
              <option value="">Select Device Name</option>
              {allDeviceType.map((devicetype) => (
                <option key={devicetype.id} value={devicetype.id}>
                  {devicetype.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="serial">Serial</label>
          <input
            type="text"
            id="serial"
            placeholder="Serial"
            required
            onChange={(e) => setSerial(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            placeholder="Brand"
            required
            onChange={(e) => setBrand(e.target.value)}
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
          <label htmlFor="warranty">Warranty</label>
          <DatePicker
            selected={warranty}
            onChange={(date) => setWarranty(date)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Create Device Purchase
          </button>
        </div>
      </form>
    </div>
  );
}
