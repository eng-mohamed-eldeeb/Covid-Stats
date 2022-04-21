const GET_COUNTRIES_REQUEST = 'GET_COUNTRIES_REQUEST';
const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
const GET_COUNTRIES_FAILURE = 'GET_COUNTRIES_FAILURE';

export const getCountriesRequest = () => ({
  type: GET_COUNTRIES_REQUEST,
});

export const getCountriesSuccess = (data) => ({
  type: GET_COUNTRIES_SUCCESS,
  data,
});

export const getCountriesFailure = (error) => ({
  type: GET_COUNTRIES_FAILURE,
  error,
});

const initialState = {};

const allCountriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: 'loading',
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: 'success',
        data: action.data,
      };
    case GET_COUNTRIES_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.error,
      };
    default:
      return state;
  }
};

export default allCountriesReducer;
