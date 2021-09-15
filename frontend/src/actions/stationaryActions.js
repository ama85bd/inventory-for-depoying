import axios from "axios";
import {
  STATIONAR_TYPE_CREATE_FAIL,
  STATIONAR_TYPE_CREATE_REQUEST,
  STATIONAR_TYPE_CREATE_SUCCESS,
  STATIONAR_TYPE_LIST_FAIL,
  STATIONAR_TYPE_LIST_REQUEST,
  STATIONAR_TYPE_LIST_SUCCESS,
  STATIONAR_TYPE_UPDATE_FAIL,
  STATIONAR_TYPE_UPDATE_REQUEST,
  STATIONAR_TYPE_UPDATE_SUCCESS,
  STATIONAR_TYPE_DETAILS_REQUEST,
  STATIONAR_TYPE_DETAILS_SUCCESS,
  STATIONAR_TYPE_DETAILS_FAIL,
  STATIONAR_TYPE_DELETE_REQUEST,
  STATIONAR_TYPE_DELETE_SUCCESS,
  STATIONAR_TYPE_DELETE_FAIL,
} from "../constants/stationaryConstants";
const Axios = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export const listStationaryType = () => async (dispatch, getState) => {
  dispatch({
    type: STATIONAR_TYPE_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/stationary", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: STATIONAR_TYPE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONAR_TYPE_LIST_FAIL, payload: message });
  }
};

export const createStationaryType = (name, unit) => async (
  dispatch,
  getState
) => {
  dispatch({ type: STATIONAR_TYPE_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/stationary/stationarytypecreate",
      {
        name,
        unit,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: STATIONAR_TYPE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STATIONAR_TYPE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStationaryType = (stType) => async (dispatch, getState) => {
  dispatch({ type: STATIONAR_TYPE_UPDATE_REQUEST, payload: stType });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/stationary/${stType.id}`, stType, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: STATIONAR_TYPE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONAR_TYPE_UPDATE_FAIL, payload: message });
  }
};

export const detailsStationaryType = (id) => async (dispatch, getState) => {
  dispatch({ type: STATIONAR_TYPE_DETAILS_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/stationary/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: STATIONAR_TYPE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONAR_TYPE_DETAILS_FAIL, payload: message });
  }
};

export const deleteStationaryType = (stTypeId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: STATIONAR_TYPE_DELETE_REQUEST, payload: stTypeId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/stationary/${stTypeId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: STATIONAR_TYPE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STATIONAR_TYPE_DELETE_FAIL, payload: message });
  }
};
