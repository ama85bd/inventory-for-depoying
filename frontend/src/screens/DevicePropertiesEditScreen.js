import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listSource } from "../actions/sourceActions";
import {
  DEVICE_PROPERTIES_UPDATE_RESET,
  DEVICE_PURCHASE_UPDATE_RESET,
} from "../constants/deviceConstants";
import {
  detailsDeviceProperties,
  detailsDevicePurchaseOne,
  getDeviceSerial,
  listDeviceType,
  updateDeviceProperties,
  updateDevicePurchase,
} from "../actions/deviceActions";

export default function DevicePropertiesEditScreen(props) {
  const id = props.match.params.id;
  const [deviceName, setDeviceName] = useState("");
  const [serial, setDeviceSerial] = useState("");
  const [devicePurchaseId, setName] = useState("");
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

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const EntryBy = userInfo.id;
  const devicePropertiesDetails = useSelector(
    (state) => state.devicePropertiesDetails
  );
  const { loading, error, onePropertiesDetails } = devicePropertiesDetails;

  const deviceSerial = useSelector((state) => state.deviceSerial);
  const {
    loading: loadingPurchaseDetails,
    error: errorPurchaseDetailse,
    allDeviceSerial,
  } = deviceSerial;

  const deviceTypeList = useSelector((state) => state.deviceTypeList);
  const {
    loading: deviveLoading,
    error: deviceError,
    allDeviceType,
  } = deviceTypeList;

  const devicePropertiesUpdate = useSelector(
    (state) => state.devicePropertiesUpdate
  );
  const {
    loading: loadingUpdae,
    error: errorUpdate,
    success: successUpdate,
  } = devicePropertiesUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DEVICE_PROPERTIES_UPDATE_RESET });
      props.history.push("/deviceproperties");
    }
    if (!onePropertiesDetails) {
      dispatch(detailsDeviceProperties(id));
      dispatch(listDeviceType());
      dispatch(getDeviceSerial(id));
    } else {
      setDeviceName(onePropertiesDetails.devicePurchase.deviceType.name);
      setDeviceSerial(onePropertiesDetails.devicePurchase.serial);
      setName(onePropertiesDetails.devicePurchase.id);
      setCpu(onePropertiesDetails.cpu);
      setCpuspeed(onePropertiesDetails.cpuspeed);
      setRam(onePropertiesDetails.ram);
      setGraphics(onePropertiesDetails.graphics);
      setSsd(onePropertiesDetails.ssd);
      setHdd(onePropertiesDetails.hdd);
      setDisplay(onePropertiesDetails.display);
      setKeyboard(onePropertiesDetails.keyboard);
      setMouse(onePropertiesDetails.mouse);
      setOs(onePropertiesDetails.os);
    }
    // dispatch({ type: STATIONARY_PURCHASE_DETAILS_RESET });
  }, [
    dispatch,
    devicePurchaseId,
    successUpdate,
    props.history,
    onePropertiesDetails,
    id,
  ]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDeviceProperties(
        id,
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
        devicePurchaseId
      )
    );
  };
  console.log(serial);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Device Properties - {deviceName}</h1>
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
              {deviveLoading ? (
                <LoadingBox></LoadingBox>
              ) : deviceError ? (
                <MessageBox variant="danger">{deviceError}</MessageBox>
              ) : (
                <div>
                  <label htmlFor="dname">Device Name</label>
                  <select
                    name="dname"
                    onChange={(e) => {
                      // setDeviceTypeId(e.target.value);
                      dispatch(getDeviceSerial(e.target.value));
                    }}
                  >
                    <option value="">{deviceName}</option>
                    {allDeviceType.map((devicetype) => (
                      <option key={devicetype.id} value={devicetype.id}>
                        {devicetype.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div>
              {loadingPurchaseDetails ? (
                <LoadingBox></LoadingBox>
              ) : // <h1>Please select Device Name</h1>
              errorPurchaseDetailse ? (
                <MessageBox variant="danger">
                  {errorPurchaseDetailse}
                </MessageBox>
              ) : (
                <div>
                  <label htmlFor="name">Device Serial</label>
                  <select name="name" onChange={(e) => setName(e.target.value)}>
                    <option value="" required>
                      {serial}
                    </option>
                    {allDeviceSerial.map((devicepro) => (
                      <option key={devicepro.id} value={devicepro.id}>
                        {devicepro.serial}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="cpu">CPU</label>
              <input
                type="text"
                id="cpu"
                placeholder="CPU"
                value={cpu}
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
                value={cpuspeed}
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
                value={ram}
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
                value={graphics}
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
                value={ssd}
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
                value={hdd}
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
                value={display}
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
                value={keyboard}
                onChange={(e) => setKeyboard(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mouse">Mouse</label>
              <input
                type="text"
                id="mouse"
                value={mouse}
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
                value={os}
                placeholder="Operating System"
                required
                onChange={(e) => setOs(e.target.value)}
              />
            </div>

            <div>
              <label />
              <button className="primary" type="submit">
                Update Device Properties
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
