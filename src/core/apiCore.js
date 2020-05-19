import {API} from '../config'



export const getProducts =(sortBy,limit)=>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=${limit}`,{
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

export const getRandomProduct =()=>{
    return fetch(`${API}/random/product`,{
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
export const getManufacturerRelatedProduct = (id)=>{

    return fetch(`${API}/products/manufacturer/related/${id}`,{
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
export const getMinPrice =()=>{
    return fetch(`${API}/products/min_price`,{
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
export const getMaxPrice =()=>{
    return fetch(`${API}/products/max_price`,{
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

export const getFilteredProducts = (skip,limit,filters = {}) =>{
    const data ={
        limit,skip,filters
    }
    return(
        fetch(`${API}/products/by/search`,{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
        .then(response => {

            return response.json()
        })
        .catch(err=>{
            console.log(err)
        })
    )

}