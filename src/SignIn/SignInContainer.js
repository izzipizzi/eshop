// import {connect} from "react-redux";
// import SignInForm from "./SignInForm";
// import {getUserAuth, signInUser} from "../apiActions";
// // import {signInUser, signUpUser} from "../apiActions";
// // import {userHasToken, userInputEmailChanged, userInputNameChanged, userInputPasswordChanged} from "../reducers/user";
//
//
//
// const mapStateToProps =(state)=>{
//     return{
//         user: state.user.currentUser
//     }
// }
// const mapDispatchToProps = (dispatch)=>{
//     return{
//         // userHasToken:()=>{dispatch(userHasToken())},
//
//         userSignIn: (user)=>dispatch(signInUser(user)),
//         getUserAuth: (id,jwt)=>dispatch(getUserAuth(id,jwt))
//         // userInputEmailChanged : (value) =>dispatch(userInputEmailChanged(value)),
//         // userInputPasswordChanged : (value) =>dispatch(userInputPasswordChanged(value))
//     }
// }
//
// const SignInContainer = connect(mapStateToProps,mapDispatchToProps)(SignInForm)
// export default SignInContainer
import {connect} from "react-redux";
// import SignUp from "./SignUp";
import {signInUser, signUpUser} from "../apiActions";

import SignInForm from "../SignIn/SignInForm";
import React, {Fragment} from "react";
import {userSignIn} from "../reducers/user";
import {Redirect} from "react-router-dom";



const SignInFormContainer =(props)=>{
    const userSignInSubmit = values => {
        // values.preventDefault()
        props.userSignIn(values)
        console.log(values)
    }

    return(
        <Fragment>
            {props.user.role !== undefined ? (<Redirect to={'/'}/>):(<SignInForm onSubmit = {userSignInSubmit}/>)}
        </Fragment>
    )
}
const mapStateToProps =(state)=>{
    return{
        user: state.user.currentUser
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        // userHasToken:()=>{dispatch(userHasToken())},

        userSignIn: (user)=>dispatch(signInUser(user)),
        // getUserAuth: (id,jwt)=>dispatch(getUserAuth(id,jwt))
        // userInputEmailChanged : (value) =>dispatch(userInputEmailChanged(value)),
        // userInputPasswordChanged : (value) =>dispatch(userInputPasswordChanged(value))
    }
}

const SignInContainer = connect(mapStateToProps,mapDispatchToProps)(SignInFormContainer)
export default SignInContainer
// const SigInpContainer = connect(mapStateToProps,mapDispatchToProps)(SignUp)
// export default SignInContainer