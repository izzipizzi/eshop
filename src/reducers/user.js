import actions from "redux-form/lib/actions";


const SIGN_UP = 'SIGN_UP';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const USER_IS_AUTH = 'USER_IS_AUTH';
const USER_IS_LOADING = 'USER_IS_LOADING';
const USER_HAS_ERROR = 'USER_HAS_ERROR';
const userState ={
    currentUser:{

            "_id": "5e882e00989b555a2cba253e",
            "email": "kircheiandri@gmail.com",
            "name": "Andrea",
            "role": 0

    },
    isLoading: false,
    isError:false,
    errorMsg :''
}

const user = (state = userState,action) =>{
    switch (action.type) {
        case SIGN_UP:{
            return {...state, currentUser: action.user}
        }
        case SIGN_IN:{
            return {...state, currentUser: action.user}
        }
        case USER_IS_AUTH:{
            return {...state , currentUser: action.user}
        }
        case SIGN_OUT:{
            localStorage.removeItem('jwt')
            localStorage.removeItem('userId')
            return {...state, currentUser:{}}
        }
        case USER_IS_LOADING:{

            return {...state, isLoading:action.isLoading}

        }
        case USER_HAS_ERROR:{

            return {...state,isError: action.isError, errorMsg: action.errorMsg}

        }

        default:{
            return {...state}
        }

    }
}
export const userSignUp = (user) => ({type: SIGN_UP, user})
export const userSignIn = (user) => ({type: SIGN_IN, user})
export const userIsAuth = (user) => ({type: USER_IS_AUTH, user})
export const userSignOut = () => ({type: SIGN_OUT})
export const userIsLoading = (bool) =>({type:USER_IS_LOADING,isLoading : bool})
export const userHasError = (bool,errorMsg) =>({type:USER_HAS_ERROR,isError : bool,errorMsg})


export default user

// import {combineReducers} from "redux";
// import {signup} from "../AuthorizedAccess";
//
// const USER = 'USER';
// const USER_IS_LOADING = "USER_IS_LOADING"
// const USER_HAS_TOKEN = "USER_HAS_TOKEN"
// const ADD_USER_TOKEN = "ADD_USER_TOKEN"
// const REMOVE_USER_TOKEN = "REMOVE_USER_TOKEN"
// const USER_HAS_ERROR = "USER_HAS_ERROR"
// const USER_HAS_SUCCESS = "USER_HAS_SUCCESS"
//
//
// const SIGN_UP = 'SIGN_UP';
// const SIGN_IN = 'SIGN_IN';
// const SIGN_OUT = 'SIGN_OUT';
// const REDIRECT_USER = 'REDIRECT_USER';
// const USER_INPUT_NAME_CHANGED = 'USER_INPUT_NAME_CHANGED';
// const USER_INPUT_EMAIL_CHANGED = 'USER_INPUT_EMAIL_CHANGED';
// const USER_INPUT_PASSWORD_CHANGED = 'USER_INPUT_PASSWORD_CHANGED';
// // const LOAD_PRODUCTS_BY_SOLD = 'LOAD_PRODUCTS_BY_SOLD';
//
// const userData = {
//     name: '',
//     email: '',
//     password: '',
//     // redirectLink :'/signin',
//     // redirectToReferer: false,
//
//     userData: {
//
//
//     }
// }
//
//
// const user = (state = userData, action) => {
//     let newState;
//
//     switch (action.type) {
//         case USER_INPUT_NAME_CHANGED : {
//             return newState = {...state, name: action.value}
//         }
//         case USER_INPUT_EMAIL_CHANGED : {
//             return newState = {...state, email: action.value}
//         }
//         case USER_INPUT_PASSWORD_CHANGED : {
//             return newState = {...state, password: action.value}
//         }
//         case SIGN_UP : {
//             return newState = {...state, userData: action.user}
//         }
//         case SIGN_IN : {
//             return newState = {...state, userData: action.user}
//         }
//         case SIGN_OUT : {
//             return newState = {...state, userData: {}}
//         }
//
//
//
//
//
//         default : {
//             return state
//         }
//
//     }
// }
//
//
// // export const isAuth =(products)=>({type:LOAD_PRODUCTS,products})
// export const userSignUp = (user) => ({type: SIGN_UP, user})
// export const userSignIn = (user) => ({type: SIGN_IN, user})
// export const userSignOut = () => ({type: SIGN_OUT})
// export const userRedirect = (role) => ({type: REDIRECT_USER, role})
//
//
// //Обробник інпутів
// export const userInputNameChanged = (value) => ({type: USER_INPUT_NAME_CHANGED, value: value})
// export const userInputEmailChanged = (value) => ({type: USER_INPUT_EMAIL_CHANGED, value: value})
// export const userInputPasswordChanged = (value) => ({type: USER_INPUT_PASSWORD_CHANGED, value: value})
//
//
// const userLoading = (state = {loading: false,}, action) => {
//     let newState;
//     switch (action.type) {
//         case USER_IS_LOADING: {
//
//             return newState = {...state, loading: action.isLoading}
//
//         }
//         default :
//             return state
//
//     }
//
// }
// export const userIsLoading = (bool) => ({type: USER_IS_LOADING, isLoading: bool})
//
// const userAccess ={
//     authorized :false,
//     token : {
//         token:'',
//         user:{
//             role:0
//         }
//     },
//     redirectLink :'/user/profile',
//     redirectToReferer: false,
// }
// const userToken = (state = userAccess, action) => {
//     let newState;
//     switch (action.type) {
//         case USER_HAS_TOKEN: {
//
//             if (typeof window == 'undefined') {
//                 return newState={...state}
//             }
//
//             if(localStorage.getItem('jwt')){
//                 newState ={...state, token : JSON.parse(localStorage.getItem('jwt')),authorized: true,redirectToReferer:true}
//             }else{
//                 return newState={...state}
//             }
//
//             return newState
//
//         }
//         case ADD_USER_TOKEN:{
//             if(typeof window!== "undefined"){
//                 localStorage.setItem('jwt',JSON.stringify(action.token))
//
//             }
//             return newState = {...state}
//         }
//         case REMOVE_USER_TOKEN:{
//             if(typeof window!== "undefined"){
//                 localStorage.removeItem('jwt')
//             }
//             return newState = {...state, redirectLink:'/',token:'',authorized:false}
//         }
//         case REDIRECT_USER :{
//             switch (action.role) {
//                 case 0: newState ={...state, redirectLink: '/admin/profile', redirectToReferer:true}
//                     break
//                 case 1: newState ={...state, redirectLink: '/user/profile', redirectToReferer:true}
//                     break
//                 default: newState ={...state}
//
//             }
//             return newState
//
//         }
//         default :
//             return state
//
//     }
//
// }
// export const userHasToken = () => ({type: USER_HAS_TOKEN})
// export const userRemoveToken = () => ({type: REMOVE_USER_TOKEN})
// export const userAddToken = (token) => ({type: ADD_USER_TOKEN, token})
//
//
//
// const userSuccess = (state = {
//     success: false,
//     successMsg: '',
// }, action) => {
//     let newState;
//     switch (action.type) {
//         case USER_HAS_SUCCESS: {
//             return newState = {...state, success: action.isSuccess, successMsg: action.successMsg}
//         }
//         default :
//             return state
//
//     }
//
// }
// export const userHasSuccess = (bool, successMsg) => ({type: USER_HAS_SUCCESS, isSuccess: bool, successMsg: successMsg})
//
// const userError = (state = {
//     error: false,
//     errorMsg: '',
// }, action) => {
//     let newState;
//     switch (action.type) {
//         case USER_HAS_ERROR: {
//             return newState = {...state, error: action.isError, errorMsg: action.errorMsg}
//         }
//         default :
//             return state
//
//     }
//
// }
// export const userHasError = (bool, errorMsg) => ({type: USER_HAS_ERROR, isError: bool, errorMsg: errorMsg})
//
//
// // export default user
// export default combineReducers({user,userToken, userLoading, userError, userSuccess})


