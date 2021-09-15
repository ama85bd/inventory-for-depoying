import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listSource } from "../actions/sourceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  DEVICE_PROPERTIES_CREATE_RESET,
  DEVICE_PURCHASE_CREATE_RESET,
} from "../constants/deviceConstants";
import {
  listDeviceType,
  createDevicePurchase,
  createDeviceProperties,
  listDevicePurchase,
  getDeviceSerial,
  detailsDeviceProperties,
} from "../actions/deviceActions";
import { useParams } from "react-router";

export default function DevicePropertiesViewScreen(props) {
  const id = props.match.params.id;
  const [deviceName, setDeviceName] = useState("");
  const [brand, setBrand] = useState("");
  const [warranty, setWarranty] = useState(null);
  const [serial, setDeviceSerial] = useState("");
  const [devicePurchaseId, setName] = useState("");
  const [cpu, setCpu] = useState("");
  const [cpuspeed, setCpuspeed] = useState("");
  const [ram, setRam] = useState("");
  const [addram, setAddRam] = useState("");
  const [removeram, setRemoveRam] = useState("");
  const [graphics, setGraphics] = useState("");
  const [addgraphics, setAddGraphics] = useState("");
  const [removegraphics, setRemoveGraphics] = useState("");
  const [ssd, setSsd] = useState("");
  const [addssd, setAddSsd] = useState("");
  const [removessd, setRemoveSsd] = useState("");
  const [hdd, setHdd] = useState("");
  const [addhdd, setAddHdd] = useState("");
  const [removehdd, setRemoveHdd] = useState("");
  const [display, setDisplay] = useState("");
  const [adddisplay, setAddDisplay] = useState("");
  const [removedisplay, setRemoveDisplay] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [addkeyboard, setAddKeyboard] = useState("");
  const [removekeyboard, setRemoveKeyboard] = useState("");
  const [mouse, setMouse] = useState("");
  const [addmouse, setAddMouse] = useState("");
  const [removemouse, setRemoveMouse] = useState("");
  const [os, setOs] = useState("");
  const [addlan, setAddLan] = useState("");
  const [removelan, setRemoveLan] = useState("");
  const devicePropertiesDetails = useSelector(
    (state) => state.devicePropertiesDetails
  );
  const { loading, error, onePropertiesDetails } = devicePropertiesDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const EntryBy = userInfo.id;

  // var msDiff = new Date(warranty).getTime() - new Date().getTime(); //Future date - current date
  // var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  // console.log("diff", daysTill30June2035);

  const today = new Date();
  const future = new Date(warranty); // remember this is equivalent to 06 01 2010
  //dates in js are counted from 0, so 05 is june

  function dateDiff(start, end) {
    let years = 0,
      months = 0,
      days = 0;
    // Day diffence. Trick is to use setDate(0) to get the amount of days
    // from the previous month if the end day less than the start day.
    if (end.getDate() < start.getDate()) {
      months = -1;
      let datePtr = new Date(end);
      datePtr.setDate(0);
      days = end.getDate() + (datePtr.getDate() - start.getDate());
    } else {
      days = end.getDate() - start.getDate();
    }

    if (
      end.getMonth() < start.getMonth() ||
      (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())
    ) {
      years = -1;
      months += end.getMonth() + (12 - start.getMonth());
    } else {
      months += end.getMonth() - start.getMonth();
    }

    years += end.getFullYear() - start.getFullYear();
    console.log(`${years}y ${months}m ${days}d`);
    return [years, months, days];
  }
  const all = dateDiff(today, future);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!onePropertiesDetails) {
      dispatch(detailsDeviceProperties(id));
    } else {
      setDeviceName(onePropertiesDetails.devicePurchase.deviceType.name);
      setDeviceSerial(onePropertiesDetails.devicePurchase.serial);
      setBrand(onePropertiesDetails.devicePurchase.brand);
      setWarranty(
        new Date(
          onePropertiesDetails.devicePurchase.warranty
        ).toLocaleDateString()
      );
      setName(onePropertiesDetails.devicePurchase.id);
      setCpu(onePropertiesDetails.cpu);
      setCpuspeed(onePropertiesDetails.cpuspeed);
      setRam(onePropertiesDetails.ram);
      setAddRam(onePropertiesDetails.addram);
      setRemoveRam(onePropertiesDetails.removeram);
      setGraphics(onePropertiesDetails.graphics);
      setAddGraphics(onePropertiesDetails.addgraphics);
      setRemoveGraphics(onePropertiesDetails.removegraphics);
      setSsd(onePropertiesDetails.ssd);
      setAddSsd(onePropertiesDetails.addssd);
      setRemoveSsd(onePropertiesDetails.removessd);
      setHdd(onePropertiesDetails.hdd);
      setAddHdd(onePropertiesDetails.addhdd);
      setRemoveHdd(onePropertiesDetails.removehdd);
      setAddDisplay(onePropertiesDetails.adddisplay);
      setRemoveDisplay(onePropertiesDetails.removedisplay);
      setDisplay(onePropertiesDetails.display);
      setKeyboard(onePropertiesDetails.keyboard);
      setAddKeyboard(onePropertiesDetails.addkeyboard);
      setRemoveKeyboard(onePropertiesDetails.removekeyboard);
      setMouse(onePropertiesDetails.mouse);
      setAddMouse(onePropertiesDetails.addmouse);
      setRemoveMouse(onePropertiesDetails.removemouse);
      setOs(onePropertiesDetails.os);
    }
  }, [dispatch, props.history, id, onePropertiesDetails]);
  console.log(all);
  return (
    <div>
      <div>
        {/* <button
          type="button"
          className="primary small"
          onClick={() => props.history.push(`/deviceproperties`)}
        >
          Back to Properties
        </button> */}
      </div>
      <div>
        <h1>Details Properties of {deviceName}</h1>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="tab-content  top">
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Device Name</div>
                <div className="attribute-description col-2"> {deviceName}</div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Device Serial </div>
                <div className="attribute-description col-2">{serial}</div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Device Brand </div>
                <div className="attribute-description col-2">{brand}</div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Device Warranty </div>
                <div className="attribute-description col-2">
                  {warranty} ({all[0]}Years,
                  {all[1]}Months,
                  {all[2]}Days left from today)
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1"> CPU </div>
                <div className="attribute-description col-2">
                  {cpu === "0" ? "N/A" : cpu} {cpuspeed === 0 ? "" : cpuspeed}
                  {cpuspeed === 0 ? "" : "GHz"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1"> RAM </div>
                <div className="attribute-description col-2">
                  {ram === 0 ? "N/A" : ram} {ram === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">ADD RAM </div>
                <div className="attribute-description col-2">
                  {addram === 0 ? "N/A" : addram} {addram === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Remove RAM </div>
                <div className="attribute-description col-2">
                  {removeram === 0 ? "N/A" : removeram}{" "}
                  {removeram === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Graphics </div>
                <div className="attribute-description col-2">
                  {graphics === 0 ? "N/A" : graphics}{" "}
                  {graphics === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Add Graphics </div>
                <div className="attribute-description col-2">
                  {addgraphics === 0 ? "N/A" : addgraphics}{" "}
                  {addgraphics === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Remove Graphics </div>
                <div className="attribute-description col-2">
                  {removegraphics === 0 ? "N/A" : removegraphics}{" "}
                  {removegraphics === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">SSD </div>
                <div className="attribute-description col-2">
                  {" "}
                  {ssd === 0 ? "N/A" : ssd}
                  {ssd === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Add SSD </div>
                <div className="attribute-description col-2">
                  {" "}
                  {addssd === 0 ? "N/A" : addssd}
                  {addssd === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Remove SSD </div>
                <div className="attribute-description col-2">
                  {" "}
                  {removessd === 0 ? "N/A" : removessd}
                  {removessd === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">HDD </div>
                <div className="attribute-description col-2">
                  {hdd === 0 ? "N/A" : hdd}
                  {hdd === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Add HDD </div>
                <div className="attribute-description col-2">
                  {addhdd === 0 ? "N/A" : addhdd}
                  {addhdd === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Remove HDD </div>
                <div className="attribute-description col-2">
                  {removehdd === 0 ? "N/A" : removehdd}
                  {removehdd === 0 ? "" : "GB"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Display </div>
                <div className="attribute-description col-2">
                  {display === 0 ? "N/A" : display}
                  {display === 0 ? "" : "inch"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Add Display </div>
                <div className="attribute-description col-2">
                  {adddisplay === 0 ? "N/A" : adddisplay}
                  {adddisplay === 0 ? "" : "inch"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Remove Display </div>
                <div className="attribute-description col-2">
                  {removedisplay === 0 ? "N/A" : removedisplay}
                  {removedisplay === 0 ? "" : "inch"}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Keyboard </div>
                <div className="attribute-description col-2">
                  {keyboard === "0" ? "N/A" : keyboard}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Add Keyboard </div>
                <div className="attribute-description col-2">
                  {addkeyboard === "0" ? "N/A" : addkeyboard}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Remove Keyboard </div>
                <div className="attribute-description col-2">
                  {removekeyboard === "0" ? "N/A" : removekeyboard}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Mouse </div>
                <div className="attribute-description col-2">
                  {mouse === "0" ? "N/A" : mouse}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Add Mouse </div>
                <div className="attribute-description col-2">
                  {addmouse === "0" ? "N/A" : addmouse}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Remove Mouse </div>
                <div className="attribute-description col-2">
                  {removemouse === "0" ? "N/A" : removemouse}
                </div>
              </div>
            </div>
            <div className="specs-item-wrapper">
              <div className="rownext row">
                <div className="attribute-heading col-1">Operating System </div>
                <div className="attribute-description col-2">
                  {os === "0" ? "N/A" : os}
                </div>
              </div>
            </div>
          </div>

          {/* <table className="table">
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Brand</th>
                <th>Serial</th>
                <th>CPU</th>
                <th>RAM(GB)</th>
                <th>SSD(GB)</th>
                <th>HDD(GB)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              
                <tr key={id}>
                  <td>{deviceName}</td>
                  <td>{pro.devicePurchase.deviceType.name}</td>
                  <td>{pro.devicePurchase.serial}</td>
                  <td>{pro.cpu}</td>
                  <td>{pro.ram}</td>
                  <td>{pro.ssd}</td>
                  <td>{pro.hdd}</td>
                  
                </tr>
              
            </tbody>
          </table> */}
        </>
      )}
    </div>
  );
}
