import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  deleteDeviceProperties,
  deleteDevicePurchase,
  listDeviceProperties,
  listDevicePurchase,
} from "../actions/deviceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  DEVICE_ONE_PURCHASE_DETAILS_RESET,
  DEVICE_PROPERTIES_DETAILS_RESET,
  DEVICE_PROPERTIES_LIST_RESET,
} from "../constants/deviceConstants";

export default function DevicePropertiesScreen(props) {
  const { pageNumber = 1 } = useParams();
  const devicePropertiesDelete = useSelector(
    (state) => state.devicePropertiesDelete
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = devicePropertiesDelete;
  const devicePropertiesList = useSelector(
    (state) => state.devicePropertiesList
  );
  const {
    loading: loadingPurchaseDetails,
    error: errorPurchaseDetailse,
    properties,
    page,
    pages,
  } = devicePropertiesList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDeviceProperties({ pageNumber }));
    dispatch({ type: DEVICE_PROPERTIES_DETAILS_RESET });
    // dispatch({ type: DEVICE_PROPERTIES_LIST_RESET });
  }, [dispatch, pageNumber, successDelete]);
  const deleteHandler = (properties) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDeviceProperties(properties.id));
    }
  };
  return (
    <div>
      <div className="row">
        <h1>Device Properties List</h1>
        <Link to="/createdeviceproperties">
          <button className="primary"> Create Properties</button>
        </Link>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">
          Device Properties Deleted Successfully
        </MessageBox>
      )}
      {loadingPurchaseDetails ? (
        <LoadingBox></LoadingBox>
      ) : errorPurchaseDetailse ? (
        <MessageBox variant="danger">{errorPurchaseDetailse}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Device Name</th>
                <th>Serial</th>
                <th>CPU</th>
                <th>RAM(GB)</th>
                <th>SSD(GB)</th>
                <th>HDD(GB)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((pro) => (
                <tr key={pro.id}>
                  <td>{pro.id}</td>
                  <td>{pro.devicePurchase.deviceType.name}</td>
                  <td>{pro.devicePurchase.serial}</td>
                  <td>{pro.cpu}</td>
                  <td>{pro.ram}</td>
                  <td>{pro.ssd}</td>
                  <td>{pro.hdd}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(
                          `/devicepropertiesview/${pro.id}/view`
                        )
                      }
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/devicepropertiesadd/${pro.id}/add`)
                      }
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(
                          `/devicepropertiesremove/${pro.id}/remove`
                        )
                      }
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(
                          `/devicepropertiesedit/${pro.id}/edit`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      // disabled={purchase.quantity > 0 ? "true" : ""}
                      onClick={() => deleteHandler(pro)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/deviceproperties/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
