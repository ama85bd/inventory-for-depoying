import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteDeviceConsume,
  getAllDeviceAssignList,
  getDeviceSerial,
  listDeviceType,
  updateDevicePurchaseUnAssign,
} from "../actions/deviceActions";
import { getAllStationary } from "../actions/stationaryPurchaseActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  DEVICE_SERIAL_LIST_RESET,
  DEVICE_TYPE_LIST_RESET,
} from "../constants/deviceConstants";

export default function DeviceAssignScreen(props) {
  const deviceTypeList = useSelector((state) => state.deviceTypeList);
  const {
    loading: loadingDeviceType,
    error: errorDeviceType,
    allDeviceType,
  } = deviceTypeList;
  const deviceAssignList = useSelector((state) => state.deviceAssignList);
  const {
    loading: loadingDeviceAssignList,
    error: errorDeviceAssignList,
    getDeviceAssignList,
  } = deviceAssignList;
  const deviceConsumeDelete = useSelector((state) => state.deviceConsumeDelete);
  const {
    loading: loadingDeviceConsumeDelete,
    error: errorDeviceConsumeDelete,
    success: successDeviceConsumeDelete,
  } = deviceConsumeDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDeviceType());
    // dispatch({ type: DEVICE_SERIAL_LIST_RESET });
    // dispatch({ type: DEVICE_TYPE_LIST_RESET });
  }, [dispatch]);
  const deleteConsume = (con) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDeviceConsume(con.id));
      dispatch(updateDevicePurchaseUnAssign(con.devicePurchaseId));
    }
  };
  return (
    <div>
      <div className="row">
        <div>
          <h1>Device Assign List</h1>
        </div>
        {loadingDeviceType ? (
          <LoadingBox></LoadingBox>
        ) : errorDeviceType ? (
          <MessageBox variant="danger">{errorDeviceType}</MessageBox>
        ) : (
          <div>
            <label htmlFor="dname">Select Device Name </label>
            <select
              name="dname"
              required
              onChange={(e) => {
                // setDeviceTypeId(e.target.value);
                // dispatch(getDeviceSerial(e.target.value));
                dispatch(getAllDeviceAssignList(e.target.value));
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
        <Link to="/deviceassigntouser">
          <button className="primary"> Assign Device</button>
        </Link>
      </div>
      {loadingDeviceConsumeDelete && <LoadingBox></LoadingBox>}
      {errorDeviceConsumeDelete && (
        <MessageBox variant="danger">{errorDeviceConsumeDelete}</MessageBox>
      )}
      {successDeviceConsumeDelete && (
        <MessageBox variant="success">
          Device Unassigned Successfully
        </MessageBox>
      )}
      {loadingDeviceAssignList ? (
        // <LoadingBox></LoadingBox>
        <h2 className="red">Please select device name</h2>
      ) : errorDeviceAssignList ? (
        <MessageBox variant="danger">{errorDeviceAssignList}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Device Name</th>
                <th>Serial</th>
                <th>Brand</th>
                <th>CPU(GHz)</th>
                <th>RAM(GB)</th>
                <th>SSD(GB)</th>
                <th>HDD(GB)</th>
                <th>Display</th>
                <th>Assigned User</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getDeviceAssignList.map((assign) =>
                assign.devicePurchases.map((pur) =>
                  pur.deviceProperties.map((pro) =>
                    pur.deviceConsumes.map((con) => (
                      <tr key={pro.id}>
                        {/* <td>{assign.id}</td> */}
                        <td>{assign.name}</td>
                        <td>{pur.serial}</td>
                        <td>{pur.brand}</td>
                        <td>
                          {pro.cpu} ({pro.cpuspeed})
                        </td>
                        <td>{pro.ram}</td>
                        <td>{pro.ssd}</td>
                        <td>{pro.hdd}</td>
                        <td>{pro.display}"</td>
                        <td>{con.User.name}</td>
                        <td>
                          <button
                            type="button"
                            className="small"
                            // disabled={purchase.quantity > 0 ? "true" : ""}
                            onClick={() => {
                              deleteConsume(con);
                            }}
                          >
                            Unassign
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
