// import {userHasToken, userInputEmailChanged, userInputPasswordChanged, userSignOut} from "../reducers/user";
// import {signInUser, signOutUser} from "../apiActions";
import {connect} from "react-redux";
import Profile from "./AdminProfile";
import AdminProfile from "./AdminProfile";

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

const AdminProfileContainer = connect(mapStateToProps,mapDispatchToProps)(AdminProfile)
export default AdminProfileContainer