import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { listStationaryType } from "../actions/stationaryActions";
import {
  deleteStationaryAssign,
  searchStationaryAssignOne,
} from "../actions/stationaryPurchaseActions";
import { listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  SEARCH_STATIONARY_ASSIGN_EDIT_RESET,
  STATIONARY_TYPE_TOTAL_RESET,
} from "../constants/stationaryPurchaseConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

export default function StationarySearchScreen(props) {
  const staid = props.match.params.staid;
  const uid = props.match.params.uid;
  const searchStationaryAssign = useSelector(
    (state) => state.searchStationaryAssign
  );
  const {
    loading: loadingPurchaseDetails,
    error: errorPurchaseDetailse,
    allStationary,
  } = searchStationaryAssign;

  const userList = useSelector((state) => state.userList);
  const { loading: userLoading, error: userError, users } = userList;

  const stationaryTypeList = useSelector((state) => state.stationaryTypeList);
  const {
    loading: StaTypeLoading,
    error: StaTypeError,
    allStationaryType,
  } = stationaryTypeList;

  const stationaryAssignDelete = useSelector(
    (state) => state.stationaryAssignDelete
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = stationaryAssignDelete;

  const [assignUserId, setAssignUser] = useState("");
  const [assignUserName, setAssignUserName] = useState("");
  const [staName, setstaName] = useState("");
  const [StaTypeId, setName] = useState("");
  // const [purchaseDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchStationaryAssignOne(assignUserId, StaTypeId));
  };
  useEffect(() => {
    dispatch({ type: STATIONARY_TYPE_TOTAL_RESET });
    dispatch({ type: SEARCH_STATIONARY_ASSIGN_EDIT_RESET });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch(listUsers());
    dispatch(listStationaryType());
    // if (!allStationary) {
    //   dispatch(searchStationaryAssignOne(uid, staid));
    // }
    // dispatch(detailsStationaryPurchase());
  }, [allStationary, dispatch, staid, uid]);
  const deleteHandler = (purchase) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteStationaryAssign(purchase.id));
    }
  };
  const setUserNmae = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    setAssignUserName(optionElement.getAttribute("id"));
  };

  const setStaName = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    setstaName(optionElement.getAttribute("sttypeName"));
  };

  return (
    <div>
      <div className="row">
        <h1>Search stationary for an user</h1>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <table className="table">
            <tr>
              <td>
                {userLoading ? (
                  <LoadingBox></LoadingBox>
                ) : userError ? (
                  <MessageBox variant="danger">{userError}</MessageBox>
                ) : (
                  <select
                    name="source"
                    required
                    onChange={(e) => {
                      setAssignUser(e.target.value);
                      setUserNmae(e);
                    }}
                  >
                    <option value="">
                      &nbsp;&nbsp;&nbsp;&nbsp; Select User &nbsp;&nbsp;&nbsp;
                    </option>
                    {users.map((user) => (
                      <option key={user.id} id={user.name} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                {StaTypeLoading ? (
                  <LoadingBox></LoadingBox>
                ) : StaTypeError ? (
                  <MessageBox variant="danger">{StaTypeError}</MessageBox>
                ) : (
                  <select
                    name="name"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                      setStaName(e);
                    }}
                  >
                    <option value="">Select Stationary Name</option>
                    {allStationaryType.map((sttype) => (
                      <option
                        key={sttype.id}
                        sttypeName={sttype.name}
                        value={sttype.id}
                      >
                        {sttype.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              {/* <td>
              <DatePicker
                // selected={purchaseDate}
                placeholderText="Select Date"
                onChange={(date) => setStartDate(date)}
              />
            </td> */}
              <td>
                {/* <Link to="/stationarysearch"> */}
                <button type="submit" className="primary block">
                  Search
                </button>
                {/* </Link> */}
              </td>
            </tr>
          </table>
        </form>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Deleted Successfully</MessageBox>
      )}
      {loadingPurchaseDetails ? (
        // <LoadingBox>Lod</LoadingBox>
        <h1></h1>
      ) : errorPurchaseDetailse ? (
        <MessageBox variant="danger">{errorPurchaseDetailse}</MessageBox>
      ) : (
        <div>
          <h1>
            Search Result of User "{assignUserName}" and Stationary Name "
            {staName}"
          </h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Assign Quantity</th>
                <th>Assign Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allStationary.map((staAssign) => (
                <tr key={staAssign.id}>
                  <td>{staAssign.id}</td>
                  <td>{staAssign.consumeQuantity}</td>
                  <td>{staAssign.date}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(
                          `/stationarysearchedit/${staAssign.id}/${staAssign.StaTypeId}/${staAssign.issueTo}/edit`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(staAssign)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
