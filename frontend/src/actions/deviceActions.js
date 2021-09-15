import axios from "axios";
import {
  DEVICE_ONE_PURCHASE_DETAILS_FAIL,
  DEVICE_ONE_PURCHASE_DETAILS_REQUEST,
  DEVICE_ONE_PURCHASE_DETAILS_SUCCESS,
  DEVICE_PROPERTIES_CREATE_FAIL,
  DEVICE_PROPERTIES_CREATE_REQUEST,
  DEVICE_PROPERTIES_CREATE_SUCCESS,
  DEVICE_PROPERTIES_LIST_FAIL,
  DEVICE_PROPERTIES_LIST_REQUEST,
  DEVICE_PROPERTIES_LIST_SUCCESS,
  DEVICE_PURCHASE_CREATE_FAIL,
  DEVICE_PURCHASE_CREATE_REQUEST,
  DEVICE_PURCHASE_CREATE_SUCCESS,
  DEVICE_PURCHASE_DELETE_FAIL,
  DEVICE_PURCHASE_DELETE_REQUEST,
  DEVICE_PURCHASE_DELETE_SUCCESS,
  DEVICE_PURCHASE_LIST_FAIL,
  DEVICE_PURCHASE_LIST_REQUEST,
  DEVICE_PURCHASE_LIST_SUCCESS,
  DEVICE_PURCHASE_UPDATE_FAIL,
  DEVICE_PURCHASE_UPDATE_REQUEST,
  DEVICE_PURCHASE_UPDATE_SUCCESS,
  DEVICE_TYPE_CREATE_FAIL,
  DEVICE_TYPE_CREATE_REQUEST,
  DEVICE_TYPE_CREATE_SUCCESS,
  DEVICE_TYPE_DELETE_FAIL,
  DEVICE_TYPE_DELETE_REQUEST,
  DEVICE_TYPE_DELETE_SUCCESS,
  DEVICE_TYPE_DETAILS_FAIL,
  DEVICE_TYPE_DETAILS_REQUEST,
  DEVICE_TYPE_DETAILS_SUCCESS,
  DEVICE_TYPE_LIST_FAIL,
  DEVICE_TYPE_LIST_REQUEST,
  DEVICE_TYPE_LIST_SUCCESS,
  DEVICE_TYPE_UPDATE_FAIL,
  DEVICE_TYPE_UPDATE_REQUEST,
  DEVICE_TYPE_UPDATE_SUCCESS,
  DEVICE_SERIAL_LIST_REQUEST,
  DEVICE_SERIAL_LIST_SUCCESS,
  DEVICE_SERIAL_LIST_FAIL,
  DEVICE_PROPERTIES_DETAILS_REQUEST,
  DEVICE_PROPERTIES_DETAILS_SUCCESS,
  DEVICE_PROPERTIES_DETAILS_FAIL,
  DEVICE_PROPERTIES_UPDATE_REQUEST,
  DEVICE_PROPERTIES_UPDATE_SUCCESS,
  DEVICE_PROPERTIES_UPDATE_FAIL,
  DEVICE_PROPERTIES_DELETE_REQUEST,
  DEVICE_PROPERTIES_DELETE_SUCCESS,
  DEVICE_PROPERTIES_DELETE_FAIL,
  DEVICE_DETAILS_LIST_REQUEST,
  DEVICE_DETAILS_LIST_SUCCESS,
  DEVICE_DETAILS_LIST_FAIL,
  DEVICE_CONSUME_CREATE_REQUEST,
  DEVICE_CONSUME_CREATE_SUCCESS,
  DEVICE_CONSUME_CREATE_FAIL,
  DEVICE_PURCHASE_ASSIGN_UPDATE_REQUEST,
  DEVICE_PURCHASE_ASSIGN_UPDATE_SUCCESS,
  DEVICE_PURCHASE_ASSIGN_UPDATE_FAIL,
  DEVICE_ASSIGN_LIST_REQUEST,
  DEVICE_ASSIGN_LIST_SUCCESS,
  DEVICE_ASSIGN_LIST_FAIL,
  DEVICE_CONSUME_DELETE_REQUEST,
  DEVICE_CONSUME_DELETE_SUCCESS,
  DEVICE_CONSUME_DELETE_FAIL,
  DEVICE_SEARCH_REQUEST,
  DEVICE_SEARCH_SUCCESS,
  DEVICE_SEARCH_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
  DEVICE_PRO_ALL_LIST_REQUEST,
  DEVICE_PRO_ALL_LIST_SUCCESS,
  DEVICE_PRO_ALL_LIST_FAIL,
  DEVICE_HOME_ALL_LIST_REQUEST,
  DEVICE_HOME_ALL_LIST_SUCCESS,
  DEVICE_HOME_ALL_LIST_FAIL,
  DEVICE_PROPERTIES_ADD_REQUEST,
  DEVICE_PROPERTIES_ADD_SUCCESS,
  DEVICE_PROPERTIES_ADD_FAIL,
  DEVICE_PROPERTIES_REMOVE_REQUEST,
  DEVICE_PROPERTIES_REMOVE_SUCCESS,
  DEVICE_PROPERTIES_REMOVE_FAIL,
} from "../constants/deviceConstants";

const Axios = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const listDeviceType = () => async (dispatch, getState) => {
  dispatch({
    type: DEVICE_TYPE_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/device/devicetype", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: DEVICE_TYPE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_TYPE_LIST_FAIL, payload: message });
  }
};

export const createDeviceType = (name) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_TYPE_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/device/devicetypecreate",
      {
        name,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_TYPE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_TYPE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsDeviceType = (id) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_TYPE_DETAILS_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/device/devicetype/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: DEVICE_TYPE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_TYPE_DETAILS_FAIL, payload: message });
  }
};

export const updateDeviceType = (deviceType) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_TYPE_UPDATE_REQUEST, payload: deviceType });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/device/devicetype/${deviceType.id}`,
      deviceType,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_TYPE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_TYPE_UPDATE_FAIL, payload: message });
  }
};

export const deleteDeviceType = (deviceTypeId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: DEVICE_TYPE_DELETE_REQUEST, payload: deviceTypeId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(
      `/api/device/devicetype/${deviceTypeId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_TYPE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_TYPE_DELETE_FAIL, payload: message });
  }
};

export const listDevicePurchase = ({ pageNumber = "" }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: DEVICE_PURCHASE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/device?pageNumber=${pageNumber}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: DEVICE_PURCHASE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_PURCHASE_LIST_FAIL, payload: message });
  }
};

export const createDevicePurchase = (
  serial,
  brand,
  purchaseDate,
  warranty,
  EntryBy,
  deviceTypeId,
  SourceTypeId
) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_PURCHASE_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/device/devicepurchasecreate",
      {
        serial,
        brand,
        purchaseDate,
        warranty,
        EntryBy,
        deviceTypeId,
        SourceTypeId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_PURCHASE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_PURCHASE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsDevicePurchaseOne = (id) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_ONE_PURCHASE_DETAILS_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/device/pur/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: DEVICE_ONE_PURCHASE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_ONE_PURCHASE_DETAILS_FAIL, payload: message });
  }
};

export const updateDevicePurchase = (
  stPurchaseId,
  serial,
  brand,
  purchaseDate,
  warranty,
  EntryBy,
  deviceTypeId,
  SourceTypeId
) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_PURCHASE_UPDATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/device/${stPurchaseId}`,
      {
        serial,
        brand,
        purchaseDate,
        warranty,
        EntryBy,
        deviceTypeId,
        SourceTypeId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_PURCHASE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_PURCHASE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDevicePurchase = (purchaseId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: DEVICE_PURCHASE_DELETE_REQUEST, payload: purchaseId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/device/${purchaseId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DEVICE_PURCHASE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_PURCHASE_DELETE_FAIL, payload: message });
  }
};

export const listDeviceProperties = ({ pageNumber = "" }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: DEVICE_PROPERTIES_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/device/pro?pageNumber=${pageNumber}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: DEVICE_PROPERTIES_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_PROPERTIES_LIST_FAIL, payload: message });
  }
};

export const createDeviceProperties = (
  cpu,
  cpuspeed,
  ram,
  graphics,
  ssd,
  hdd,
  display,
  keyboard,
  mouse,
  os,
  EntryBy,
  devicePurchaseId,
  deviceTypeId
) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_PROPERTIES_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/device/deviceprocreate",
      {
        cpu,
        cpuspeed,
        ram,
        graphics,
        ssd,
        hdd,
        display,
        keyboard,
        mouse,
        os,
        EntryBy,
        devicePurchaseId,
        deviceTypeId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_PROPERTIES_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_PROPERTIES_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDeviceSerial = (id) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_SERIAL_LIST_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/device/serial/${id}`,
      // {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: DEVICE_SERIAL_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_SERIAL_LIST_FAIL, payload: message });
  }
};

export const getDeviceSerialWithoutAssign = (id) => async (
  dispatch,
  getState
) => {
  dispatch({ type: DEVICE_SERIAL_LIST_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/device/serialwithoutassign/${id}`,
      // {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: DEVICE_SERIAL_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_SERIAL_LIST_FAIL, payload: message });
  }
};

export const detailsDeviceProperties = (id) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_PROPERTIES_DETAILS_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/device/pro/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: DEVICE_PROPERTIES_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_PROPERTIES_DETAILS_FAIL, payload: message });
  }
};

export const updateDeviceProperties = (
  id,
  cpu,
  cpuspeed,
  ram,
  graphics,
  ssd,
  hdd,
  display,
  keyboard,
  mouse,
  os,
  EntryBy,
  devicePurchaseId
) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_PROPERTIES_UPDATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/device/pro/${id}`,
      {
        cpu,
        cpuspeed,
        ram,
        graphics,
        ssd,
        hdd,
        display,
        keyboard,
        mouse,
        os,
        EntryBy,
        devicePurchaseId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_PROPERTIES_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_PROPERTIES_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDeviceProperties = (id) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_PROPERTIES_DELETE_REQUEST, payload: id });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/device/pro/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DEVICE_PROPERTIES_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_PROPERTIES_DELETE_FAIL, payload: message });
  }
};

export const getDeviceDetails = (id) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_DETAILS_LIST_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/device/getdevicedetails/${id}`,
      // {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: DEVICE_DETAILS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_DETAILS_LIST_FAIL, payload: message });
  }
};

export const createDeviceConsume = (assigns) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_CONSUME_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/device/deviceconsumecreate",
      assigns,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_CONSUME_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_CONSUME_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDevicePurchaseAssign = (devicePurchaseId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: DEVICE_PURCHASE_ASSIGN_UPDATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/device/${devicePurchaseId}`,
      { assign: true },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_PURCHASE_ASSIGN_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_PURCHASE_ASSIGN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDevicePurchaseUnAssign = (devicePurchaseId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: DEVICE_PURCHASE_ASSIGN_UPDATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/device/${devicePurchaseId}`,
      { assign: false },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_PURCHASE_ASSIGN_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_PURCHASE_ASSIGN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllDeviceAssignList = (id) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_ASSIGN_LIST_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/device/getallassign/${id}`,
      // {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: DEVICE_ASSIGN_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_ASSIGN_LIST_FAIL, payload: message });
  }
};

export const deleteDeviceConsume = (id) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_CONSUME_DELETE_REQUEST, payload: id });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/device/deviceconsume/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DEVICE_CONSUME_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_CONSUME_DELETE_FAIL, payload: message });
  }
};

export const listDeviceSearch = ({
  pageNumber = "",
  cpu = "",
  devicetype = "",
  username = "",
  brand = "",
  graphics = "",
  ram = "",
  hdd = "",
  ssd = "",
  os = "",
  display = "",
  assign = "",
}) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_SEARCH_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/device/searchdevice?pageNumber=${pageNumber}&cpu=${cpu}&devicetype=${devicetype}&brand=${brand}&graphics=${graphics}&ram=${ram}&hdd=${hdd}&ssd=${ssd}&os=${os}&display=${display}&assign=${assign}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: DEVICE_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_SEARCH_FAIL, payload: message });
  }
};

export const listDeviceBrand = () => async (dispatch, getState) => {
  dispatch({
    type: BRAND_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/device/brand", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BRAND_LIST_FAIL, payload: message });
  }
};

export const listDeviceProAll = () => async (dispatch, getState) => {
  dispatch({
    type: DEVICE_PRO_ALL_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/device/allpro", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: DEVICE_PRO_ALL_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_PRO_ALL_LIST_FAIL, payload: message });
  }
};

export const listDeviceHomeAll = () => async (dispatch, getState) => {
  dispatch({
    type: DEVICE_HOME_ALL_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/device/sumdevices", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: DEVICE_HOME_ALL_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEVICE_HOME_ALL_LIST_FAIL, payload: message });
  }
};

export const addDeviceProperties = (
  id,
  nram,
  addram,
  ngraphics,
  addgraphics,
  nssd,
  addssd,
  nhdd,
  addhdd,
  adddisplay,
  addkeyboard,
  addmouse,
  addlan,
  EntryBy,
  devicePurchaseId
) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_PROPERTIES_ADD_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      `/api/device/proadd/${id}`,
      {
        nram,
        addram,
        ngraphics,
        addgraphics,
        nssd,
        addssd,
        nhdd,
        addhdd,
        adddisplay,
        addkeyboard,
        addmouse,
        addlan,
        EntryBy,
        devicePurchaseId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_PROPERTIES_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_PROPERTIES_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeDeviceProperties = (
  id,
  nram,
  removeram,
  ngraphics,
  removegraphics,
  nssd,
  removessd,
  nhdd,
  removehdd,
  removedisplay,
  removekeyboard,
  removemouse,
  removelan,
  EntryBy,
  devicePurchaseId
) => async (dispatch, getState) => {
  dispatch({ type: DEVICE_PROPERTIES_REMOVE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      `/api/device/proremove/${id}`,
      {
        nram,
        removeram,
        ngraphics,
        removegraphics,
        nssd,
        removessd,
        nhdd,
        removehdd,
        removedisplay,
        removekeyboard,
        removemouse,
        removelan,
        EntryBy,
        devicePurchaseId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DEVICE_PROPERTIES_REMOVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEVICE_PROPERTIES_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
