const GET_REGION_REQUEST = 'GET_REGION_REQUEST';
const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS';
const GET_REGION_FAILURE = 'GET_REGION_FAILURE';

export const getRegionRequest = () => ({
  type: GET_REGION_REQUEST,
});

export const getRegionSuccess = (data) => ({
  type: GET_REGION_SUCCESS,
  data,
});

export const getRegionFailure = (error) => ({
  type: GET_REGION_FAILURE,
  error,
});

const initialState = {};

const regionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGION_REQUEST:
      return {
        ...state,
        loading: 'loading',
      };
    case GET_REGION_SUCCESS:
      return {
        ...state,
        loading: 'success',
        data: action.data,
      };
    case GET_REGION_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.error,
      };
    default:
      return state;
  }
};

export default regionReducer;
