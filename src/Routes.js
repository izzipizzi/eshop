import React from 'react'
import{BrowserRouter,Switch,Route} from 'react-router-dom'

import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'

import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'

import PrivateRoute from './auth/PrivateRoutes'
import AdminRoute from './auth/AdminRoutes'


const Routes =()=>{
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/signin' exact component={Signin}/>
                    <Route path='/signup' exact component={Signup}/>
                    <Route path='/' exact component={Home}/>
                    <PrivateRoute path ='/user/dashboard' exact component={Dashboard}/>
                    <AdminRoute path ='/admin/dashboard' exact component={AdminDashboard}/>
                </Switch>
            </BrowserRouter>
            
        </div>
    
    )
}
export default Routes