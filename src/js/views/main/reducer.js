
import { fromJS, List } from 'immutable';
import * as ActionTypes from './constants';

const DATA_MODEL = {
  content: [],
  total: 0,
  limit: 0,
  offset: 0,
};

const initialState = fromJS({
  data: fromJS(),
  currentStar: List(),
  currentStarError: List(),
});

function startReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_STARS: {
      if (action.response.offset !== state.getIn(['data', 'offset'])) {
        const list = state.getIn(['data', 'content']).concat((action.response.content));
        const newState = state.setIn(['data'], fromJS(action.response));
        return newState.setIn(['data', 'content'],fromJS(list));
      } else {
        return state.setIn(['data'], fromJS(action.response));
      }
    }

    case ActionTypes.GET_STAR: {
      return state.setIn(['currentStar'], fromJS(action.response));
    }

    case ActionTypes.CLEAR_DATA: {
      return initialState;
    }

    default:
      return state;
  }
}

export default startReducer;
