import {API} from '../config'


export const createCategory =(userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method : 'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}
export const createManufacturer =(userId,token,manufacturer)=>{
    return fetch(`${API}/manufacturer/create/${userId}`,{
        method : 'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify(manufacturer)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}


export const createProduct =(userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method : 'POST',
        headers:{
            'Accept' : 'application/json',
            // 'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : product
    })
    .then(response=>{
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
export const getManufactures =()=>{
    return fetch(`${API}/manufactures`,{
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

export const getDeliveries =()=>{
    return fetch(`${API}/deliveries`,{
        method : 'GET'        
    })
    .then(response=>{
        console.log(response)
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}
export const getCategoriesAndDeliveries =()=>{
   

    return fetch(`${API}/categories_and_deliveries`,{
        method : 'GET'        
    })
    .then(response=>{
        console.log(response)
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
    
}