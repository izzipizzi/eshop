import React, {Component, useEffect} from 'react'

// import{isAuth} from './index'
import { Route, Redirect } from 'react-router-dom'
import {connect} from "react-redux";
import {getUserAuth} from "../apiActions";
// import {userHasToken} from "../reducers/user";


const mapStateToProps =(state)=>{
    return{
        user: state.user.currentUser


    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        getUserAuth: (id,jwt)=>dispatch(getUserAuth(id,jwt))
    }
}

const AdminRoute = ({user,getUserAuth,component :Component, ...rest})=>{
    // useEffect(()=>{
    //     getUserToken()
    // },[])
    // getUserToken()
    return(

        //йде первірка на адміна

        <Route {...rest} render = {
        props => user.role && user.role === 1
            ? (<Component {...props}/>)
            : (
                <Redirect to = {'/'}
                />
            )
    }
    />
)
}
const PrivateAdminRoute = connect(mapStateToProps,mapDispatchToProps)(AdminRoute)

export default PrivateAdminRoute