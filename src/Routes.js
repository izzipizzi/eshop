import React from 'react'
import{BrowserRouter,Switch,Route} from 'react-router-dom'

import Signup from './core/Signup'
import Signin from './core/Signin'
import Home from './core/Home'
// import Shop from './core/Shop'

import Dashboard from './core/user/UserDashBoard'
import AdminDashboard from './core/user/AdminDashboard'

 import PrivateRoute from './auth/PrivateRoutes'
import AdminRoute from './auth/AdminRoutes'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'


const Routes =()=>{
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/signin' exact component={Signin}/>
                    <Route path='/signup' exact component={Signup}/>
                    <Route path='/' exact component={Home}/>
                    {/* <Route path='/devices' exact component={Devices}/>
                    <Route path='/' exact component={Shop}/> */}
                    <PrivateRoute path ='/user/dashboard' exact component={Dashboard}/>
                    <AdminRoute path ='/admin/dashboard' exact component={AdminDashboard}/>
                    <AdminRoute path ='/сreate/category' exact component={AddCategory}/>
                    <AdminRoute path ='/сreate/product' exact component={AddProduct}/>
                </Switch>
            </BrowserRouter>
            
        </div>
    
    )
}
export default Routes