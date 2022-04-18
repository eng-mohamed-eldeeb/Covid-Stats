import { DateTime } from 'luxon';
import {
  getCountriesRequest,
  getCountriesSuccess,
  getCountriesFailure,
} from './allCountries/allCountries';
import {
  getRegionRequest,
  getRegionSuccess,
  getRegionFailure,
} from './region/region';

export const date = DateTime.local().minus({ hours: 3 }).toFormat('yyyy-LL-dd');

export const getCountries = (abort) => async (dispatch) => {
  const url = `https://api.covid19tracking.narrativa.com/api/${date}`;
  dispatch(getCountriesRequest());
  try {
    const response = await fetch(url, { signal: abort.signal });
    const data = await response.json();
    const countries = Object.values(data.dates)[0].countries; // eslint-disable-line
    const countriesArr = Object.values(countries);
    const totalConfirmed = data.total.today_confirmed;
    const payload = {
      totalConfirmed,
      countriesArr,
    };
    dispatch(getCountriesSuccess(payload));
  } catch (err) {
    dispatch(getCountriesFailure(err));
  }
};
export const getRegion = (country, abort) => async (dispatch) => {
  const url = `https://api.covid19tracking.narrativa.com/api/${date}/country/${country}`;
  dispatch(getRegionRequest());
  try {
    const response = await fetch(url, { signal: abort.signal });
    const data = await response.json();
    const country = Object.values(data.dates)[0].countries;  //eslint-disable-line
    const countryData = (country)[Object.keys((country))[0]];
    dispatch(getRegionSuccess(countryData));
  } catch (err) {
    dispatch(getRegionFailure(err));
  }
};
