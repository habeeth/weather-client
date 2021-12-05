import axios from '../helpers/index';
import { weatherConstants } from './constants';

export const getWeatherByLocation = (location) => {
    return async (dispatch) => {
        dispatch({ type: weatherConstants.FETCH_REQUEST })
        const res = await axios.get(`/weather/${location}`);
        console.log('resp', res);
        if (res.status === 200) {
            dispatch({ type: weatherConstants.FETCH_SUCCESS, payload: res.data });
        }
        else {
            dispatch({ type: weatherConstants.FETCH_FAILURE, payload: res.data });
        }
    }
}
