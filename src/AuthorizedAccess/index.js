import {API} from '../config'
import {loadProducts, productsHasError, productsIsLoading} from "../reducers/product";
import {userHasError, userHasSuccess, userIsLoading, userSignUp} from "../reducers/user";

// export const signup = (user) =>{
//
//     return fetch(`${API}/signup`,{
//         method : 'POST',
//         headers:{
//             'Accept' : 'application/json',
//             'Content-Type' : 'application/json',
//         },
//         body : JSON.stringify(user)
//     })
//         .then(response=>{
//             return response.json()
//         })
//         .catch(error=>{
//             console.log(error)
//         })
// }

// export const signUpUser = (user) => {
//     return ((dispatch) => {
//         // debugger
//
//         dispatch(userIsLoading(true))
//         fetch(`${API}/signup`, {
//             method: 'POST', mode: 'cors',
//             headers: {
//                 "access-control-allow-origin": "*",
//                 "Content-type": "application/json; charset=UTF-8",
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify(user)
//         })
//             .then(response => {
//
//                 if (!response.ok) {
//                     console.log(response.statusText)
//                 }
//                 dispatch(userIsLoading(false))
//                 return response
//             })
//             .then(response => response.json())
//             .then(data => {
//                     if (data.error) {
//                         dispatch(userHasError(true, data.error))
//                     } else {
//                         dispatch(userHasSuccess(true,data.successMsg))
//                         dispatch(userHasError(false,''))
//                         dispatch(userSignUp(data.user))
//                     }
//
//                 }
//             )
//
//             .catch(error => {
//                 dispatch(userHasError(true))
//             })
//
//
//     })
//
// }

// export const signin = (user) => {
//
//     return fetch(`${API}/signin`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user)
//     })
//         .then(response => {
//             return response.json()
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }

// закидую токен і юзера в локал сторедж
// next == callback()
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }

}

// next == callback()
export const signout = (next) => {

    if (typeof window !== "undefined") {
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(res => {
                console.log('signout', res)
            })
            .catch(err => {
                console.log('signout', err)
            })
    }

}

export const isAuth = () => {

    if (typeof window == 'undefined') {
        return false
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}