const {
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
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_DBTBCREATE_REQUEST,
  USER_DBTBCREATE_SUCCESS,
  USER_DBTBCREATE_FAIL,
  USER_DETAILS_COMMON_REQUEST,
  USER_DETAILS_COMMON_SUCCESS,
  USER_DETAILS_COMMON_FAIL,
  USER_DETAILS_COMMON_RESET,
  USER_LIST_COMMON_REQUEST,
  USER_LIST_COMMON_SUCCESS,
  USER_LIST_COMMON_FAIL,
  TABLE_LIST_COMMON_REQUEST,
  TABLE_LIST_COMMON_SUCCESS,
  TABLE_LIST_COMMON_FAIL,
  TABLE_COLUMN_LIST_COMMON_REQUEST,
  TABLE_COLUMN_LIST_COMMON_SUCCESS,
  TABLE_COLUMN_LIST_COMMON_FAIL,
  TABLE_CREATE_REQUEST,
  TABLE_CREATE_SUCCESS,
  TABLE_CREATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_RESET,
  USER_PASS_UPDATE_REQUEST,
  USER_PASS_UPDATE_SUCCESS,
  USER_PASS_UPDATE_FAIL,
  USER_PASS_UPDATE_RESET,
} = require("../constants/userConstants");

export const usersListReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = { user: {}, loading: true },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, success: true };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userPassUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASS_UPDATE_REQUEST:
      return { loading: true };
    case USER_PASS_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_PASS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PASS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// export const userListReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case USER_LIST_REQUEST:
//       return { loading: true };
//     case USER_LIST_SUCCESS:
//       return { loading: false, users: action.payload };
//     case USER_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const userCommonListReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case USER_LIST_COMMON_REQUEST:
//       return { loading: true };
//     case USER_LIST_COMMON_SUCCESS:
//       return { loading: false, users: action.payload };
//     case USER_LIST_COMMON_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const tableListReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case TABLE_LIST_COMMON_REQUEST:
//       return { loading: true };
//     case TABLE_LIST_COMMON_SUCCESS:
//       return { loading: false, tables: action.payload };
//     case TABLE_LIST_COMMON_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const tableColumnListReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case TABLE_COLUMN_LIST_COMMON_REQUEST:
//       return { loading: true };
//     case TABLE_COLUMN_LIST_COMMON_SUCCESS:
//       return { loading: false, tablesColumn: action.payload };
//     case TABLE_COLUMN_LIST_COMMON_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const userCommonDetailsReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case USER_DETAILS_COMMON_REQUEST:
//       return { loading: true };
//     case USER_DETAILS_COMMON_SUCCESS:
//       return { loading: false, user: action.payload };
//     case USER_DETAILS_COMMON_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_DETAILS_COMMON_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

// export const userUpdateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_UPDATE_REQUEST:
//       return { loading: true };
//     case USER_UPDATE_SUCCESS:
//       return { loading: false, success: true };
//     case USER_UPDATE_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_UPDATE_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

// export const userDbTbCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_DBTBCREATE_REQUEST:
//       return { loading: true };
//     case USER_DBTBCREATE_SUCCESS:
//       return { loading: false, success: true };
//     case USER_DBTBCREATE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const tableCreateReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case TABLE_CREATE_REQUEST:
//       return { loading: true };
//     case TABLE_CREATE_SUCCESS:
//       return { loading: false, tableDetails: action.payload };
//     case TABLE_CREATE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
