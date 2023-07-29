import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import fileReducer from "./fileReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,

})

export const store = createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunk)));