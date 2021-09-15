import axios from "axios";
import {
  SOURCE_CREATE_FAIL,
  SOURCE_CREATE_REQUEST,
  SOURCE_CREATE_SUCCESS,
  SOURCE_DELETE_FAIL,
  SOURCE_DELETE_REQUEST,
  SOURCE_DELETE_SUCCESS,
  SOURCE_DETAILS_FAIL,
  SOURCE_DETAILS_REQUEST,
  SOURCE_DETAILS_SUCCESS,
  SOURCE_LIST_FAIL,
  SOURCE_LIST_REQUEST,
  SOURCE_LIST_SUCCESS,
  SOURCE_UPDATE_FAIL,
  SOURCE_UPDATE_REQUEST,
  SOURCE_UPDATE_SUCCESS,
} from "../constants/sourceConstants";
const Axios = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export const listSource = () => async (dispatch, getState) => {
  dispatch({
    type: SOURCE_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/source", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: SOURCE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SOURCE_LIST_FAIL, payload: message });
  }
};

export const createSource = (name) => async (dispatch, getState) => {
  dispatch({ type: SOURCE_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/source/sourcecreate",
      {
        name,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: SOURCE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SOURCE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSource = (source) => async (dispatch, getState) => {
  dispatch({ type: SOURCE_UPDATE_REQUEST, payload: source });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/source/${source.id}`, source, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SOURCE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SOURCE_UPDATE_FAIL, payload: message });
  }
};

export const detailsSource = (id) => async (dispatch, getState) => {
  dispatch({ type: SOURCE_DETAILS_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/source/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: SOURCE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SOURCE_DETAILS_FAIL, payload: message });
  }
};

export const deleteSource = (sourceId) => async (dispatch, getState) => {
  dispatch({ type: SOURCE_DELETE_REQUEST, payload: sourceId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/source/${sourceId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SOURCE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SOURCE_DELETE_FAIL, payload: message });
  }
};
