import { weatherConstants } from '../actions/constants';
const initialState = {
    loading: false,
    data: null,
    error: null
}
const Weather = (state = initialState, { type, payload }) => {
    switch (type) {
        case weatherConstants.FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case weatherConstants.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload.data
            }
        case weatherConstants.FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error
            }
        default:
            return state;
    }
};

export default Weather;
