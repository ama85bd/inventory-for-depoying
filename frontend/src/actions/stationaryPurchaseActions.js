import axios from "axios";
import {
  GET_ALL_STATIONARY_FAIL,
  GET_ALL_STATIONARY_REQUEST,
  GET_ALL_STATIONARY_SUCCESS,
  STATIONARY_ONE_PURCHASE_DETAILS_FAIL,
  STATIONARY_ONE_PURCHASE_DETAILS_REQUEST,
  STATIONARY_ONE_PURCHASE_DETAILS_SUCCESS,
  STATIONARY_PURCHASE_CREATE_FAIL,
  STATIONARY_PURCHASE_CREATE_REQUEST,
  STATIONARY_PURCHASE_CREATE_SUCCESS,
  STATIONARY_PURCHASE_DELETE_FAIL,
  STATIONARY_PURCHASE_DELETE_REQUEST,
  STATIONARY_PURCHASE_DELETE_SUCCESS,
  STATIONARY_PURCHASE_DETAILS_FAIL,
  STATIONARY_PURCHASE_DETAILS_REQUEST,
  STATIONARY_PURCHASE_DETAILS_SUCCESS,
  STATIONARY_PURCHASE_LIST_FAIL,
  STATIONARY_PURCHASE_LIST_REQUEST,
  STATIONARY_PURCHASE_LIST_SUCCESS,
  STATIONARY_PURCHASE_UPDATE_FAIL,
  STATIONARY_PURCHASE_UPDATE_REQUEST,
  STATIONARY_PURCHASE_UPDATE_SUCCESS,
  GET_ONE_ALL_STATIONARY_REQUEST,
  GET_ONE_ALL_STATIONARY_SUCCESS,
  GET_ONE_ALL_STATIONARY_FAIL,
  STATIONARY_ASSIGN_REQUEST,
  STATIONARY_ASSIGN_SUCCESS,
  STATIONARY_ASSIGN_FAIL,
  SEARCH_STATIONARY_ASSIGN_REQUEST,
  SEARCH_STATIONARY_ASSIGN_SUCCESS,
  SEARCH_STATIONARY_ASSIGN_FAIL,
  SEARCH_STATIONARY_ASSIGN_EDIT_REQUEST,
  SEARCH_STATIONARY_ASSIGN_EDIT_SUCCESS,
  SEARCH_STATIONARY_ASSIGN_EDIT_FAIL,
  STATIONARY_TYPE_TOTAL_REQUEST,
  STATIONARY_TYPE_TOTAL_SUCCESS,
  STATIONARY_TYPE_TOTAL_FAIL,
  STATIONARY_ASSIGN_UPDATE_REQUEST,
  STATIONARY_ASSIGN_UPDATE_SUCCESS,
  STATIONARY_ASSIGN_UPDATE_FAIL,
  STATIONARY_ASSIGN_DELETE_REQUEST,
  STATIONARY_ASSIGN_DELETE_SUCCESS,
  STATIONARY_ASSIGN_DELETE_FAIL,
} from "../constants/stationaryPurchaseConstants";
const Axios = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export const listStationaryPurchase = () => async (dispatch, getState) => {
  dispatch({
    type: STATIONARY_PURCHASE_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/purchase", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: STATIONARY_PURCHASE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONARY_PURCHASE_LIST_FAIL, payload: message });
  }
};

export const createStationaryPurchase = (
  quantity,
  purchaseDate,
  EntryBy,
  StaTypeId,
  SourceTypeId
) => async (dispatch, getState) => {
  dispatch({ type: STATIONARY_PURCHASE_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/purchase/purchasecreate",
      {
        quantity,
        purchaseDate,
        EntryBy,
        StaTypeId,
        SourceTypeId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: STATIONARY_PURCHASE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STATIONARY_PURCHASE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStationaryPurchase = (
  stPurchaseId,
  quantity,
  purchaseDate,
  EntryBy,
  StaTypeId,
  SourceTypeId
) => async (dispatch, getState) => {
  dispatch({ type: STATIONARY_PURCHASE_UPDATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/purchase/${stPurchaseId}`,
      {
        quantity,
        purchaseDate,
        EntryBy,
        StaTypeId,
        SourceTypeId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: STATIONARY_PURCHASE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STATIONARY_PURCHASE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsStationaryPurchase = ({ pageNumber = "" }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: STATIONARY_PURCHASE_DETAILS_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/purchase/find?pageNumber=${pageNumber}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: STATIONARY_PURCHASE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONARY_PURCHASE_DETAILS_FAIL, payload: message });
  }
};

export const detailsStationaryPurchaseOne = (id) => async (
  dispatch,
  getState
) => {
  dispatch({ type: STATIONARY_ONE_PURCHASE_DETAILS_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/purchase/find/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: STATIONARY_ONE_PURCHASE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONARY_ONE_PURCHASE_DETAILS_FAIL, payload: message });
  }
};

export const deleteStationaryPurchase = (purchaseId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: STATIONARY_PURCHASE_DELETE_REQUEST, payload: purchaseId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/purchase/${purchaseId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: STATIONARY_PURCHASE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONARY_PURCHASE_DELETE_FAIL, payload: message });
  }
};

export const getAllStationary = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_STATIONARY_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      `/api/purchase/sumcon`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: GET_ALL_STATIONARY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GET_ALL_STATIONARY_FAIL, payload: message });
  }
};

export const getOneAllStationary = (stationaryId) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: GET_ONE_ALL_STATIONARY_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      `/api/purchase/sum/${stationaryId}`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: GET_ONE_ALL_STATIONARY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GET_ONE_ALL_STATIONARY_FAIL, payload: message });
  }
};

export const createStationaryAssign = (
  quantity,
  assignDate,
  EntryBy,
  assignUserId,
  StaTypeId
) => async (dispatch, getState) => {
  dispatch({ type: STATIONARY_ASSIGN_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/purchase/assignstationary",
      {
        quantity,
        assignDate,
        EntryBy,
        assignUserId,
        StaTypeId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: STATIONARY_ASSIGN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STATIONARY_ASSIGN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchStationaryAssignOne = (uid, staId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SEARCH_STATIONARY_ASSIGN_REQUEST, payload: uid });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/purchase/con/${uid}/${staId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: SEARCH_STATIONARY_ASSIGN_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SEARCH_STATIONARY_ASSIGN_FAIL, payload: message });
  }
};

export const stationaryTypeTotalOne = (staid) => async (dispatch, getState) => {
  dispatch({ type: STATIONARY_TYPE_TOTAL_REQUEST, payload: staid });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/purchase/sumcon/${staid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: STATIONARY_TYPE_TOTAL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONARY_TYPE_TOTAL_FAIL, payload: message });
  }
};

export const searchStationaryAssignEditOne = (id) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SEARCH_STATIONARY_ASSIGN_EDIT_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/purchase/con/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: SEARCH_STATIONARY_ASSIGN_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SEARCH_STATIONARY_ASSIGN_EDIT_FAIL, payload: message });
  }
};

export const updateStationaryAssign = (STATIONARY_ASSIGN) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: STATIONARY_ASSIGN_UPDATE_REQUEST,
    payload: STATIONARY_ASSIGN,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/purchase/con/${STATIONARY_ASSIGN.id}`,
      STATIONARY_ASSIGN,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: STATIONARY_ASSIGN_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONARY_ASSIGN_UPDATE_FAIL, payload: message });
  }
};

export const deleteStationaryAssign = (id) => async (dispatch, getState) => {
  dispatch({ type: STATIONARY_ASSIGN_DELETE_REQUEST, payload: id });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/purchase/con/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: STATIONARY_ASSIGN_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONARY_ASSIGN_DELETE_FAIL, payload: message });
  }
};
