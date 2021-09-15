import {
  STATIONARY_ONE_PURCHASE_DETAILS_FAIL,
  STATIONARY_ONE_PURCHASE_DETAILS_REQUEST,
  STATIONARY_ONE_PURCHASE_DETAILS_RESET,
  STATIONARY_ONE_PURCHASE_DETAILS_SUCCESS,
  STATIONARY_PURCHASE_CREATE_FAIL,
  STATIONARY_PURCHASE_CREATE_REQUEST,
  STATIONARY_PURCHASE_CREATE_RESET,
  STATIONARY_PURCHASE_CREATE_SUCCESS,
  STATIONARY_PURCHASE_DETAILS_FAIL,
  STATIONARY_PURCHASE_DETAILS_REQUEST,
  STATIONARY_PURCHASE_DETAILS_RESET,
  STATIONARY_PURCHASE_DETAILS_SUCCESS,
  STATIONARY_PURCHASE_LIST_FAIL,
  STATIONARY_PURCHASE_LIST_REQUEST,
  STATIONARY_PURCHASE_LIST_SUCCESS,
  STATIONARY_PURCHASE_UPDATE_FAIL,
  STATIONARY_PURCHASE_UPDATE_REQUEST,
  STATIONARY_PURCHASE_UPDATE_SUCCESS,
  STATIONARY_PURCHASE_UPDATE_RESET,
  STATIONARY_PURCHASE_DELETE_REQUEST,
  STATIONARY_PURCHASE_DELETE_SUCCESS,
  STATIONARY_PURCHASE_DELETE_FAIL,
  STATIONARY_PURCHASE_DELETE_RESET,
  GET_ALL_STATIONARY_REQUEST,
  GET_ALL_STATIONARY_SUCCESS,
  GET_ALL_STATIONARY_FAIL,
  GET_ONE_ALL_STATIONARY_REQUEST,
  GET_ONE_ALL_STATIONARY_SUCCESS,
  GET_ONE_ALL_STATIONARY_FAIL,
  STATIONARY_ASSIGN_REQUEST,
  STATIONARY_ASSIGN_SUCCESS,
  STATIONARY_ASSIGN_FAIL,
  STATIONARY_ASSIGN_RESET,
  SEARCH_STATIONARY_ASSIGN_REQUEST,
  SEARCH_STATIONARY_ASSIGN_SUCCESS,
  SEARCH_STATIONARY_ASSIGN_FAIL,
  SEARCH_STATIONARY_ASSIGN_EDIT_REQUEST,
  SEARCH_STATIONARY_ASSIGN_EDIT_SUCCESS,
  SEARCH_STATIONARY_ASSIGN_EDIT_FAIL,
  SEARCH_STATIONARY_ASSIGN_EDIT_RESET,
  STATIONARY_TYPE_TOTAL_REQUEST,
  STATIONARY_TYPE_TOTAL_SUCCESS,
  STATIONARY_TYPE_TOTAL_FAIL,
  STATIONARY_TYPE_TOTAL_RESET,
  STATIONARY_ASSIGN_UPDATE_REQUEST,
  STATIONARY_ASSIGN_UPDATE_SUCCESS,
  STATIONARY_ASSIGN_UPDATE_FAIL,
  STATIONARY_ASSIGN_UPDATE_RESET,
  STATIONARY_ASSIGN_DELETE_REQUEST,
  STATIONARY_ASSIGN_DELETE_SUCCESS,
  STATIONARY_ASSIGN_DELETE_FAIL,
  STATIONARY_ASSIGN_DELETE_RESET,
  SEARCH_STATIONARY_ASSIGN_RESET,
} from "../constants/stationaryPurchaseConstants";

export const stationaryPurchaseListReducer = (
  state = { loading: true, allPurchase: [] },
  action
) => {
  switch (action.type) {
    case STATIONARY_PURCHASE_LIST_REQUEST:
      return { loading: true };
    case STATIONARY_PURCHASE_LIST_SUCCESS:
      return { loading: false, allPurchase: action.payload };
    case STATIONARY_PURCHASE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stationaryPurchaseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STATIONARY_PURCHASE_CREATE_REQUEST:
      return { loading: true };
    case STATIONARY_PURCHASE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case STATIONARY_PURCHASE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STATIONARY_PURCHASE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const purchaseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case STATIONARY_PURCHASE_UPDATE_REQUEST:
      return { loading: true };
    case STATIONARY_PURCHASE_UPDATE_SUCCESS:
      return { loading: false, success: true, purchase: action.payload };
    case STATIONARY_PURCHASE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STATIONARY_PURCHASE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stationaryPurchaseDetailsReducer = (
  state = { purchase: {}, loading: true },
  action
) => {
  switch (action.type) {
    case STATIONARY_PURCHASE_DETAILS_REQUEST:
      return { loading: true };
    case STATIONARY_PURCHASE_DETAILS_SUCCESS:
      return {
        loading: false,
        purchase: action.payload.onePurchase,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case STATIONARY_PURCHASE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case STATIONARY_PURCHASE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const stationaryPurchaseOneDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case STATIONARY_ONE_PURCHASE_DETAILS_REQUEST:
      return { loading: true };
    case STATIONARY_ONE_PURCHASE_DETAILS_SUCCESS:
      return { loading: false, onepurchase: action.payload };
    case STATIONARY_ONE_PURCHASE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case STATIONARY_ONE_PURCHASE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const stationaryPurchaseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STATIONARY_PURCHASE_DELETE_REQUEST:
      return { loading: true };
    case STATIONARY_PURCHASE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STATIONARY_PURCHASE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case STATIONARY_PURCHASE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const allStationaryReducer = (
  state = { loading: true, allStationary: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_STATIONARY_REQUEST:
      return { loading: true };
    case GET_ALL_STATIONARY_SUCCESS:
      return { loading: false, allStationary: action.payload };
    case GET_ALL_STATIONARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const oneAllStationaryReducer = (
  state = { loading: true, OneAllStationary: [] },
  action
) => {
  switch (action.type) {
    case GET_ONE_ALL_STATIONARY_REQUEST:
      return { loading: true };
    case GET_ONE_ALL_STATIONARY_SUCCESS:
      return { loading: false, OneAllStationary: action.payload };
    case GET_ONE_ALL_STATIONARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stationaryAssignReducer = (state = {}, action) => {
  switch (action.type) {
    case STATIONARY_ASSIGN_REQUEST:
      return { loading: true };
    case STATIONARY_ASSIGN_SUCCESS:
      return { loading: false, success: true };
    case STATIONARY_ASSIGN_FAIL:
      return { loading: false, error: action.payload };
    case STATIONARY_ASSIGN_RESET:
      return {};
    default:
      return state;
  }
};

export const searchStationaryAssignReducer = (
  state = { loading: true, allStationary: [] },
  action
) => {
  switch (action.type) {
    case SEARCH_STATIONARY_ASSIGN_REQUEST:
      return { loading: true };
    case SEARCH_STATIONARY_ASSIGN_SUCCESS:
      return { loading: false, allStationary: action.payload };
    case SEARCH_STATIONARY_ASSIGN_FAIL:
      return { loading: false, error: action.payload };
    case SEARCH_STATIONARY_ASSIGN_RESET:
      return {};
    default:
      return state;
  }
};

export const stationaryTypeTotalReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case STATIONARY_TYPE_TOTAL_REQUEST:
      return { loading: true };
    case STATIONARY_TYPE_TOTAL_SUCCESS:
      return { loading: false, oneStaTotal: action.payload };
    case STATIONARY_TYPE_TOTAL_FAIL:
      return { loading: false, error: action.payload };
    case STATIONARY_TYPE_TOTAL_RESET:
      return {};
    default:
      return state;
  }
};

export const searchStationaryAssignEditReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case SEARCH_STATIONARY_ASSIGN_EDIT_REQUEST:
      return { loading: true };
    case SEARCH_STATIONARY_ASSIGN_EDIT_SUCCESS:
      return { loading: false, oneStaAssign: action.payload };
    case SEARCH_STATIONARY_ASSIGN_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case SEARCH_STATIONARY_ASSIGN_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const stationaryAssignUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case STATIONARY_ASSIGN_UPDATE_REQUEST:
      return { loading: true };
    case STATIONARY_ASSIGN_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        stationaryAssign: action.payload,
      };
    case STATIONARY_ASSIGN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STATIONARY_ASSIGN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stationaryAssignDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STATIONARY_ASSIGN_DELETE_REQUEST:
      return { loading: true };
    case STATIONARY_ASSIGN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STATIONARY_ASSIGN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case STATIONARY_ASSIGN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
