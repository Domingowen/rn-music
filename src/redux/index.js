import {createStore, combineReducers, applyMiddleware} from "redux";
import ReduxThunk from 'redux-thunk'
import ReduxLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import MusicReducers from 'src/redux/reducer/music';
const MiddlewareArr = [ReduxThunk];
if (process.env.NODE_ENV === `development`) {
    MiddlewareArr.push(ReduxLogger);
}
const MiddlewareEnhances = applyMiddleware(...MiddlewareArr);
const store = createStore(MusicReducers, composeWithDevTools(MiddlewareEnhances));
export default store;