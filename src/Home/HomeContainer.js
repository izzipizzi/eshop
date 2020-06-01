import Home from "./Home";
import {connect} from "react-redux";
import {loadProducts} from "../reducers/product";
import {loadProductsFromDB} from "../apiActions";



const mapStateToProps =(state)=>{
    return{
        products: state.productsReducer
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        loadProducts: (sortBy,limit)=>dispatch(loadProductsFromDB(sortBy,limit))
    }
}

const HomeContainer = connect(mapStateToProps,mapDispatchToProps)(Home)
export default HomeContainer