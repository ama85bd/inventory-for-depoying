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
} from "../actions/stationaryPurchaseActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  STATIONARY_ASSIGN_RESET,
  STATIONARY_PURCHASE_CREATE_RESET,
} from "../constants/stationaryPurchaseConstants";
import { listUsers } from "../actions/userActions";

export default function CreateStationaryConsumeScreen(props) {
  const allStationaryList = useSelector((state) => state.allStationaryList);
  const { loading, error, allStationary } = allStationaryList;
  const userList = useSelector((state) => state.userList);
  const { loading: userLoading, error: userError, users } = userList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const EntryBy = userInfo.id;
  const assignStationary = useSelector((state) => state.assignStationary);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = assignStationary;
  const [StaTypeId, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [assignUserId, setAssignUser] = useState("");
  const [assignDate, setAssignDate] = useState(new Date());

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createStationaryAssign(
        quantity,
        assignDate,
        EntryBy,
        assignUserId,
        StaTypeId
      )
    );
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: STATIONARY_ASSIGN_RESET });
      props.history.push(`/stationarytotallist`);
    }

    dispatch(listUsers());
    dispatch(getAllStationary());
  }, [dispatch, successCreate, props.history]);

  const setAll = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    setName(optionElement.getAttribute("id"));
  };
  const checkQnt = () => {
    if (Number(quantity) > Number(totalQuantity)) {
      alert("Please Reduce Amount!");
    }
  };
  console.log(totalQuantity);
  console.log(quantity);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Assign Stationary</h1>
        </div>

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {successCreate && (
          <MessageBox variant="success">Assiged Successfully</MessageBox>
        )}

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <label htmlFor="name">Stationary Name</label>
            <select
              name="name"
              onChange={(e) => {
                setTotalQuantity(e.target.value);
                setAll(e);
              }}
            >
              <option id="" value="">
                Select Stationary Name
              </option>
              {allStationary.map((sttype) => (
                <option key={sttype.id} id={sttype.id} value={sttype.total}>
                  {sttype.name}
                </option>
              ))}
            </select>
          </div>
        )}
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
        <div>
          <label htmlFor="quantity">Assign Quantity</label>
          <input
            type="text"
            id="quantity"
            placeholder="Assign Quantity"
            required
            onkeypress={checkQnt()}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
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
          <button
            className="primary"
            type="submit"
            disabled={Number(quantity) > Number(totalQuantity) ? "true" : ""}
          >
            Assign Stationary
          </button>
        </div>
      </form>
    </div>
  );
}
