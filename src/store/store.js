import { createStore, applyMiddleware } from "redux";
import { musicData } from "./reducer";
import thunk from "redux-thunk";

let store = createStore(musicData, applyMiddleware(thunk));

export default store;
