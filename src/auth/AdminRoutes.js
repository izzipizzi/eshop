import React,{Component} from 'react'

import{isAuth} from './index'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({component :Component, ...rest})=>(

    <Route {...rest} render = {
        props => isAuth() && isAuth().user.role === 1
        ? (<Component {...props}/>) 
        : (
            <Redirect to = {
                {
                    pathname : '/',
                    state : {
                        from : props.location
                    }

                }
            }
            />
        )
    }
    />
)

export default AdminRoute