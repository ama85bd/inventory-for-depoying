import axios from "axios";
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_COMMON_REQUEST,
  USER_DETAILS_COMMON_SUCCESS,
  USER_DETAILS_COMMON_FAIL,
  USER_LIST_COMMON_REQUEST,
  USER_LIST_COMMON_SUCCESS,
  USER_LIST_COMMON_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_PASS_UPDATE_REQUEST,
  USER_PASS_UPDATE_SUCCESS,
  USER_PASS_UPDATE_FAIL,
} from "../constants/userConstants";
const Axios = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export const listUsers = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

export const detailsUser = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: id });
  // const {
  //   userSignin: { userInfo },
  // } = getState();
  try {
    const { data } = await Axios.get(
      `/api/users/${id}`
      // , {
      //   headers: {
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // }
    );
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
};

export const register = (name, email, password, dept) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
      dept,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createUser =
  (name, email, password, dept) => async (dispatch, getState) => {
    dispatch({ type: USER_CREATE_REQUEST, payload: { email, password } });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post(
        "/api/users/userCreate",
        {
          name,
          email,
          password,
          dept,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: USER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/${user.id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};

export const updateUserPass = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_PASS_UPDATE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/pass/${user.id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_PASS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_PASS_UPDATE_FAIL, payload: message });
  }
};

// export const listUsers = () => async (dispatch, getState) => {
//   dispatch({ type: USER_LIST_REQUEST });
//   try {
//     const {
//       userSignin: { userInfo },
//     } = getState();
//     const { data } = await Axios.get("/api/user", {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     });
//     dispatch({ type: USER_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_LIST_FAIL, payload: message });
//   }
// };

// export const listCommonUsers = (dbName) => async (dispatch, getState) => {
//   dispatch({ type: USER_LIST_COMMON_REQUEST });
//   try {
//     const {
//       userSignin: { userInfo },
//     } = getState();
//     const { data } = await Axios.post(
//       "/api/userCommon",
//       { dbName },
//       {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }
//     );
//     dispatch({ type: USER_LIST_COMMON_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_LIST_COMMON_FAIL, payload: message });
//   }
// };

// export const detailsCommonUser = (id, dbName) => async (dispatch, getState) => {
//   dispatch({ type: USER_DETAILS_COMMON_REQUEST, payload: { id, dbName } });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.get(
//       `/api/userdetailcommon/${id}`,
//       { dbName },
//       {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }
//     );
//     dispatch({ type: USER_DETAILS_COMMON_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_DETAILS_COMMON_FAIL, payload: message });
//   }
// };

// export const updateUser = (user) => async (dispatch, getState) => {
//   dispatch({ type: USER_UPDATE_REQUEST, payload: user });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.put(`/api/users/${user._id}`, user, {
//       headers: { Authorization: `Bearer ${userInfo.token}` },
//     });
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_UPDATE_FAIL, payload: message });
//   }
// };
