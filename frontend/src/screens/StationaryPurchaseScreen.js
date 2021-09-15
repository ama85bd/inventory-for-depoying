import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteStationaryType } from "../actions/stationaryActions";
import {
  deleteStationaryPurchase,
  detailsStationaryPurchase,
  listStationaryPurchase,
} from "../actions/stationaryPurchaseActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  STATIONARY_ONE_PURCHASE_DETAILS_RESET,
  STATIONARY_PURCHASE_DETAILS_RESET,
} from "../constants/stationaryPurchaseConstants";

export default function StationaryPurchaseScreen(props) {
  const { pageNumber = 1 } = useParams();
  const stationaryPurchaseDelete = useSelector(
    (state) => state.stationaryPurchaseDelete
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = stationaryPurchaseDelete;
  const stationaryPurchaseDetails = useSelector(
    (state) => state.stationaryPurchaseDetails
  );
  const {
    loading: loadingPurchaseDetails,
    error: errorPurchaseDetailse,
    purchase,
    page,
    pages,
  } = stationaryPurchaseDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: STATIONARY_ONE_PURCHASE_DETAILS_RESET });
    dispatch(detailsStationaryPurchase({ pageNumber }));
  }, [dispatch, pageNumber, successDelete]);
  const deleteHandler = (purchase) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteStationaryPurchase(purchase.id));
    }
  };
  return (
    <div>
      <div className="row">
        <h1>Stationary Purchase List</h1>
        <Link to="/createpurchase">
          <button className="primary"> Create Purchase</button>
        </Link>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
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
                <th>Stationary Name</th>
                <th>Quantity</th>
                <th>Source</th>
                <th>Purchase Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchase.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.id}</td>
                  <td>{purchase.StaType.name}</td>
                  <td>{purchase.quantity}</td>
                  <td>{purchase.SourceType.name}</td>
                  <td>{purchase.purchaseDate}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(
                          `/editstationarypurchase/${purchase.id}/edit`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      disabled={purchase.quantity > 0 ? "true" : ""}
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
                to={`/stationarypurchase/pageNumber/${x + 1}`}
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
