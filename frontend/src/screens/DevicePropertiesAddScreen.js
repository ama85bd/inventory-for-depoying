import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listSource } from "../actions/sourceActions";
import {
  DEVICE_PROPERTIES_ADD_RESET,
  DEVICE_PROPERTIES_UPDATE_RESET,
  DEVICE_PURCHASE_UPDATE_RESET,
} from "../constants/deviceConstants";
import {
  addDeviceProperties,
  detailsDeviceProperties,
  detailsDevicePurchaseOne,
  getDeviceSerial,
  listDeviceType,
  updateDeviceProperties,
  updateDevicePurchase,
} from "../actions/deviceActions";

export default function DevicePropertiesAddScreen(props) {
  const id = props.match.params.id;
  const [deviceName, setDeviceName] = useState("");
  const [serial, setDeviceSerial] = useState("");
  const [devicePurchaseId, setName] = useState("");
  const [cpu, setCpu] = useState("");
  const [cpuspeed, setCpuspeed] = useState("");
  const [ram, setRam] = useState("");
  const [addram, setAddRam] = useState("");
  const [removeram, setRemoveRam] = useState("");
  const [graphics, setGraphics] = useState("");
  const [addgraphics, setAddGraphics] = useState("");
  const [removegraphics, setRemoveGraphics] = useState("");
  const [ssd, setSsd] = useState("");
  const [addssd, setAddSsd] = useState("");
  const [removessd, setRemoveSsd] = useState("");
  const [hdd, setHdd] = useState("");
  const [addhdd, setAddHdd] = useState("");
  const [removehdd, setRemoveHdd] = useState("");
  const [display, setDisplay] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [addkeyboard, setAddKeyboard] = useState("");
  const [removekeyboard, setRemoveKeyboard] = useState("");
  const [mouse, setMouse] = useState("");
  const [addmouse, setAddMouse] = useState("");
  const [removemouse, setRemoveMouse] = useState("");
  const [os, setOs] = useState("");
  const [addlan, setAddLan] = useState("");
  const [removelan, setRemoveLan] = useState("");
  const [adddisplay, setAddDisplay] = useState("");
  const [removedisplay, setRemoveDisplay] = useState("");

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

  const devicePropertiesAdd = useSelector((state) => state.devicePropertiesAdd);
  const {
    loading: loadingUpdae,
    error: errorUpdate,
    success: successUpdate,
  } = devicePropertiesAdd;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DEVICE_PROPERTIES_ADD_RESET });
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
      // setCpu(onePropertiesDetails.cpu);
      // setCpuspeed(onePropertiesDetails.cpuspeed);
      setRam(onePropertiesDetails.ram);
      // setAddRam(onePropertiesDetails.addram);
      // setRemoveRam(onePropertiesDetails.removeram);
      setGraphics(onePropertiesDetails.graphics);
      // setAddGraphics(onePropertiesDetails.addgraphics);
      // setRemoveGraphics(onePropertiesDetails.removegraphics);
      setSsd(onePropertiesDetails.ssd);
      // setAddSsd(onePropertiesDetails.addssd);
      // setRemoveSsd(onePropertiesDetails.removessd);
      setHdd(onePropertiesDetails.hdd);
      // setAddHdd(onePropertiesDetails.addhdd);
      // setRemoveHdd(onePropertiesDetails.removehdd);
      setDisplay(onePropertiesDetails.display);
      // setAddDisplay(onePropertiesDetails.adddisplay);
      // setRemoveDisplay(onePropertiesDetails.removedisplay);
      setKeyboard(onePropertiesDetails.keyboard);
      // setAddKeyboard(onePropertiesDetails.addkeyboard);
      // setRemoveKeyboard(onePropertiesDetails.removekeyboard);
      setMouse(onePropertiesDetails.mouse);
      // setAddMouse(onePropertiesDetails.addmouse);
      // setRemoveMouse(onePropertiesDetails.removemouse);
      // setAddLan(onePropertiesDetails.addlan);
      // setRemoveLan(onePropertiesDetails.removelan);
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
  const nram = Number(ram) + Number(addram);
  const nssd = Number(ssd) + Number(addssd);
  const nhdd = Number(hdd) + Number(addhdd);
  const ngraphics = Number(graphics) + Number(addgraphics);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addDeviceProperties(
        id,
        nram,
        addram,
        ngraphics,
        addgraphics,
        nssd,
        addssd,
        nhdd,
        addhdd,
        adddisplay,
        addkeyboard,
        addmouse,
        addlan,
        EntryBy,
        devicePurchaseId
      )
    );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>ADD Device Properties - {deviceName}</h1>
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
              <label htmlFor="ram">ADD RAM(GB)</label>
              <input
                type="text"
                id="ram"
                placeholder="RAM(GB)"
                value={addram}
                // required
                onChange={(e) => setAddRam(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="graphics">ADD Graphics(GB)</label>
              <input
                type="text"
                id="graphics"
                placeholder="Graphics(GB)"
                // required
                value={addgraphics}
                onLoad={(e) => setAddGraphics(0)}
                onChange={(e) => setAddGraphics(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ssd">ADD SSD(GB)</label>
              <input
                type="text"
                id="ssd"
                placeholder="SSD(GB)"
                // required
                value={addssd}
                onLoad={(e) => setAddSsd(0)}
                onChange={(e) => setAddSsd(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="hdd">ADD HDD(GB)</label>
              <input
                type="text"
                id="hdd"
                placeholder="HDD(GB)"
                // required
                value={addhdd}
                onLoad={(e) => setAddHdd(0)}
                onChange={(e) => setAddHdd(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="display">ADD Display</label>
              <input
                type="text"
                id="display"
                placeholder="Display"
                // required
                value={adddisplay}
                onChange={(e) => setAddDisplay(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="keyboard">ADD Keyboard</label>
              <input
                type="text"
                id="keyboard"
                placeholder="Keyboard"
                // required
                value={addkeyboard}
                onChange={(e) => setAddKeyboard(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mouse">ADD Mouse</label>
              <input
                type="text"
                id="mouse"
                value={addmouse}
                placeholder="Mouse"
                // required
                onChange={(e) => setAddMouse(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mouse">ADD LAN Card</label>
              <input
                type="text"
                id="lan"
                value={addlan}
                placeholder="LAN"
                // required
                onChange={(e) => setAddLan(e.target.value)}
              />
            </div>

            <div>
              <label />
              <button className="primary" type="submit">
                ADD Device Properties
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
