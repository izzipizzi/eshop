import {
    userHasError, userIsAuth,
    userIsLoading,
    userSignIn,
    userSignUp
} from "./reducers/user";
import {API} from "./config";
import {loadProducts, productsHasError, productsIsLoading} from "./reducers/product";


export const loadProductsFromDB = (sortBy = 'sold', limit = 20) => {
    return ((dispatch) => {
        dispatch(productsIsLoading(true))
        fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=${limit}`, {
            method: 'GET', mode: 'cors',
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response.statusText)
                }
                dispatch(productsIsLoading(false))
                return response
            })
            .then(response => response.json())
            .then(products => {
                if (products.msg){
                    dispatch(productsHasError(true,products.msg))
                }else {
                    dispatch(loadProducts(products))

                }
            })
            .catch(error => {
                dispatch(productsHasError(true,error))
            })


    })

}

export const signUpUser = (user) => {
    return ((dispatch) => {
        // debugger

        dispatch(userIsLoading(true))
        fetch(`${API}/signup`, {
            method: 'POST', mode: 'cors',
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {

                if (!response.ok) {
                    console.log(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(data => {
                dispatch(userIsLoading(false))

                if (data.error) {
                        dispatch(userHasError(true, data.error))
                    } else {
                        dispatch(userHasError(false, ''))
                        dispatch(userSignUp(data.user))


                    }

                }
            )

            .catch(error => {
                dispatch(userHasError(true),error)
            })


    })

}

export const signInUser = (user) => {

    return (dispatch) => {
        dispatch(userIsLoading(true))
        fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(data => {
                dispatch(userIsLoading(false))

                if (data.error) {
                    dispatch(userHasError(true, data.error))
                } else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("userId", data.user._id)

                    dispatch(userSignIn(data.user))
                    dispatch(userHasError(false, ''))

                }
            })
    }
}
export const getUserAuth = (id,jwt) => {
    return (dispatch) => {
        dispatch(userIsLoading(true))
        // const id = localStorage.userId
        // const jwt = localStorage.jwt
        if (id && jwt) {
            fetch(`${API}/user/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                // body: JSON.stringify(user)
            })
                .then(response => {
                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                    dispatch(userIsLoading(false))

                    if (data.err) {
                        dispatch(userHasError(true, data.error))
                        localStorage.removeItem('jwt')
                        localStorage.removeItem('userId')
                    } else {
                        // dispatch(userSignIn(data))
                        dispatch(userIsAuth(data))

                        dispatch(userHasError(false, ''))

                    }
                })

        }

    }
}
//
// export const signOutUser = () =>{
//     return(dispatch=>{
//
//         //     next()
//         fetch(`${API}/signout`,{
//              method : 'GET'
//             })
//             .then(response =>{
//                     // console.log('signout',res)
//                 dispatch(userHasSuccess(true,response.msg))
//                 dispatch(userRemoveToken())
//                 dispatch(userHasToken())
//
//             })
//             .catch(error=>{
//                     // console.log('signout',)
//                 dispatch(userHasError(true,error))
//             })
//
//     })
//
// }
