import {
  SOURCE_CREATE_FAIL,
  SOURCE_CREATE_REQUEST,
  SOURCE_CREATE_RESET,
  SOURCE_CREATE_SUCCESS,
  SOURCE_DELETE_FAIL,
  SOURCE_DELETE_REQUEST,
  SOURCE_DELETE_RESET,
  SOURCE_DELETE_SUCCESS,
  SOURCE_DETAILS_FAIL,
  SOURCE_DETAILS_REQUEST,
  SOURCE_DETAILS_RESET,
  SOURCE_DETAILS_SUCCESS,
  SOURCE_LIST_FAIL,
  SOURCE_LIST_REQUEST,
  SOURCE_LIST_SUCCESS,
  SOURCE_UPDATE_FAIL,
  SOURCE_UPDATE_REQUEST,
  SOURCE_UPDATE_RESET,
  SOURCE_UPDATE_SUCCESS,
} from "../constants/sourceConstants";

export const sourceListReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case SOURCE_LIST_REQUEST:
      return { loading: true };
    case SOURCE_LIST_SUCCESS:
      return { loading: false, allSource: action.payload };
    case SOURCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sourceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SOURCE_CREATE_REQUEST:
      return { loading: true };
    case SOURCE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case SOURCE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SOURCE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const sourceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SOURCE_UPDATE_REQUEST:
      return { loading: true };
    case SOURCE_UPDATE_SUCCESS:
      return { loading: false, success: true, source: action.payload };
    case SOURCE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SOURCE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const sourceDetailsReducer = (
  state = { user: {}, loading: true },
  action
) => {
  switch (action.type) {
    case SOURCE_DETAILS_REQUEST:
      return { loading: true };
    case SOURCE_DETAILS_SUCCESS:
      return { loading: false, source: action.payload };
    case SOURCE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SOURCE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const sourceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SOURCE_DELETE_REQUEST:
      return { loading: true };
    case SOURCE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SOURCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case SOURCE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
