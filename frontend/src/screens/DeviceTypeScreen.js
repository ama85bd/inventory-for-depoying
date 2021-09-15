import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDeviceType, listDeviceType } from "../actions/deviceActions";
import {
  deleteStationaryType,
  listStationaryType,
} from "../actions/stationaryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { DEVICE_TYPE_DETAILS_RESET } from "../constants/deviceConstants";
import { STATIONAR_TYPE_DETAILS_RESET } from "../constants/stationaryConstants";

export default function DeviceTypeListScreen(props) {
  const deviceTypeList = useSelector((state) => state.deviceTypeList);
  const { loading, error, allDeviceType } = deviceTypeList;
  const deviceTypeDelete = useSelector((state) => state.deviceTypeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deviceTypeDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDeviceType());
    dispatch({ type: DEVICE_TYPE_DETAILS_RESET });
  }, [dispatch, successDelete]);
  const deleteHandler = (deviceType) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDeviceType(deviceType.id));
    }
  };
  return (
    <div>
      <div className="row">
        <h1>Device Type</h1>
        <Link to="/createdevicetype">
          <button className="primary"> Create Device Type</button>
        </Link>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">
          Device Type Deleted Successfully
        </MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allDeviceType.map((deviceType) => (
              <tr key={deviceType.id}>
                <td>{deviceType.id}</td>
                <td>{deviceType.name}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(
                        `/devicetypeedit/${deviceType.id}/edit`
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(deviceType)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
