import Shop from "./Shop";
import {connect} from "react-redux";
import {handleFilters, handleToggleFilter, loadProducts, setCurrentPage} from "../reducers/product";
import {
    loadCategoriesFromDB,
    loadFilteredProductsFromDB,
    loadManufacturesFromDB,
    loadProductsFromDB
} from "../apiActions";



const mapStateToProps =(state)=>{
    return{
        products: state.productsReducer
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        loadProducts: (sortBy,limit)=>dispatch(loadProductsFromDB(sortBy,limit)),
        loadFilteredProducts: (page,limit,filters)=>dispatch(loadFilteredProductsFromDB(page,limit,filters)),
        loadCategories: ()=>dispatch(loadCategoriesFromDB()),
        loadManufactures: ()=>dispatch(loadManufacturesFromDB()),
        handleToggleFilter : (filter,filterBy)=>dispatch(handleToggleFilter(filter,filterBy)),
        setCurrentPage :(page)=>dispatch(setCurrentPage(page))
    }
}

const ShopContainer = connect(mapStateToProps,mapDispatchToProps)(Shop)
export default ShopContainer