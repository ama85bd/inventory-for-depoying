import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listSource } from "../actions/sourceActions";
import { listStationaryType } from "../actions/stationaryActions";
import {
  createStationaryAssign,
  createStationaryPurchase,
  getAllStationary,
  searchStationaryAssignEditOne,
  stationaryTypeTotalOne,
  updateStationaryAssign,
} from "../actions/stationaryPurchaseActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  SEARCH_STATIONARY_ASSIGN_RESET,
  STATIONARY_ASSIGN_RESET,
  STATIONARY_ASSIGN_UPDATE_RESET,
  STATIONARY_PURCHASE_CREATE_RESET,
} from "../constants/stationaryPurchaseConstants";
import { detailsUser, listUsers } from "../actions/userActions";
import { Link } from "react-router-dom";

export default function StationaryConsumeSearchEditScreen(props) {
  const staid = props.match.params.staid;
  const id = props.match.params.id;
  const uid = props.match.params.uid;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, error: userError, user } = userDetails;
  const stationaryTypeTotal = useSelector((state) => state.stationaryTypeTotal);
  const { loading, error, oneStaTotal } = stationaryTypeTotal;

  const searchStationaryAssignEdit = useSelector(
    (state) => state.searchStationaryAssignEdit
  );
  const {
    loading: loadingAssignQnt,
    error: errorAssignQnt,
    oneStaAssign,
  } = searchStationaryAssignEdit;

  const assignStationary = useSelector((state) => state.assignStationary);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = assignStationary;

  const stationaryAssignUpdate = useSelector(
    (state) => state.stationaryAssignUpdate
  );
  const {
    loading: loadingUpdae,
    error: errorUpdate,
    success: successUpdate,
  } = stationaryAssignUpdate;

  const [StaName, setName] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [uName, setUName] = useState("");
  const [consumeQuantity, setQuantity] = useState(0);
  // const [date, setDate] = useState();
  // const [issueBy, setIssueBy] = useState(0);
  // const [issueTo, setIssueTo] = useState(0);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateStationaryAssign({ id: id, consumeQuantity }));
  };

  useEffect(() => {
    // dispatch({ type: SEARCH_STATIONARY_ASSIGN_RESET });
    if (successUpdate) {
      dispatch({ type: STATIONARY_ASSIGN_UPDATE_RESET });
      window.location.href = "/stationarysearch";
      // props.history.push(`/stationarysearch`);
      // props.history.push(`/stationaryeditresultsearch/${uid}/${staid}`);
    }
    if (!oneStaTotal) {
      dispatch(stationaryTypeTotalOne(staid));
    } else {
      setName(oneStaTotal[0].name);
      setTotalQuantity(oneStaTotal[0].total);
    }
    if (!oneStaAssign) {
      dispatch(searchStationaryAssignEditOne(id));
    } else {
      setQuantity(oneStaAssign.consumeQuantity);
      // setDate(oneStaAssign.date);
      // setIssueBy(oneStaAssign.issueBy);
      // setIssueTo(oneStaAssign.issueTo);
    }

    if (!user) {
      dispatch(detailsUser(uid));
    } else {
      setUName(user.name);
    }
  }, [
    dispatch,
    props.history,
    oneStaTotal,
    id,
    staid,
    user,
    uid,
    oneStaAssign,
    successUpdate,
  ]);

  const checkQnt = () => {
    if (Number(consumeQuantity) > Number(totalQuantity)) {
      alert("Please Reduce Amount!");
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        {userLoading ? (
          <LoadingBox />
        ) : userError ? (
          <MessageBox variant="danger">{userError}</MessageBox>
        ) : (
          <>
            <div>
              <h1>Assigned Stationary to user - {uName}</h1>
            </div>
          </>
        )}

        {loadingUpdae && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="staname">Stationary Name</label>
              <input
                type="text"
                id="staname"
                placeholder="Stationary Name"
                value={StaName}
                disabled="true"
                // onChange={(e) => setTotalQuantity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="totalquantity">Total Quantity</label>
              <input
                type="text"
                id="totalquantity"
                placeholder="Total Quantity"
                value={totalQuantity}
                disabled="true"
                // onChange={(e) => setTotalQuantity(e.target.value)}
              />
            </div>
          </>
        )}
        {loadingAssignQnt ? (
          <LoadingBox />
        ) : errorAssignQnt ? (
          <MessageBox variant="danger">{errorAssignQnt}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="quantity">Assigned Quantity</label>
              <input
                type="text"
                id="quantity"
                placeholder="Assign Quantity"
                value={consumeQuantity}
                required
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                onkeypress={totalQuantity ? checkQnt() : ""}
              />
            </div>

            <div>
              <label />
              <button
                className="primary"
                type="submit"
                disabled={
                  Number(consumeQuantity) > Number(totalQuantity) ? "true" : ""
                }
              >
                Update Assigned Stationary
              </button>
              ;
            </div>
          </>
        )}
      </form>
    </div>
  );
}
