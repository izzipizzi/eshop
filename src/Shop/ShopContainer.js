import Shop from "./Shop";
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

const ShopContainer = connect(mapStateToProps,mapDispatchToProps)(Shop)
export default ShopContainer