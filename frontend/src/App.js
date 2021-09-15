import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Redirect, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import UserScreen from "./screens/UserScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import AdminRoute from "./components/AdminRoute";
import SearchBox from "./components/SearchBox";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import StationaryTypeListScreen from "./screens/StationaryTypeScreen";
import CreateStationaryTypeScreen from "./screens/CreateStationaryTypeScreen";
import StationaryTypeEditScreen from "./screens/StationaryTypeEditScreen";
import SourceListScreen from "./screens/SourceScreen";
import CreateSourceScreen from "./screens/CreateSourceScreen";
import SourceEditScreen from "./screens/SourceEditScreen";
import StationaryPurchaseScreen from "./screens/StationaryPurchaseScreen";
import CreateStationaryPurchaseScreen from "./screens/CreateStationaryPurchaseScreen";
import StationaryPurchaseEditScreen from "./screens/StationaryPurchaseEditScreen";
import CreateStationaryConsumeScreen from "./screens/CreateStationaryConsumeScreen";
import StationaryConsumeScreen from "./screens/StationaryConsumeScreen";
import StationarySearchScreen from "./screens/StationarySearchScreen";
import StationaryConsumeSearchEditScreen from "./screens/StationaryConsumeSearchEditScreen";
import UserPasswordEditScreen from "./screens/UserPasswordEditScreen";
import DeviceTypeListScreen from "./screens/DeviceTypeScreen";
import CreateDeviceTypeScreen from "./screens/CreateDeviceTypeScreen";
import DeviceTypeEditScreen from "./screens/DeviceTypeEditScreen";
import DevicePurchaseScreen from "./screens/DevicePurchaseScreen";
import CreateDevicePurchaseScreen from "./screens/CreateDevicePurchaseScreen";
import DevicePurchaseEditScreen from "./screens/DevicePurchaseEditScreen";
import DevicePropertiesScreen from "./screens/DevicePropertiesScreen";
import CreateDevicePropertiesScreen from "./screens/CreateDevicePropertiesScreen";
import DevicePropertiesEditScreen from "./screens/DevicePropertiesEditScreen";
import DevicePropertiesViewScreen from "./screens/DevicePropertiesViewScreen";
import DeviceAssignScreen from "./screens/DeviceAssignScreen";
import DeviceAssignToUserScreen from "./screens/DeviceAssignToUserScreen";
import SearchScreen from "./screens/SearchScreen";
import {
  listDeviceBrand,
  listDeviceProAll,
  listDeviceType,
} from "./actions/deviceActions";
import SearchAllDeviceScreen from "./screens/SearchAllDeviceScreen";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import Collapsible from "react-collapsible";
import { BsChevronDown } from "react-icons/bs"; //react-icon
import DevicePropertiesAddScreen from "./screens/DevicePropertiesAddScreen";
import DevicePropertiesRemoveScreen from "./screens/DevicePropertiesRemoveScreen";
// import logo from "./public/logo.png";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [sideBarIsOpen, setSidebarIsOpen] = useState(false);

  const deviceProAll = useSelector((state) => state.deviceProAll);
  const {
    loading: loadingDeviceProAll,
    error: errorDeviceProAll,
    cpuPro,
    ramPro,
    graphicsPro,
    ssdPro,
    hddPro,
    displayPro,
    osPro,
  } = deviceProAll;
  const deviceBrand = useSelector((state) => state.deviceBrand);
  const {
    loading: loadingDeviceBrand,
    error: errorDeviceBrand,
    allDeviceBrand,
  } = deviceBrand;
  const deviceTypeList = useSelector((state) => state.deviceTypeList);
  const {
    loading: loadingDeviceType,
    error: errorDeviceType,
    allDeviceType,
  } = deviceTypeList;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(listDeviceType());
    dispatch(listDeviceBrand());
    dispatch(listDeviceProAll());
  }, [dispatch]);
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || "all";
    const filterCpu = filter.cpu || "all";
    const filterBrand = filter.brand || "all";
    const filterDevicetype = filter.devicetype || "all";
    const filterUsername = filter.username || "all";
    const filterRam = filter.ram || "all";
    const filterCpuspeed = filter.cpuspeed || "all";
    const filterGraphics = filter.graphics || "all";
    const filterHdd = filter.hdd || "all";
    const filterSsd = filter.ssd || "all";
    const filterOs = filter.os || "all";
    const filterDisplay = filter.display || "all";
    const filterAssign = filter.assign || "all";
    const filterMouse = filter.mouse || "all";
    return `/search/cpu/${filterCpu}/devicetype/${filterDevicetype}/brand/${filterBrand}/ram/${filterRam}/ssd/${filterSsd}/hdd/${filterHdd}/os/${filterOs}/graphics/${filterGraphics}/display/${filterDisplay}/assign/${filterAssign}/pageNumber/${filterPage}`;
    // return `/search/cpu/${filterCpu}/devicetype/${filterDevicetype}/brand/${filterBrand}/ram/${filterRam}/graphics/${filterGraphics}/hdd/${filterHdd}/ssd/${filterSsd}/os/${filterOs}/display/${filterDisplay}/pageNumber/${filterPage}`;
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row ">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/home">
              <img
                src="/logo.png"
                style={{
                  marginTop: "0.4rem",
                  width: "3rem",
                  marginBottom: "-0.4rem",
                }}
                alt="logo"
              />{" "}
              LGED Inventory(ICT Unit)
            </Link>
          </div>
          <div>
            {userInfo && userInfo.isAdmin ? (
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              ></Route>
            ) : (
              ""
            )}
          </div>
          <div>
            {userInfo && userInfo.isAdmin ? (
              <div>
                <div className="dropdown">
                  <Link to="#admin">
                    Stationary <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/stationarytype">Type</Link>
                    </li>
                    <li>
                      <Link to="/stationarypurchase">Purchase</Link>
                    </li>
                    <li>
                      <Link to="/stationarytotallist">Assign</Link>
                    </li>
                    <li>
                      <Link to="/stationarysearch">Search</Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <Link to="#admin">
                    Devices <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/devicetype">Type</Link>
                    </li>
                    <li>
                      <Link to="/devicepurchase">Purchase</Link>
                    </li>
                    <li>
                      <Link to="/deviceproperties">Properties</Link>
                    </li>

                    <li>
                      <Link to="/deviceassign">Assign</Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <Link to="#admin">
                    Admin({userInfo.name}) <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                    <li>
                      <Link to="/sourcelist">Source</Link>
                    </li>

                    <li>
                      <Link to="/signin" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/signin" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                {/* <Link to="/signin">User</Link> */}
                <Link to="/signin">Sign In</Link>{" "}
              </>
            )}
          </div>
        </header>
        {userInfo && userInfo.isAdmin ? (
          <aside className={sideBarIsOpen ? "open" : ""}>
            <ul className="categories">
              <li>
                <strong>Categories</strong>
                <button onClick={() => setSidebarIsOpen(false)} type="button">
                  <i className="fa fa-close"></i>
                </button>
              </li>
            </ul>
            <div>
              {loadingDeviceType ? (
                <LoadingBox></LoadingBox>
              ) : errorDeviceType ? (
                <MessageBox variant="danger">{errorDeviceType}</MessageBox>
              ) : (
                <Collapsible trigger={["Device Type", <BsChevronDown />]}>
                  <ul>
                    {allDeviceType.map((c) => (
                      <Link
                        to={getFilterUrl({ devicetype: c.name })}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <li
                          key={c.name}
                          style={{ display: c.name !== "0" ? "block" : "none" }}
                        >
                          {c.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
              )}
            </div>
            <div>
              {loadingDeviceBrand ? (
                <LoadingBox></LoadingBox>
              ) : errorDeviceBrand ? (
                <MessageBox variant="danger">{errorDeviceBrand}</MessageBox>
              ) : (
                <Collapsible trigger={["Device Brand", <BsChevronDown />]}>
                  <ul>
                    {allDeviceBrand.map((c) => (
                      <Link
                        to={getFilterUrl({ brand: c.brand })}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <li
                          key={c.brand}
                          style={{
                            display: c.brand !== "0" ? "block" : "none",
                          }}
                        >
                          {c.brand}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
              )}
            </div>
            {loadingDeviceProAll ? (
              <LoadingBox></LoadingBox>
            ) : errorDeviceProAll ? (
              <MessageBox variant="danger">{errorDeviceProAll}</MessageBox>
            ) : (
              <div>
                <Collapsible trigger={["CPU", <BsChevronDown />]}>
                  <ul>
                    {cpuPro.map((c) => (
                      <Link
                        to={getFilterUrl({ cpu: c.cpu })}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <li
                          key={c.cpu}
                          style={{ display: c.cpu !== "0" ? "block" : "none" }}
                        >
                          {c.cpu}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
                <Collapsible trigger={["ram", <BsChevronDown />]}>
                  <ul>
                    {ramPro.map((c) => (
                      <Link
                        to={getFilterUrl({ ram: c.ram })}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <li
                          key={c.ram}
                          style={{ display: c.ram !== 0 ? "block" : "none" }}
                        >
                          {c.ram} GB
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
                <Collapsible trigger={["ssd", <BsChevronDown />]}>
                  <ul>
                    {ssdPro.map((c) => (
                      <Link
                        to={getFilterUrl({ ssd: c.ssd })}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <li
                          key={c.ssd}
                          style={{ display: c.ssd !== 0 ? "block" : "none" }}
                        >
                          {c.ssd} GB
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
                <Collapsible trigger={["hdd", <BsChevronDown />]}>
                  <ul>
                    {hddPro.map((c) => (
                      <Link
                        to={getFilterUrl({ hdd: c.hdd })}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <li
                          key={c.hdd}
                          style={{ display: c.hdd !== 0 ? "block" : "none" }}
                        >
                          {c.hdd} GB
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
                <Collapsible trigger={["graphics", <BsChevronDown />]}>
                  <ul>
                    {graphicsPro.map((c) => (
                      <Link
                        to={getFilterUrl({ graphics: c.graphics })}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <li
                          key={c.graphics}
                          style={{
                            display: c.graphics !== 0 ? "block" : "none",
                          }}
                        >
                          {c.graphics} GB
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
                <Collapsible trigger={["display", <BsChevronDown />]}>
                  <ul>
                    {displayPro.map((c) => (
                      <Link
                        to={getFilterUrl({ display: c.display })}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <li
                          key={c.display}
                          style={{
                            display: c.display !== 0 ? "block" : "none",
                          }}
                        >
                          {c.display}"
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
                <Collapsible trigger={["os", <BsChevronDown />]}>
                  <ul>
                    {osPro.map((c) => (
                      <Link
                        to={getFilterUrl({ os: c.os })}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <li
                          key={c.os}
                          style={{ display: c.os !== "0" ? "block" : "none" }}
                        >
                          {c.os}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
              </div>
            )}
          </aside>
        ) : (
          ""
        )}

        <main>
          {/* <Route path="/user/:id" component={UserScreen}></Route> */}
          {/* <Route path="/" component={HomeScreen} exact></Route> */}
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route
            path="/search/cpu/:cpu?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/allsearchdevices/cpu/:cpu?"
            component={SearchAllDeviceScreen}
            exact
          ></Route>
          <Route
            // path="/search/cpu/:cpu/ram/:ram/graphics/:graphics/ssd/:ssd/hdd/:hdd/display/:display/os/:os/pageNumber/:pageNumber"
            path="/search/cpu/:cpu/devicetype/:devicetype/brand/:brand/ram/:ram/ssd/:ssd/hdd/:hdd/os/:os/graphics/:graphics/display/:display/assign/:assign/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <AdminRoute exact path="/">
            <Redirect to="/home" />
          </AdminRoute>
          <AdminRoute path="/home" component={HomeScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/deviceassigntouser"
            component={DeviceAssignToUserScreen}
          ></AdminRoute>
          <AdminRoute
            path="/deviceassign"
            component={DeviceAssignScreen}
          ></AdminRoute>
          <AdminRoute
            path="/createdeviceproperties"
            component={CreateDevicePropertiesScreen}
          ></AdminRoute>
          <AdminRoute
            path="/deviceproperties"
            component={DevicePropertiesScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/devicepropertiesadd/:id/add"
            component={DevicePropertiesAddScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/devicepropertiesremove/:id/remove"
            component={DevicePropertiesRemoveScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/devicepropertiesedit/:id/edit"
            component={DevicePropertiesEditScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/devicepropertiesview/:id/view"
            component={DevicePropertiesViewScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/deviceproperties/pageNumber/:pageNumber"
            component={DevicePropertiesScreen}
            exact
          ></AdminRoute>

          <AdminRoute
            path="/devicetype"
            component={DeviceTypeListScreen}
          ></AdminRoute>

          <AdminRoute
            path="/createdevicetype"
            component={CreateDeviceTypeScreen}
          ></AdminRoute>
          <AdminRoute
            path="/devicetypeedit/:id/edit"
            component={DeviceTypeEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/devicepurchase"
            component={DevicePurchaseScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/devicepurchase/pageNumber/:pageNumber"
            component={DevicePurchaseScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/createdevicepurchase"
            component={CreateDevicePurchaseScreen}
          ></AdminRoute>
          <AdminRoute
            path="/editdevicepurchase/:id/edit"
            component={DevicePurchaseEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/stationarysearchedit/:id/:staid/:uid/edit"
            component={StationaryConsumeSearchEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/stationarysearch"
            component={StationarySearchScreen}
          ></AdminRoute>

          <AdminRoute
            path="/stationarytotallist"
            component={StationaryConsumeScreen}
          ></AdminRoute>
          <AdminRoute
            path="/stationaryassign"
            component={CreateStationaryConsumeScreen}
          ></AdminRoute>
          <AdminRoute
            path="/stationarypurchase"
            component={StationaryPurchaseScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/stationarypurchase/pageNumber/:pageNumber"
            component={StationaryPurchaseScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/createpurchase"
            component={CreateStationaryPurchaseScreen}
          ></AdminRoute>
          <AdminRoute
            path="/editstationarypurchase/:id/edit"
            component={StationaryPurchaseEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/sourcelist"
            component={SourceListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/createsource"
            component={CreateSourceScreen}
          ></AdminRoute>
          <AdminRoute
            path="/createstationarytype"
            component={CreateStationaryTypeScreen}
          ></AdminRoute>
          <AdminRoute
            path="/stationarytype"
            component={StationaryTypeListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/createuser"
            component={CreateUserScreen}
          ></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/userpass/:id/edit"
            component={UserPasswordEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/stationarytypeedit/:id/edit"
            component={StationaryTypeEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/sourceedit/:id/edit"
            component={SourceEditScreen}
          ></AdminRoute>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
