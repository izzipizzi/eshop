import {connect} from "react-redux";
import {signUpUser} from "../apiActions";
import React, {Fragment} from "react";
import {Redirect} from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "../SignIn/SignInForm";



const SignUpFormContainer =(props)=>{
    const userSignUpSubmit = values => {
        props.userSignUp(values)
    }

    return(
        <Fragment>
            {props.user.role !== undefined ? (<Redirect to={'/'}/>):(<SignUpForm onSubmit = {userSignUpSubmit}/>)}
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
        userSignUp: (user)=>dispatch(signUpUser(user)),
    }
}

const SignUpContainer = connect(mapStateToProps,mapDispatchToProps)(SignUpFormContainer)
export default SignUpContainer
