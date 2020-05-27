import React, {useEffect} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import HomeContainer from "./Home/HomeContainer";
import SignUpContainer from "./SignUp/SignUpContainer";
// import SignInContainer from "./SignIn/SignInContainer";
// import {userHasToken, userInputEmailChanged, userInputPasswordChanged} from "./reducers/user";
// import {signInUser} from "./apiActions";
import {connect} from "react-redux";
import SignInContainer from "./SignIn/SignInContainer";
import {getUserAuth} from "./apiActions";
import ProfileContainer from "./Profile/ProfileContainer";
import PrivateRoute from "./AuthorizedAccess/PrivateRoute";
import AdminProfileContainer from "./Admin/ProfileContainer";
import PrivateAdminRoute from "./AuthorizedAccess/PrivateAdminRoute";
import ShopContainer from "./Shop/ShopContainer";
// import SignIn from "./SignIn/SignIn";
// import ProfileContainer from "./Profile/ProfileContainer";
// import PrivateRoute from "./AuthorizedAccess/PrivateRoute";
// import PrivateAdminRoute from "./AuthorizedAccess/PrivateAdminRoute";
// import AdminProfileContainer from "./Admin/ProfileContainer";




export const Routes =(props)=>{

  useEffect(()=>props.getUserAuth(localStorage.userId,localStorage.jwt),[])
    return(
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={HomeContainer}/>
                <Route path={'/shop'} exact component={ShopContainer}/>
                <Route path={'/signup'} exact component={SignUpContainer}/>
                <Route path={'/signin'}  exact component={SignInContainer}/>
                <PrivateRoute path ='/user/profile' exact component={ProfileContainer}/>
                <PrivateAdminRoute path ='/admin/profile' exact component={AdminProfileContainer}/>
                {/*{props.userToken.token ? <PrivateRoute path ='/user/profile' exact component={ProfileContainer}/> : <Redirect to={'/signin'}/>}*/}

            </Switch>
        </BrowserRouter>
    )
}

const mapStateToProps =(state)=>{
    return{
        user: state.user,

        // products: state.productReducer.products.loadedProducts

    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        // userHasToken:()=>{dispatch(userHasToken())},
        getUserAuth: (id,jwt)=>dispatch(getUserAuth(id,jwt))



    }
}

const RoutesContainer = connect(mapStateToProps,mapDispatchToProps)(Routes)
export default RoutesContainer