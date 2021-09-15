import React, { useEffect, useState } from "react";
import Users from "../components/Users";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import StationaryAll from "../components/StationaryAll";
import { getAllStationary } from "../actions/stationaryPurchaseActions";
import { listDeviceHomeAll } from "../actions/deviceActions";
import Collapsible from "react-collapsible";
import { BsChevronDown } from "react-icons/bs"; //react-icon

export default function HomeScreen() {
  const dispatch = useDispatch();
  // const userList = useSelector((state) => state.userList);
  // const { loading, error, users } = userList;

  const allStationaryList = useSelector((state) => state.allStationaryList);
  const { loading, error, allStationary } = allStationaryList;

  const deviceHomeAll = useSelector((state) => state.deviceHomeAll);
  const {
    loading: loadingDeviceHomeAll,
    error: errorDeviceHomeAll,
    deviceType,
    deviceBrand,
    deviceCpu,
  } = deviceHomeAll;
  useEffect(() => {
    dispatch(listDeviceHomeAll());
    dispatch(getAllStationary());
  }, [dispatch]);
  return (
    <div className="row">
      <div className=".col-1"></div>
      <div className=".col-2">
        <div>
          <h1>Devices</h1>
          {loadingDeviceHomeAll ? (
            <LoadingBox></LoadingBox>
          ) : errorDeviceHomeAll ? (
            <MessageBox variant="danger">{errorDeviceHomeAll}</MessageBox>
          ) : (
            <div>
              <div class="row center">
                {deviceType.map((type) => (
                  <div key={type.id} className="card">
                    <div className="card-body">
                      <h2>{type.name}</h2>
                      <div className="row">
                        <div className="price">
                          <h5>{type.devices} pcs</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div class="row center">
                {deviceCpu.map((cpu) => (
                  <div
                    key={cpu.deviceTypeId}
                    className="card"
                    style={{ display: cpu.cpu !== "0" ? "block" : "none" }}
                  >
                    <div className="card-body">
                      <h2>
                        {cpu.cpu}
                        <br />
                        {cpu.deviceType.name}
                      </h2>
                      <div className="row">
                        <div className="price">
                          <h5>{cpu.devices} pcs</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div class="vertical"></div> */}
      <div className=".col-2">
        <div>
          <h1>Stationary</h1>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div class="row center">
              {/* {users.map((user) => (
            <Users key={user.id} user={user}></Users>
          ))} */}
              {allStationary.map((stationary) => (
                <StationaryAll
                  key={stationary.id}
                  stationary={stationary}
                ></StationaryAll>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=".col-1"></div>
    </div>
  );
}
