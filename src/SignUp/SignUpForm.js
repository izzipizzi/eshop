import React from "react";
import {Field, reduxForm} from "redux-form";
import Container from "../Container";

let SignUpForm = (props) => {
    return (
        <Container className='container'>
            <div className={'container-form'}>
                <form onSubmit={props.handleSubmit}>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Username"
                    />
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email"
                    />
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        placeholder="Password"
                    />
                    <button type={'submit'}> SignUp</button>
                </form>
            </div>

        </Container>


    )
}

SignUpForm = reduxForm({
    form: "signForm"
})(SignUpForm)
export default SignUpForm
// SignUpForm = reduxForm({
//     form: "signup"
// })(SignUpForm)
// export default SignUpForm