import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function UserScreen(props) {
  const dispatch = useDispatch();
  const userId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  useEffect(() => {
    dispatch(detailsUser(userId));
  }, [dispatch, userId]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to Home</Link>
          <div className="row top">
            <div className="col-2">
              <h2>{user.name}</h2>
            </div>
            <div className="col-1">
              <h2>{user.email}</h2>
            </div>
            <div className="col-1">
              <h2>{user.dept}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
