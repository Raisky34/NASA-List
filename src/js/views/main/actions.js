import * as ActionTypes from './constants';
import { CALL_API } from '../../middleware/api';
import { toUrlParams } from '../../utils/UrlHelper';

const DEMO_KEY = 'WX88i9B38gGcmhp1DjoCtfnGgXEX54VY8SaQJXVy';


// https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
export function getStars(params, onComplete = null) {
  let urlParams = '';
  if (params) {
    const { limit, offset, orderBy, orderDirection, keyword } = params;
    urlParams = toUrlParams({ limit, offset, orderBy, orderDirection, keyword });
  }

  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [ActionTypes.GET_STARS_REQUEST, ActionTypes.GET_STARS, ActionTypes.GET_STARS_ERROR],
        endpoint: `feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${DEMO_KEY}`,
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        onComplete,
      }
    })
  }
}

export function getStar(uuid, onComplete = null) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [ActionTypes.GET_STAR_REQUEST, ActionTypes.GET_STAR, ActionTypes.GET_STAR_ERROR],
        endpoint: `neo/${uuid}?api_key=${DEMO_KEY}`,
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        onComplete,
      }
    })
  }
}

export function clearData() {
  return (dispatch) => {
    return dispatch({
      type: ActionTypes.CLEAR_DATA,
    })
  }
}
