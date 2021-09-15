import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listDeviceSearch } from "../actions/deviceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ReactPaginate from "react-paginate";
import Collapsible from "react-collapsible";
import { BsChevronDown } from "react-icons/bs"; //react-icon
import { DEVICE_PROPERTIES_DETAILS_RESET } from "../constants/deviceConstants";

export default function SearchScreen(props) {
  const {
    pageNumber = 1,
    cpu = "all",
    brand = "all",
    username = "all",
    devicetype = "all",
    cpuspeed = 0,
    graphics = "all",
    ram = "all",
    hdd = "all",
    ssd = "all",
    os = "all",
    display = "all",
    keyboard = "",
    mouse = "",
    assign = "all",
  } = useParams();
  const deviceSearch = useSelector((state) => state.deviceSearch);
  const { loading, error, devices, length, page, pages } = deviceSearch;
  const deviceTypeList = useSelector((state) => state.deviceTypeList);
  const {
    loading: loadingDeviceType,
    error: errorDeviceType,
    allDeviceType,
  } = deviceTypeList;
  const deviceBrand = useSelector((state) => state.deviceBrand);
  const {
    loading: loadingDeviceBrand,
    error: errorDeviceBrand,
    allDeviceBrand,
  } = deviceBrand;
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: DEVICE_PROPERTIES_DETAILS_RESET });
    dispatch(
      listDeviceSearch({
        pageNumber,
        cpu: cpu !== "all" ? cpu : "",
        ram: ram !== "all" ? ram : "",
        brand: brand !== "all" ? brand : "",
        devicetype: devicetype !== "all" ? devicetype : "",
        graphics: graphics !== "all" ? graphics : "",
        hdd: hdd !== "all" ? hdd : "",
        ssd: ssd !== "all" ? ssd : "",
        os: os !== "all" ? os : "",
        display: display !== "all" ? display : "",
        assign: assign !== "all" ? assign : "",
      })
    );
  }, [
    dispatch,
    cpu,
    pageNumber,
    ram,
    hdd,
    ssd,
    os,
    display,
    graphics,
    brand,
    devicetype,
    assign,
  ]);
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCpu = filter.cpu || cpu;
    const filterBrand = filter.brand || brand;
    const filterDevicetype = filter.devicetype || devicetype;
    const filterUsername = filter.username || username;
    const filterRam = filter.ram || ram;
    const filterCpuspeed = filter.cpuspeed || cpuspeed;
    const filterGraphics = filter.graphics || graphics;
    const filterHdd = filter.hdd || hdd;
    const filterSsd = filter.ssd || ssd;
    const filterOs = filter.os || os;
    const filterDisplay = filter.display || display;
    const filterAssign = filter.assign || assign;
    const filterMouse = filter.mouse || mouse;
    return `/search/cpu/${filterCpu}/devicetype/${filterDevicetype}/brand/${filterBrand}/ram/${filterRam}/ssd/${filterSsd}/hdd/${filterHdd}/os/${filterOs}/graphics/${filterGraphics}/display/${filterDisplay}/assign/${filterAssign}/pageNumber/${filterPage}`;
    // return `/search/cpu/${filterCpu}/devicetype/${filterDevicetype}/brand/${filterBrand}/ram/${filterRam}/graphics/${filterGraphics}/hdd/${filterHdd}/ssd/${filterSsd}/os/${filterOs}/display/${filterDisplay}/pageNumber/${filterPage}`;
  };
  const [pageNum, setPageNum] = useState(0);
  const perPage = 6;
  const pagesVisited = pageNum * perPage;
  const pageCount = Math.ceil(length / perPage);

  const changePage = ({ selected }) => {
    setPageNum(selected);
  };
  return (
    <div>
      <div className="row top ">
        <div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div
              style={{
                color: "#FF4500",
                fontWeight: "bold",
                padding: "0.5rem",
                fontSize: "2rem",
              }}
            >
              {devices.length} Result
            </div>
          )}
        </div>
        <div>
          Sort by{" "}
          <select
            value={assign}
            onChange={(e) => {
              props.history.push(getFilterUrl({ assign: e.target.value }));
            }}
          >
            <option value="">Select One</option>
            <option value="1">Assigned</option>
            <option value="0">Not Assigned</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1 margin-right-0-5">
          {/* <h3>Device Type</h3> */}
          {/* <h4></h4> */}
          <div>
            {loadingDeviceType ? (
              <LoadingBox></LoadingBox>
            ) : errorDeviceType ? (
              <MessageBox variant="danger">{errorDeviceType}</MessageBox>
            ) : (
              <Collapsible trigger={["Device Type", <BsChevronDown />]}>
                <ul>
                  <Link
                    className={"all" === devicetype ? "active" : ""}
                    to={getFilterUrl({ devicetype: "all" })}
                  >
                    <li>Any</li>
                  </Link>

                  {allDeviceType.map((c) => (
                    <Link
                      className={c.name === devicetype ? "active" : ""}
                      to={getFilterUrl({ devicetype: c.name })}
                    >
                      <li key={c.name}>{c.name}</li>
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
                  <Link
                    className={"all" === brand ? "active" : ""}
                    to={getFilterUrl({ brand: "all" })}
                  >
                    <li>Any</li>
                  </Link>

                  {allDeviceBrand.map((c) => (
                    <Link
                      className={c.brand === brand ? "active" : ""}
                      to={getFilterUrl({ brand: c.brand })}
                    >
                      <li key={c.brand}>{c.brand}</li>
                    </Link>
                  ))}
                </ul>
              </Collapsible>
            )}
          </div>
          <div>
            {loadingDeviceProAll ? (
              <LoadingBox></LoadingBox>
            ) : errorDeviceProAll ? (
              <MessageBox variant="danger">{errorDeviceProAll}</MessageBox>
            ) : (
              <div>
                <Collapsible trigger={["CPU", <BsChevronDown />]}>
                  <ul>
                    <Link
                      className={"all" === cpu ? "active" : ""}
                      to={getFilterUrl({ cpu: "all" })}
                    >
                      <li>Any</li>
                    </Link>

                    {cpuPro.map((c) => (
                      <Link
                        className={c.cpu === cpu ? "active" : ""}
                        to={getFilterUrl({ cpu: c.cpu })}
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
                <Collapsible trigger={["RAM", <BsChevronDown />]}>
                  <ul>
                    <Link
                      className={"all" === ram ? "active" : ""}
                      to={getFilterUrl({ ram: "all" })}
                    >
                      <li>Any</li>
                    </Link>

                    {ramPro.map((c) => (
                      <Link
                        className={`${c.ram}` === `${ram}` ? "active" : ""}
                        to={getFilterUrl({ ram: c.ram })}
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
                    <Link
                      className={"all" === ssd ? "active" : ""}
                      to={getFilterUrl({ ssd: "all" })}
                    >
                      <li>Any</li>
                    </Link>

                    {ssdPro.map((c) => (
                      <Link
                        className={`${c.ssd}` === `${ssd}` ? "active" : ""}
                        to={getFilterUrl({ ssd: c.ssd })}
                      >
                        <li
                          key={c.ssd}
                          style={{ display: c.ssd !== 0 ? "block" : "none" }}
                        >
                          {c.ssd + c.addssd - c.removessd} GB
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
                <Collapsible trigger={["hdd", <BsChevronDown />]}>
                  <ul>
                    <Link
                      className={"all" === hdd ? "active" : ""}
                      to={getFilterUrl({ hdd: "all" })}
                    >
                      <li>Any</li>
                    </Link>

                    {hddPro.map((c) => (
                      <Link
                        className={`${c.hdd}` === `${hdd}` ? "active" : ""}
                        to={getFilterUrl({ hdd: c.hdd })}
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
                    <Link
                      className={"all" === graphics ? "active" : ""}
                      to={getFilterUrl({ graphics: "all" })}
                    >
                      <li>Any</li>
                    </Link>

                    {graphicsPro.map((c) => (
                      <Link
                        className={
                          `${c.graphics}` === `${graphics}` ? "active" : ""
                        }
                        to={getFilterUrl({ graphics: c.graphics })}
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
                    <Link
                      className={"all" === display ? "active" : ""}
                      to={getFilterUrl({ display: "all" })}
                    >
                      <li>Any</li>
                    </Link>

                    {displayPro.map((c) => (
                      <Link
                        className={
                          `${c.display}` === `${display}` ? "active" : ""
                        }
                        to={getFilterUrl({ display: c.display })}
                      >
                        <li
                          key={c.display}
                          style={{
                            display: c.display !== 0 ? "block" : "none",
                          }}
                        >
                          {c.display}""
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Collapsible>
                <Collapsible trigger={["os", <BsChevronDown />]}>
                  <ul>
                    <Link
                      className={"all" === os ? "active" : ""}
                      to={getFilterUrl({ os: "all" })}
                    >
                      <li>Any</li>
                    </Link>

                    {osPro.map((c) => (
                      <Link
                        className={c.os === os ? "active" : ""}
                        to={getFilterUrl({ os: c.os })}
                      >
                        <li
                          key={c.graphics}
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
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>ID</th>
                    <th>Device Name</th>
                    <th>Serial</th>
                    <th>Brand</th>
                    <th>CPU(GHz)</th>
                    <th>RAM(GB)</th>
                    <th>SSD(GB)</th>
                    <th>HDD(GB)</th>
                    <th>Graphics(GB)</th>
                    <th>Display</th>
                    <th>OS</th>
                    <th>Assigned User</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {devices
                    .slice(pagesVisited, pagesVisited + perPage)
                    .map((device) => (
                      <tr key={device.id}>
                        <td>{device.devicePurchase.id}</td>
                        <td>{device.devicePurchase.deviceType.name}</td>
                        <td>{device.devicePurchase.serial}</td>
                        <td>{device.devicePurchase.brand}</td>
                        <td>
                          {device.cpu} ({device.cpuspeed})
                        </td>
                        <td>{device.ram}</td>
                        <td>{device.ssd}</td>
                        <td>{device.hdd}</td>
                        <td>{device.graphics}</td>
                        <td>{device.display}"</td>
                        <td>{device.os}</td>
                        <td>
                          {device.devicePurchase.deviceConsumes.length !== 0
                            ? device.devicePurchase.deviceConsumes.map(
                                (con) => con.User.name
                              )
                            : "Not Assigned**"}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="small"
                            onClick={() =>
                              props.history.push(
                                `/devicepropertiesview/${device.id}/view`
                              )
                            }
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              /> */}
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? "active" : ""}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
