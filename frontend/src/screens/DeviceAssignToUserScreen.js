import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listSource } from "../actions/sourceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  DEVICE_CONSUME_CREATE_RESET,
  DEVICE_DETAILS_LIST_RESET,
  DEVICE_PROPERTIES_CREATE_RESET,
  DEVICE_PURCHASE_ASSIGN_UPDATE_RESET,
  DEVICE_PURCHASE_CREATE_RESET,
  DEVICE_SERIAL_LIST_RESET,
  DEVICE_TYPE_LIST_RESET,
} from "../constants/deviceConstants";
import {
  listDeviceType,
  createDevicePurchase,
  createDeviceProperties,
  listDevicePurchase,
  getDeviceSerial,
  getDeviceDetails,
  createDeviceConsume,
  updateDevicePurchaseAssign,
  getDeviceSerialWithoutAssign,
} from "../actions/deviceActions";
import { useParams } from "react-router";
import { listUsers } from "../actions/userActions";

export default function DeviceAssignToUserScreen(props) {
  const { pageNumber = 1 } = useParams();
  const deviceSerial = useSelector((state) => state.deviceSerial);
  const {
    loading: loadingPurchaseDetails,
    error: errorPurchaseDetailse,
    allDeviceSerial,
  } = deviceSerial;

  const deviceTypeList = useSelector((state) => state.deviceTypeList);
  const { loading, error, allDeviceType } = deviceTypeList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const EntryBy = userInfo.id;
  const [devicePurchaseId, setName] = useState("");
  const [serial, setSerial] = useState("");
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
  const [assignUserId, setAssignUser] = useState("");
  const [assignDate, setAssignDate] = useState(new Date());
  const deviceConsumeCreate = useSelector((state) => state.deviceConsumeCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = deviceConsumeCreate;
  const devicePurchaseAssignUpdate = useSelector(
    (state) => state.devicePurchaseAssignUpdate
  );
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = devicePurchaseAssignUpdate;
  const deviceDetails = useSelector((state) => state.deviceDetails);
  const {
    loading: loadingDeviceDetails,
    error: errorDeviceDetails,
    oneDeviceDetails,
  } = deviceDetails;

  const userList = useSelector((state) => state.userList);
  const { loading: userLoading, error: userError, users } = userList;

  const getSerial = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    setSerial(optionElement.getAttribute("id"));
  };

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateDevicePurchaseAssign(devicePurchaseId));
    dispatch(
      createDeviceConsume({
        assignDate,
        EntryBy,
        assignUserId,
        devicePurchaseId,
      })
    );
  };
  useEffect(() => {
    if (successCreate && successUpdate) {
      dispatch({ type: DEVICE_CONSUME_CREATE_RESET });
      dispatch({ type: DEVICE_PURCHASE_ASSIGN_UPDATE_RESET });
      props.history.push(`/deviceassign`);
    }
    // if (successUpdate) {
    //   dispatch({ type: DEVICE_PURCHASE_ASSIGN_UPDATE_RESET });
    // }
    // dispatch({ type: DEVICE_TYPE_LIST_RESET });
    // dispatch(listDevicePurchase({ pageNumber }));
    // dispatch({ type: DEVICE_DETAILS_LIST_RESET });
    dispatch(listUsers());
    dispatch(listDeviceType());
  }, [dispatch, successCreate, props.history, successUpdate]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Device Assign to User</h1>
        </div>

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
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
                // setDeviceTypeId(e.target.value);
                dispatch(getDeviceSerialWithoutAssign(e.target.value));
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
              onChange={(e) => {
                dispatch(getDeviceDetails(e.target.value));
                setName(e.target.value);
                getSerial(e);
              }}
            >
              <option value="">Select Device Serial</option>
              {allDeviceSerial.map((devicetype) => (
                <option
                  key={devicetype.id}
                  id={devicetype.serial}
                  value={devicetype.id}
                >
                  {devicetype.serial}
                </option>
              ))}
            </select>
          </div>
        )}
        {loadingDeviceDetails ? (
          // <LoadingBox></LoadingBox>
          <p></p>
        ) : errorDeviceDetails ? (
          <MessageBox variant="danger">{errorDeviceDetails}</MessageBox>
        ) : (
          <>
            <div>
              <label>
                {serial === "" ? (
                  <span className="red">Please select device and serial</span>
                ) : (
                  <span className="green">Device Summary of {serial}</span>
                )}
              </label>
              <table className="table">
                <thead>
                  <tr>
                    <th>Brand</th>
                    <th>CPU</th>
                    <th>RAM</th>
                    <th>HDD</th>
                    <th>Display</th>
                  </tr>
                </thead>
                <tbody>
                  {oneDeviceDetails.map((devicedetails) => (
                    <tr key={devicedetails.id}>
                      <td>{devicedetails.brand}</td>
                      <td>
                        {devicedetails.deviceProperties.map(
                          (devicepro) => devicepro.cpu
                        )}
                        (
                        {devicedetails.deviceProperties.map(
                          (devicepro) => devicepro.cpuspeed
                        )}
                        GHz)
                      </td>
                      <td>
                        {devicedetails.deviceProperties.map(
                          (devicepro) => devicepro.ram
                        )}
                        GB
                      </td>
                      <td>
                        {devicedetails.deviceProperties.map(
                          (devicepro) => devicepro.hdd
                        )}
                        GB
                      </td>
                      <td>
                        {devicedetails.deviceProperties.map(
                          (devicepro) => devicepro.display
                        )}
                        "
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {userLoading ? (
          <LoadingBox></LoadingBox>
        ) : userError ? (
          <MessageBox variant="danger">{userError}</MessageBox>
        ) : (
          <div>
            <label htmlFor="source">Assign To</label>
            <select
              name="source"
              required
              onChange={(e) => setAssignUser(e.target.value)}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="date">Date</label>
          <DatePicker
            selected={assignDate}
            onChange={(date) => setAssignDate(date)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Assign Device
          </button>
        </div>
      </form>
    </div>
  );
}
