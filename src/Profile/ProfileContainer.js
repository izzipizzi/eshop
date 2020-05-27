// import {userHasToken, userInputEmailChanged, userInputPasswordChanged, userSignOut} from "../reducers/user";
// import {signInUser, signOutUser} from "../apiActions";
import {connect} from "react-redux";
import Profile from "./Profile";




const mapStateToProps =(state)=>{

    return{
        user: state.user.currentUser


        // products: state.productReducer.products.loadedProducts

    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        // userHasToken:()=>{dispatch(userHasToken())},

    }
}

const ProfileContainer = connect(mapStateToProps,mapDispatchToProps)(Profile)
export default ProfileContainer