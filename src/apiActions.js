import {
    userHasError, userIsAuth,
    userIsLoading,
    userSignIn,
    userSignUp
} from "./reducers/user";
import {API} from "./config";
import {
    categoriesHasError,
    categoriesIsLoading, categoryByID,
    createCategory,
    createDelivery,
    createManufacturer,
    createProduct, deliveryByID,
    deliveryHasError,
    deliveryIsLoading,
    loadCategories,
    loadDelivery,
    loadFilteredProducts,
    loadManufactures,
    loadProducts, manufacturerByID,
    manufacturesHasError,
    manufacturesIsLoading, productByID,
    productsHasError,
    productsIsLoading, productsSize,
} from "./reducers/product";


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
export const loadFilteredProductsFromDB = (page, limit ,filters) => {
    return ((dispatch) => {
        const data ={limit,page,filters}
        dispatch(productsIsLoading(true))
        fetch(`${API}/products/by/search`, {
            method: 'POST', mode: 'cors',
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)

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
                    dispatch(loadFilteredProducts(products.data))
                    dispatch(productsSize(products.size,products.totalSize))
                }
            })
            .catch(error => {
                dispatch(productsHasError(true,error))
            })


    })

}
export const loadCategoriesFromDB = () => {
    return ((dispatch) => {
        dispatch(categoriesIsLoading(true))
        fetch(`${API}/categories`, {
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
                dispatch(categoriesIsLoading(false))
                return response
            })
            .then(response => response.json())
            .then(categories => {
                if (categories.msg){
                    dispatch(categoriesHasError(true,categories.msg))
                }else {
                    dispatch(loadCategories(categories))

                }
            })
            .catch(error => {
                dispatch(categoriesHasError(true,error))
            })


    })

}
export const loadManufacturesFromDB = () => {
    return ((dispatch) => {
        dispatch(manufacturesIsLoading(true))
        fetch(`${API}/manufactures`, {
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
                dispatch(manufacturesIsLoading(false))
                return response
            })
            .then(response => response.json())
            .then(manufactures => {
                if (manufactures.msg){
                    dispatch(manufacturesHasError(true,manufactures.msg))
                }else {
                    dispatch(loadManufactures(manufactures))

                }
            })
            .catch(error => {
                dispatch(manufacturesHasError(true,error))
            })


    })

}
export const loadDeliveryFromDB = () => {
    return ((dispatch) => {
        dispatch(deliveryIsLoading(true))
        fetch(`${API}/deliveries`, {
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
                dispatch(deliveryIsLoading(false))
                return response
            })
            .then(response => response.json())
            .then(deliveries => {
                if (deliveries.msg){
                    dispatch(deliveryHasError(true,deliveries.msg))
                }else {
                    dispatch(loadDelivery(deliveries))

                }
            })
            .catch(error => {
                dispatch(deliveryHasError(true,error))
            })


    })

}


export const addCategory = (category) => {
    return ((dispatch) => {
        // debugger

        dispatch(categoriesIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(categoriesHasError(true,'У вас немає прав')) :
        fetch(`${API}/category/create/${userId}`, {
            method: 'POST', mode: 'cors',
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
            .then(response => {

                if (!response.ok) {
                    console.log(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(data => {
                dispatch(categoriesIsLoading(false))

                if (data.error) {
                        dispatch(categoriesHasError(true, data.error))
                    } else {
                        dispatch(categoriesHasError(false, ''))
                        dispatch(createCategory(data.data))
                        }

                }
            )

            .catch(error => {
                dispatch(categoriesHasError(true),error)
            })


    })

}
export const updateCategory = (id,name) => {
    return ((dispatch) => {
        // debugger

        dispatch(categoriesIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(categoriesHasError(true,'У вас немає прав')) :
        fetch(`${API}/category/${id}/${userId}`, {
            method: 'PUT', mode: 'cors',
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({name})
        })
            .then(response => {

                if (!response.ok) {
                    console.log(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(data => {
                dispatch(categoriesIsLoading(false))

                if (data.error) {
                        dispatch(categoriesHasError(true, data.error))
                    } else {
                        dispatch(categoriesHasError(false, ''))
                        // dispatch(createCategory(data.data))
                        dispatch(loadCategoriesFromDB())
                }

                }
            )

            .catch(error => {
                dispatch(categoriesHasError(true),error)
            })


    })

}
export const deleteCategory = (categoryId) => {
    return ((dispatch) => {
        // debugger

        dispatch(categoriesIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(categoriesHasError(true,'У вас немає прав')) :
        fetch(`${API}/category/${categoryId}/${userId}`, {
            method: 'DELETE', mode: 'cors',
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
        })
            .then(response => {

                if (!response.ok) {
                    console.log(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(data => {
                dispatch(categoriesIsLoading(false))

                if (data.error) {
                        dispatch(categoriesHasError(true, data.error))
                    } else {
                        dispatch(categoriesHasError(false, ''))
                        dispatch(loadCategoriesFromDB())
                    //dispatch(removeCategory())



                    }

                }
            )

            .catch(error => {
                dispatch(categoriesHasError(true),error)
            })


    })

}
export const loadCategoryById = (id) => {
    return ((dispatch) => {
        // dispatch(categoriesIsLoading(true))
        fetch(`${API}/category/${id}`, {
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
                // dispatch(categoriesIsLoading(false))
                return response
            })
            .then(response => response.json())
            .then(categories => {
                if (categories.msg){
                    dispatch(categoriesHasError(true,categories.msg))
                }else {
                    dispatch(categoryByID(categories))

                }
            })
            .catch(error => {
                dispatch(categoriesHasError(true,error))
            })


    })

}

export const addManufacturer = (manufacturer) => {
    return ((dispatch) => {
        // debugger

        dispatch(manufacturesIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(categoriesHasError(true,'У вас немає прав')) :
            fetch(`${API}/manufacturer/create/${userId}`, {
                method: 'POST', mode: 'cors',
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(manufacturer)
            })
                .then(response => {

                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                        dispatch(manufacturesIsLoading(false))

                        if (data.error) {
                            dispatch(manufacturesHasError(true, data.error))
                        } else {
                            dispatch(manufacturesHasError(false, ''))
                            dispatch(createManufacturer(data.data))
                        }

                    }
                )

                .catch(error => {
                    dispatch(manufacturesHasError(true),error)
                })


    })

}
export const updateManufacturer = (id,name) => {
    return ((dispatch) => {
        // debugger

        dispatch(manufacturesIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(manufacturesHasError(true,'У вас немає прав')) :
            fetch(`${API}/manufacturer/${id}/${userId}`, {
                method: 'PUT', mode: 'cors',
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({name})
            })
                .then(response => {

                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                        dispatch(manufacturesIsLoading(false))

                        if (data.error) {
                            dispatch(manufacturesHasError(true, data.error))
                        } else {
                            dispatch(manufacturesHasError(false, ''))
                            // dispatch(createCategory(data.data))
                            dispatch(loadManufacturesFromDB())
                        }

                    }
                )

                .catch(error => {
                    dispatch(manufacturesHasError(true),error)
                })


    })

}
export const deleteManufacturer = (manufacturerId) => {
    return ((dispatch) => {
        dispatch(manufacturesIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(manufacturesHasError(true,'У вас немає прав')) :
            fetch(`${API}/manufacturer/${manufacturerId}/${userId}`, {
                method: 'DELETE', mode: 'cors',
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
            })
                .then(response => {

                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                        dispatch(manufacturesIsLoading(false))

                        if (data.error) {
                            dispatch(manufacturesHasError(true, data.error))
                        } else {
                            dispatch(manufacturesHasError(false, ''))
                            dispatch(loadManufacturesFromDB())
                        }

                    }
                )

                .catch(error => {
                    dispatch(manufacturesHasError(true),error)
                })


    })

}
export const loadManufacturerById = (id) => {
    return ((dispatch) => {
        // dispatch(categoriesIsLoading(true))
        fetch(`${API}/manufacturer/${id}`, {
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
                // dispatch(categoriesIsLoading(false))
                return response
            })
            .then(response => response.json())
            .then(manufacturer => {
                if (manufacturer.msg){
                    dispatch(manufacturesHasError(true,manufacturer.msg))
                }else {
                    dispatch(manufacturerByID(manufacturer))

                }
            })
            .catch(error => {
                dispatch(manufacturesHasError(true,error))
            })


    })

}


export const addDelivery = (delivery) => {
    return ((dispatch) => {
        // debugger

        dispatch(deliveryIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(deliveryHasError(true,'У вас немає прав')) :
            fetch(`${API}/delivery/create/${userId}`, {
                method: 'POST', mode: 'cors',
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(delivery)
            })
                .then(response => {

                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                        dispatch(deliveryIsLoading(false))

                        if (data.error) {
                            dispatch(deliveryHasError(true, data.error))
                        } else {
                            dispatch(deliveryHasError(false, ''))
                            dispatch(createDelivery(data.data))
                        }

                    }
                )

                .catch(error => {
                    dispatch(deliveryHasError(true),error)
                })


    })

}
export const updateDelivery = (id,name) => {
    return ((dispatch) => {
        // debugger

        dispatch(deliveryIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(deliveryHasError(true,'У вас немає прав')) :
            fetch(`${API}/delivery/${id}/${userId}`, {
                method: 'PUT', mode: 'cors',
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({name})
            })
                .then(response => {

                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                        dispatch(deliveryIsLoading(false))

                        if (data.error) {
                            dispatch(deliveryHasError(true, data.error))
                        } else {
                            dispatch(deliveryHasError(false, ''))
                            // dispatch(createCategory(data.data))
                            dispatch(loadDeliveryFromDB())
                        }

                    }
                )

                .catch(error => {
                    dispatch(deliveryHasError(true),error)
                })


    })

}
export const deleteDelivery = (deliveryId) => {
    return ((dispatch) => {
        dispatch(deliveryIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(deliveryHasError(true,'У вас немає прав')) :
            fetch(`${API}/delivery/${deliveryId}/${userId}`, {
                method: 'DELETE', mode: 'cors',
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
            })
                .then(response => {

                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                        dispatch(deliveryIsLoading(false))

                        if (data.error) {
                            dispatch(deliveryHasError(true, data.error))
                        } else {
                            dispatch(deliveryHasError(false, ''))
                            dispatch(loadDeliveryFromDB())
                        }

                    }
                )

                .catch(error => {
                    dispatch(deliveryHasError(true),error)
                })


    })

}
export const loadDeliveryById = (id) => {
    return ((dispatch) => {
        // dispatch(categoriesIsLoading(true))
        fetch(`${API}/delivery/${id}`, {
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
                // dispatch(categoriesIsLoading(false))
                return response
            })
            .then(response => response.json())
            .then(delivery => {
                if (delivery.msg){
                    dispatch(deliveryHasError(true,delivery.msg))
                }else {
                    dispatch(deliveryByID(delivery))

                }
            })
            .catch(error => {
                dispatch(deliveryHasError(true,error))
            })


    })

}

export const addProduct = (product) => {
    return ((dispatch) => {
        // debugger

        dispatch(productsIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(productsHasError(true,'У вас немає прав')) :
            fetch(`${API}/product/create/${userId}`, {
                method: 'POST', mode: 'cors',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: product
                // body: JSON.stringify(product)
            })
                .then(response => {

                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                        dispatch(productsIsLoading(false))

                        if (data.error) {
                            dispatch(productsHasError(true, data.error))
                        } else {
                            dispatch(productsHasError(false, ''))
                            dispatch(createProduct(data.data))
                            // dispatch(loadProductsFromDB())
                        }

                    }
                )

                .catch(error => {
                    dispatch(productsHasError(true),error)
                })


    })

}
export const updateProduct = (id,product) => {
    return ((dispatch) => {
        // debugger

        dispatch(productsIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(productsHasError(true,'У вас немає прав')) :
            fetch(`${API}/product/${id}/${userId}`, {
                method: 'PUT', mode: 'cors',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: product
            })
                .then(response => {

                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                        dispatch(productsIsLoading(false))

                        if (data.error) {
                            dispatch(productsHasError(true, data.error))
                        } else {
                            dispatch(productsHasError(false, ''))
                            // dispatch(createCategory(data.data))
                            dispatch(loadProductsFromDB())
                        }

                    }
                )

                .catch(error => {
                    dispatch(productsHasError(true),error)
                })


    })

}
export const deleteProduct = (productId) => {
    return ((dispatch) => {
        dispatch(productsIsLoading(true))
        const userId =localStorage.getItem('userId')
        const token =localStorage.getItem('jwt')
        !userId || !token ? dispatch(productsHasError(true,'У вас немає прав')) :
            fetch(`${API}/product/${productId}/${userId}`, {
                method: 'DELETE', mode: 'cors',
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
            })
                .then(response => {

                    if (!response.ok) {
                        console.log(response.statusText)
                    }
                    return response
                })
                .then(response => response.json())
                .then(data => {
                        dispatch(productsHasError(false))

                        if (data.error) {
                            dispatch(productsHasError(true, data.error))
                        } else {
                            dispatch(productsHasError(false, ''))
                            dispatch(loadProductsFromDB('createdAt',100))
                        }

                    }
                )

                .catch(error => {
                    dispatch(productsHasError(true),error)
                })


    })

}
export const loadProductById = (id) => {
    return ((dispatch) => {
        // dispatch(categoriesIsLoading(true))
        fetch(`${API}/product/${id}`, {
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
                // dispatch(categoriesIsLoading(false))
                return response
            })
            .then(response => response.json())
            .then(product => {
                if (product.msg){
                    dispatch(productsHasError(true,product.msg))
                }else {
                    dispatch(productByID(product))

                }
            })
            .catch(error => {
                dispatch(productsHasError(true,error))
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

