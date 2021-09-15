import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listSource } from "../actions/sourceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  DEVICE_PROPERTIES_CREATE_RESET,
  DEVICE_PURCHASE_CREATE_RESET,
} from "../constants/deviceConstants";
import {
  listDeviceType,
  createDevicePurchase,
  createDeviceProperties,
  listDevicePurchase,
  getDeviceSerial,
} from "../actions/deviceActions";
import { useParams } from "react-router";

export default function CreateDevicePropertiesScreen(props) {
  const { pageNumber = 1 } = useParams();
  const deviceSerial = useSelector((state) => state.deviceSerial);
  const {
    loading: loadingPurchaseDetails,
    error: errorPurchaseDetailse,
    allDeviceSerial,
  } = deviceSerial;
  // const devicePurchaseList = useSelector((state) => state.devicePurchaseList);
  // const {
  //   loading: loadingPurchaseDetails,
  //   error: errorPurchaseDetailse,
  //   purchase,
  //   page,
  //   pages,
  // } = devicePurchaseList;

  const deviceTypeList = useSelector((state) => state.deviceTypeList);
  const { loading, error, allDeviceType } = deviceTypeList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const EntryBy = userInfo.id;
  const [devicePurchaseId, setName] = useState("");
  const [deviceTypeId, setDeviceTypeId] = useState("");
  const [cpu, setCpu] = useState("");
  const [cpuspeed, setCpuspeed] = useState("");
  const [ram, setRam] = useState("");
  const [graphics, setGraphics] = useState("");
  const [ssd, setSsd] = useState("");
  const [hdd, setHdd] = useState("");
  const [display, setDisplay] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [mouse, setMouse] = useState("");
  const [os, setOs] = useState("");
  const devicePropertiesCreate = useSelector(
    (state) => state.devicePropertiesCreate
  );
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = devicePropertiesCreate;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createDeviceProperties(
        cpu,
        cpuspeed,
        ram,
        graphics,
        ssd,
        hdd,
        display,
        keyboard,
        mouse,
        os,
        EntryBy,
        devicePurchaseId,
        deviceTypeId
      )
    );
  };
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: DEVICE_PROPERTIES_CREATE_RESET });
      props.history.push(`/deviceproperties`);
    }

    // dispatch(listDevicePurchase({ pageNumber }));
    dispatch(listDeviceType());
  }, [dispatch, successCreate, props.history]);
  console.log(successCreate);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Device Properties</h1>
        </div>

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <label htmlFor="dname">Device Name</label>
            <select
              name="dname"
              required
              onChange={(e) => {
                setDeviceTypeId(e.target.value);
                dispatch(getDeviceSerial(e.target.value));
              }}
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
        {loadingPurchaseDetails ? (
          // <LoadingBox></LoadingBox>
          <h1>Please select Device Name</h1>
        ) : errorPurchaseDetailse ? (
          <MessageBox variant="danger">{errorPurchaseDetailse}</MessageBox>
        ) : (
          <div>
            <label htmlFor="name">Device Serial</label>
            <select
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            >
              <option value="">Select Device Serial</option>
              {allDeviceSerial.map((devicetype) => (
                <option key={devicetype.id} value={devicetype.id}>
                  {devicetype.serial}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="cpu">CPU</label>
          <input
            type="text"
            id="cpu"
            placeholder="CPU"
            required
            onChange={(e) => setCpu(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cpuspeed">Cpu speed(GHz)</label>
          <input
            type="text"
            id="cpuspeed"
            placeholder="Cpu speed(GHz)"
            required
            onChange={(e) => setCpuspeed(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ram">RAM(GB)</label>
          <input
            type="text"
            id="ram"
            placeholder="RAM(GB)"
            required
            onChange={(e) => setRam(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="graphics">Graphics(GB)</label>
          <input
            type="text"
            id="graphics"
            placeholder="Graphics(GB)"
            required
            onChange={(e) => setGraphics(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ssd">SSD(GB)</label>
          <input
            type="text"
            id="ssd"
            placeholder="SSD(GB)"
            required
            onChange={(e) => setSsd(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hdd">HDD(GB)</label>
          <input
            type="text"
            id="hdd"
            placeholder="HDD(GB)"
            required
            onChange={(e) => setHdd(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="display">Display</label>
          <input
            type="text"
            id="display"
            placeholder="Display"
            required
            onChange={(e) => setDisplay(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyboard">Keyboard</label>
          <input
            type="text"
            id="keyboard"
            placeholder="Keyboard"
            required
            onChange={(e) => setKeyboard(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mouse">Mouse</label>
          <input
            type="text"
            id="mouse"
            placeholder="Mouse"
            required
            onChange={(e) => setMouse(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="os">Operating System</label>
          <input
            type="text"
            id="os"
            placeholder="Operating System"
            required
            onChange={(e) => setOs(e.target.value)}
          />
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Create Device Properties
          </button>
        </div>
      </form>
    </div>
  );
}
