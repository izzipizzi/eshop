import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'

import user from "./reducers/user";
import productsReducer from "./reducers/product";
// import userInput from "./reducers/userInput";

let reducers = combineReducers({
    productsReducer,
    user,
    form:formReducer,
})

let store = createStore(reducers,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__  ?  window.__REDUX_DEVTOOLS_EXTENSION__() : f => f))


// window.store = store
export default store