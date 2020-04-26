import{API} from '../config'

export const signup = (user) =>{

    return fetch(`${API}/signup`,{
        method : 'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const signin = (user) =>{

    return fetch(`${API}/signin`,{
        method : 'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

// закидую токен і юзера в локал сторедж
// next == callback()
export const authenticate =(data,next) =>{
    if(typeof window!== "undefined"){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
  
}

// next == callback()
export const signout = (next)=>{

    if(typeof window!== "undefined"){
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`,{
            method : 'GET'
        })
        .then(res =>{
            console.log('signout',res)
        })
        .catch(err=>{
            console.log('signout',err)
        })
    }

}

export const isAuth = () =>{

    if (typeof window == 'undefined') {
        return false
    }

    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}