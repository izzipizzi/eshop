// import React from 'react'
//
// import{isAuth} from './index'
// import { Route, Redirect } from 'react-router-dom'
//
// const PrivateRoute = ({component :Component, ...rest})=>(
//
//     <Route {...rest} render = {
//         props => isAuth()
//             ? (<Component {...props}/>)
//             : (
//                 <Redirect to = {
//                     {
//                         pathname : '/signin',
//                         state : {
//                             from : props.location
//                         }
//                     }
//                 }
//                 />
//             )
//     }
//     />
// )
//
// export default PrivateRoute

import {Redirect, Route} from "react-router-dom";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getUserAuth} from "../apiActions";
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


const UserRoute = ({user,getUserAuth,component:Component,...rest})=>{
    // useEffect(()=>getUserAuth(localStorage.userId,localStorage.jwt),[])
    // debugger

    return(
        <Route {...rest} render={props => (
            user.role !== undefined ?
                <Component {...props} />
                : <Redirect to="/signin" />
        )} />
    )
}
// debugger

const PrivateRoute = connect(mapStateToProps,mapDispatchToProps)(UserRoute)
export default PrivateRoute
