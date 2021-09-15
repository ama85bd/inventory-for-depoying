import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  deleteDevicePurchase,
  listDevicePurchase,
} from "../actions/deviceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { DEVICE_ONE_PURCHASE_DETAILS_RESET } from "../constants/deviceConstants";

export default function DevicePurchaseScreen(props) {
  const { pageNumber = 1 } = useParams();
  const devicePurchaseDelete = useSelector(
    (state) => state.devicePurchaseDelete
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = devicePurchaseDelete;
  const devicePurchaseList = useSelector((state) => state.devicePurchaseList);
  const {
    loading: loadingPurchaseDetails,
    error: errorPurchaseDetailse,
    purchase,
    page,
    pages,
  } = devicePurchaseList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: DEVICE_ONE_PURCHASE_DETAILS_RESET });
    dispatch(listDevicePurchase({ pageNumber }));
  }, [dispatch, pageNumber, successDelete]);
  const deleteHandler = (purchase) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDevicePurchase(purchase.id));
    }
  };
  return (
    <div>
      <div className="row">
        <h1>Device Purchase List</h1>
        <Link to="/createdevicepurchase">
          <button className="primary"> Create Purchase</button>
        </Link>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">
          Device Purchase Deleted Successfully
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
                <th>Brand</th>
                <th>Serial</th>
                <th>Source</th>
                <th>Purchase Date</th>
                <th>Warranty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchase.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.id}</td>
                  <td>{purchase.deviceType.name}</td>
                  <td>{purchase.brand}</td>
                  <td>{purchase.serial}</td>
                  <td>{purchase.SourceType.name}</td>
                  <td>{purchase.purchaseDate}</td>
                  <td>{purchase.warranty}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(
                          `/editdevicepurchase/${purchase.id}/edit`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      // disabled={purchase.quantity > 0 ? "true" : ""}
                      onClick={() => deleteHandler(purchase)}
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
                to={`/devicepurchase/pageNumber/${x + 1}`}
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
