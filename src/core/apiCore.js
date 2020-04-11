import {API} from '../config'



export const getProducts =(sortBy)=>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc`,{
        method : 'GET'        
    })
    .then(response=>{
        // console.log(response)
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getCategories =()=>{
    return fetch(`${API}/categories`,{
        method : 'GET'        
    })
    .then(response=>{
        // console.log(response)
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}