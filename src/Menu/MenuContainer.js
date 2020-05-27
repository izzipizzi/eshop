// import {userHasToken} from "../reducers/user";
// import {signOutUser} from "../apiActions";
import {connect} from "react-redux";
import Menu from "./Menu";
import {userSignOut} from "../reducers/user";
import {getUserAuth} from "../apiActions";


const mapStateToProps =(state)=>{
    return{

        user: state.user.currentUser


    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        // userHasToken:()=>{dispatch(userHasToken())},
        userSignOut:()=>{dispatch(userSignOut())},
        getUserAuth: (id,jwt)=>dispatch(getUserAuth(id,jwt))


    }
}

const MenuContainer = connect(mapStateToProps,mapDispatchToProps)(Menu)
export default MenuContainer