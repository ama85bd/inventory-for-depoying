import {
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  DEVICE_ASSIGN_LIST_FAIL,
  DEVICE_ASSIGN_LIST_REQUEST,
  DEVICE_ASSIGN_LIST_RESET,
  DEVICE_ASSIGN_LIST_SUCCESS,
  DEVICE_CONSUME_CREATE_FAIL,
  DEVICE_CONSUME_CREATE_REQUEST,
  DEVICE_CONSUME_CREATE_RESET,
  DEVICE_CONSUME_CREATE_SUCCESS,
  DEVICE_CONSUME_DELETE_FAIL,
  DEVICE_CONSUME_DELETE_REQUEST,
  DEVICE_CONSUME_DELETE_RESET,
  DEVICE_CONSUME_DELETE_SUCCESS,
  DEVICE_DETAILS_LIST_FAIL,
  DEVICE_DETAILS_LIST_REQUEST,
  DEVICE_DETAILS_LIST_RESET,
  DEVICE_DETAILS_LIST_SUCCESS,
  DEVICE_HOME_ALL_LIST_FAIL,
  DEVICE_HOME_ALL_LIST_REQUEST,
  DEVICE_HOME_ALL_LIST_SUCCESS,
  DEVICE_ONE_PURCHASE_DETAILS_FAIL,
  DEVICE_ONE_PURCHASE_DETAILS_REQUEST,
  DEVICE_ONE_PURCHASE_DETAILS_RESET,
  DEVICE_ONE_PURCHASE_DETAILS_SUCCESS,
  DEVICE_PROPERTIES_ADD_FAIL,
  DEVICE_PROPERTIES_ADD_REQUEST,
  DEVICE_PROPERTIES_ADD_RESET,
  DEVICE_PROPERTIES_ADD_SUCCESS,
  DEVICE_PROPERTIES_CREATE_FAIL,
  DEVICE_PROPERTIES_CREATE_REQUEST,
  DEVICE_PROPERTIES_CREATE_RESET,
  DEVICE_PROPERTIES_CREATE_SUCCESS,
  DEVICE_PROPERTIES_DELETE_FAIL,
  DEVICE_PROPERTIES_DELETE_REQUEST,
  DEVICE_PROPERTIES_DELETE_RESET,
  DEVICE_PROPERTIES_DELETE_SUCCESS,
  DEVICE_PROPERTIES_DETAILS_FAIL,
  DEVICE_PROPERTIES_DETAILS_REQUEST,
  DEVICE_PROPERTIES_DETAILS_RESET,
  DEVICE_PROPERTIES_DETAILS_SUCCESS,
  DEVICE_PROPERTIES_LIST_FAIL,
  DEVICE_PROPERTIES_LIST_REQUEST,
  DEVICE_PROPERTIES_LIST_RESET,
  DEVICE_PROPERTIES_LIST_SUCCESS,
  DEVICE_PROPERTIES_REMOVE_FAIL,
  DEVICE_PROPERTIES_REMOVE_REQUEST,
  DEVICE_PROPERTIES_REMOVE_RESET,
  DEVICE_PROPERTIES_REMOVE_SUCCESS,
  DEVICE_PROPERTIES_UPDATE_FAIL,
  DEVICE_PROPERTIES_UPDATE_REQUEST,
  DEVICE_PROPERTIES_UPDATE_RESET,
  DEVICE_PROPERTIES_UPDATE_SUCCESS,
  DEVICE_PRO_ALL_LIST_FAIL,
  DEVICE_PRO_ALL_LIST_REQUEST,
  DEVICE_PRO_ALL_LIST_SUCCESS,
  DEVICE_PURCHASE_ASSIGN_UPDATE_FAIL,
  DEVICE_PURCHASE_ASSIGN_UPDATE_REQUEST,
  DEVICE_PURCHASE_ASSIGN_UPDATE_RESET,
  DEVICE_PURCHASE_ASSIGN_UPDATE_SUCCESS,
  DEVICE_PURCHASE_CREATE_FAIL,
  DEVICE_PURCHASE_CREATE_REQUEST,
  DEVICE_PURCHASE_CREATE_RESET,
  DEVICE_PURCHASE_CREATE_SUCCESS,
  DEVICE_PURCHASE_DELETE_FAIL,
  DEVICE_PURCHASE_DELETE_REQUEST,
  DEVICE_PURCHASE_DELETE_RESET,
  DEVICE_PURCHASE_DELETE_SUCCESS,
  DEVICE_PURCHASE_LIST_FAIL,
  DEVICE_PURCHASE_LIST_REQUEST,
  DEVICE_PURCHASE_LIST_SUCCESS,
  DEVICE_PURCHASE_UPDATE_FAIL,
  DEVICE_PURCHASE_UPDATE_REQUEST,
  DEVICE_PURCHASE_UPDATE_RESET,
  DEVICE_PURCHASE_UPDATE_SUCCESS,
  DEVICE_SEARCH_FAIL,
  DEVICE_SEARCH_REQUEST,
  DEVICE_SEARCH_SUCCESS,
  DEVICE_SERIAL_LIST_FAIL,
  DEVICE_SERIAL_LIST_REQUEST,
  DEVICE_SERIAL_LIST_RESET,
  DEVICE_SERIAL_LIST_SUCCESS,
  DEVICE_TYPE_CREATE_FAIL,
  DEVICE_TYPE_CREATE_REQUEST,
  DEVICE_TYPE_CREATE_RESET,
  DEVICE_TYPE_CREATE_SUCCESS,
  DEVICE_TYPE_DELETE_FAIL,
  DEVICE_TYPE_DELETE_REQUEST,
  DEVICE_TYPE_DELETE_RESET,
  DEVICE_TYPE_DELETE_SUCCESS,
  DEVICE_TYPE_DETAILS_FAIL,
  DEVICE_TYPE_DETAILS_REQUEST,
  DEVICE_TYPE_DETAILS_RESET,
  DEVICE_TYPE_DETAILS_SUCCESS,
  DEVICE_TYPE_LIST_FAIL,
  DEVICE_TYPE_LIST_REQUEST,
  DEVICE_TYPE_LIST_RESET,
  DEVICE_TYPE_LIST_SUCCESS,
  DEVICE_TYPE_UPDATE_FAIL,
  DEVICE_TYPE_UPDATE_REQUEST,
  DEVICE_TYPE_UPDATE_RESET,
  DEVICE_TYPE_UPDATE_SUCCESS,
} from "../constants/deviceConstants";

export const deviceListReducer = (
  state = { loading: true, allDeviceType: [] },
  action
) => {
  switch (action.type) {
    case DEVICE_TYPE_LIST_REQUEST:
      return { loading: true };
    case DEVICE_TYPE_LIST_SUCCESS:
      return { loading: false, allDeviceType: action.payload };
    case DEVICE_TYPE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_TYPE_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceTypeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_TYPE_CREATE_REQUEST:
      return { loading: true };
    case DEVICE_TYPE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case DEVICE_TYPE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_TYPE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceTypeDetailsReducer = (
  state = { onedevicetype: {}, loading: true },
  action
) => {
  switch (action.type) {
    case DEVICE_TYPE_DETAILS_REQUEST:
      return { loading: true };
    case DEVICE_TYPE_DETAILS_SUCCESS:
      return { loading: false, onedevicetype: action.payload };
    case DEVICE_TYPE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_TYPE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceTypeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_TYPE_UPDATE_REQUEST:
      return { loading: true };
    case DEVICE_TYPE_UPDATE_SUCCESS:
      return { loading: false, success: true, deviceType: action.payload };
    case DEVICE_TYPE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_TYPE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceTypeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_TYPE_DELETE_REQUEST:
      return { loading: true };
    case DEVICE_TYPE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEVICE_TYPE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_TYPE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePurchaseListReducer = (
  state = { purchase: {}, loading: true },
  action
) => {
  switch (action.type) {
    case DEVICE_PURCHASE_LIST_REQUEST:
      return { loading: true };
    case DEVICE_PURCHASE_LIST_SUCCESS:
      return {
        loading: false,
        purchase: action.payload.onePurchase,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case DEVICE_PURCHASE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const devicePurchaseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_PURCHASE_CREATE_REQUEST:
      return { loading: true };
    case DEVICE_PURCHASE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case DEVICE_PURCHASE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PURCHASE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePurchaseOneDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case DEVICE_ONE_PURCHASE_DETAILS_REQUEST:
      return { loading: true };
    case DEVICE_ONE_PURCHASE_DETAILS_SUCCESS:
      return { loading: false, onepurchase: action.payload };
    case DEVICE_ONE_PURCHASE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_ONE_PURCHASE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePurchaseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_PURCHASE_UPDATE_REQUEST:
      return { loading: true };
    case DEVICE_PURCHASE_UPDATE_SUCCESS:
      return { loading: false, success: true, purchase: action.payload };
    case DEVICE_PURCHASE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PURCHASE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePurchaseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_PURCHASE_DELETE_REQUEST:
      return { loading: true };
    case DEVICE_PURCHASE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEVICE_PURCHASE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PURCHASE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePropertiesListReducer = (
  state = { properties: {}, loading: true },
  action
) => {
  switch (action.type) {
    case DEVICE_PROPERTIES_LIST_REQUEST:
      return { loading: true };
    case DEVICE_PROPERTIES_LIST_SUCCESS:
      return {
        loading: false,
        properties: action.payload.oneProperties,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case DEVICE_PROPERTIES_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PROPERTIES_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePropertiesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_PROPERTIES_CREATE_REQUEST:
      return { loading: true };
    case DEVICE_PROPERTIES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case DEVICE_PROPERTIES_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PROPERTIES_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceSerialReducer = (
  state = { loading: true, allDeviceSerial: [] },
  action
) => {
  switch (action.type) {
    case DEVICE_SERIAL_LIST_REQUEST:
      return { loading: true };
    case DEVICE_SERIAL_LIST_SUCCESS:
      return { loading: false, allDeviceSerial: action.payload };
    case DEVICE_SERIAL_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_SERIAL_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePropertiesDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case DEVICE_PROPERTIES_DETAILS_REQUEST:
      return { loading: true };
    case DEVICE_PROPERTIES_DETAILS_SUCCESS:
      return { loading: false, onePropertiesDetails: action.payload };
    case DEVICE_PROPERTIES_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PROPERTIES_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePropertiesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_PROPERTIES_UPDATE_REQUEST:
      return { loading: true };
    case DEVICE_PROPERTIES_UPDATE_SUCCESS:
      return { loading: false, success: true, properties: action.payload };
    case DEVICE_PROPERTIES_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PROPERTIES_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePropertiesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_PROPERTIES_DELETE_REQUEST:
      return { loading: true };
    case DEVICE_PROPERTIES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEVICE_PROPERTIES_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PROPERTIES_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DEVICE_DETAILS_LIST_REQUEST:
      return { loading: true };
    case DEVICE_DETAILS_LIST_SUCCESS:
      return { loading: false, oneDeviceDetails: action.payload };
    case DEVICE_DETAILS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_DETAILS_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceConsumeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_CONSUME_CREATE_REQUEST:
      return { loading: true };
    case DEVICE_CONSUME_CREATE_SUCCESS:
      return { loading: false, success: true };
    case DEVICE_CONSUME_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_CONSUME_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePurchaseAssignUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_PURCHASE_ASSIGN_UPDATE_REQUEST:
      return { loading: true };
    case DEVICE_PURCHASE_ASSIGN_UPDATE_SUCCESS:
      return { loading: false, success: true, purchaseassign: action.payload };
    case DEVICE_PURCHASE_ASSIGN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PURCHASE_ASSIGN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceAssignListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DEVICE_ASSIGN_LIST_REQUEST:
      return { loading: true };
    case DEVICE_ASSIGN_LIST_SUCCESS:
      return { loading: false, getDeviceAssignList: action.payload };
    case DEVICE_ASSIGN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_ASSIGN_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceConsumeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_CONSUME_DELETE_REQUEST:
      return { loading: true };
    case DEVICE_CONSUME_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEVICE_CONSUME_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_CONSUME_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const deviceSearchReducer = (
  state = { loading: true, devices: [] },
  action
) => {
  switch (action.type) {
    case DEVICE_SEARCH_REQUEST:
      return { loading: true };
    case DEVICE_SEARCH_SUCCESS:
      return {
        loading: false,
        devices: action.payload.getallDeviceSearch,
        allsearchdevices: action.payload.finalArr,
        pages: action.payload.pages,
        pagess: action.payload.pagess,
        page: action.payload.page,
      };
    case DEVICE_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deviceBrandReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return { loading: true };
    case BRAND_LIST_SUCCESS:
      return { loading: false, allDeviceBrand: action.payload };
    case BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deviceProAllReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DEVICE_PRO_ALL_LIST_REQUEST:
      return { loading: true };
    case DEVICE_PRO_ALL_LIST_SUCCESS:
      return {
        loading: false,
        cpuPro: action.payload.cpu,
        ramPro: action.payload.ram,
        graphicsPro: action.payload.graphics,
        ssdPro: action.payload.ssd,
        hddPro: action.payload.hdd,
        displayPro: action.payload.display,
        osPro: action.payload.os,
      };
    case DEVICE_PRO_ALL_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deviceHomeAllReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DEVICE_HOME_ALL_LIST_REQUEST:
      return { loading: true };
    case DEVICE_HOME_ALL_LIST_SUCCESS:
      return {
        loading: false,
        deviceType: action.payload.alldeviceType,
        deviceBrand: action.payload.getDeviceBrand,
        deviceCpu: action.payload.getDeviceCpu,
      };
    case DEVICE_HOME_ALL_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const devicePropertiesAddReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_PROPERTIES_ADD_REQUEST:
      return { loading: true };
    case DEVICE_PROPERTIES_ADD_SUCCESS:
      return { loading: false, success: true, properties: action.payload };
    case DEVICE_PROPERTIES_ADD_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PROPERTIES_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const devicePropertiesRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_PROPERTIES_REMOVE_REQUEST:
      return { loading: true };
    case DEVICE_PROPERTIES_REMOVE_SUCCESS:
      return { loading: false, success: true, properties: action.payload };
    case DEVICE_PROPERTIES_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    case DEVICE_PROPERTIES_REMOVE_RESET:
      return {};
    default:
      return state;
  }
};
