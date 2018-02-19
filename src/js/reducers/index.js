import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

// import data from "../contentReducer";
import StarReducer from '../views/main/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  stars: StarReducer,
});

export default rootReducer;
