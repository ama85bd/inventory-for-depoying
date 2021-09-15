import {
  STATIONAR_TYPE_CREATE_FAIL,
  STATIONAR_TYPE_CREATE_REQUEST,
  STATIONAR_TYPE_CREATE_RESET,
  STATIONAR_TYPE_CREATE_SUCCESS,
  STATIONAR_TYPE_DELETE_FAIL,
  STATIONAR_TYPE_DELETE_REQUEST,
  STATIONAR_TYPE_DELETE_RESET,
  STATIONAR_TYPE_DELETE_SUCCESS,
  STATIONAR_TYPE_DETAILS_FAIL,
  STATIONAR_TYPE_DETAILS_REQUEST,
  STATIONAR_TYPE_DETAILS_RESET,
  STATIONAR_TYPE_DETAILS_SUCCESS,
  STATIONAR_TYPE_LIST_FAIL,
  STATIONAR_TYPE_LIST_REQUEST,
  STATIONAR_TYPE_LIST_SUCCESS,
  STATIONAR_TYPE_UPDATE_FAIL,
  STATIONAR_TYPE_UPDATE_REQUEST,
  STATIONAR_TYPE_UPDATE_RESET,
  STATIONAR_TYPE_UPDATE_SUCCESS,
} from "../constants/stationaryConstants";

export const stationaryListReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case STATIONAR_TYPE_LIST_REQUEST:
      return { loading: true };
    case STATIONAR_TYPE_LIST_SUCCESS:
      return { loading: false, allStationaryType: action.payload };
    case STATIONAR_TYPE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stationaryTypeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STATIONAR_TYPE_CREATE_REQUEST:
      return { loading: true };
    case STATIONAR_TYPE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case STATIONAR_TYPE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STATIONAR_TYPE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stationaryTypeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case STATIONAR_TYPE_UPDATE_REQUEST:
      return { loading: true };
    case STATIONAR_TYPE_UPDATE_SUCCESS:
      return { loading: false, success: true, stationaryType: action.payload };
    case STATIONAR_TYPE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STATIONAR_TYPE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stationaryTypeDetailsReducer = (
  state = { stationaryType: {}, loading: true },
  action
) => {
  switch (action.type) {
    case STATIONAR_TYPE_DETAILS_REQUEST:
      return { loading: true };
    case STATIONAR_TYPE_DETAILS_SUCCESS:
      return { loading: false, stationaryType: action.payload };
    case STATIONAR_TYPE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case STATIONAR_TYPE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const stationaryTypeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STATIONAR_TYPE_DELETE_REQUEST:
      return { loading: true };
    case STATIONAR_TYPE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STATIONAR_TYPE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case STATIONAR_TYPE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
