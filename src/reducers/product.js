import {combineReducers} from "redux";
import {loadFilteredProductsFromDB} from "../apiActions";

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const LOAD_FILTERED_PRODUCTS = 'LOAD_FILTERED_PRODUCTS';
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const LOAD_MANUFACTURES = 'LOAD_MANUFACTURES';

const PRODUCTS_IS_LOADING = "PRODUCTS_IS_LOADING"
const PRODUCTS_HAS_ERROR = "PRODUCTS_HAS_ERROR"

const MANUFACTURES_IS_LOADING = "MANUFACTURES_IS_LOADING"
const MANUFACTURES_HAS_ERROR = "MANUFACTURES_HAS_ERROR"

const CATEGORIES_IS_LOADING = "CATEGORIES_IS_LOADING"
const CATEGORIES_HAS_ERROR = "CATEGORIES_HAS_ERROR"

const HANDLE_TOGGLE_FILTER = "HANDLE_TOGGLE_FILTER"
const HANDLE_FILTERS = "HANDLE_FILTERS"


// const LOAD_PRODUCTS_BY_SOLD = 'LOAD_PRODUCTS_BY_SOLD';
const productsInitialState = {
    productsList: [],
    filteredProductList: [],
    filters: {
        category: [],
        manufacturer: [],
        price: []
    },

    minPrice: 0,
    maxPrice: 10000000000,
    limit: 6,
    skip: 0,
    size: 0,

    categoriesLoading: false,
    categoriesError: false,
    categoriesErrorMsg: '',
    categoriesList: [],


    manufacturesLoading: false,
    manufacturesError: false,
    manufacturesErrorMsg: '',
    manufacturesList: [],


    checkBoxChecked: [],
    isLoading: false,
    isError: false,
    errorMsg: ''

}
const productsReducer = (state = productsInitialState, action) => {

    switch (action.type) {
        case LOAD_PRODUCTS : {
            return {...state, productsList: action.products}
        }
        case PRODUCTS_IS_LOADING: {

            return {...state, isLoading: action.isLoading}

        }
        case PRODUCTS_HAS_ERROR: {

            return {...state, isError: action.isError, errorMsg: action.errorMsg}

        }
        case HANDLE_TOGGLE_FILTER : {

            const currentItemId = state.checkBoxChecked.indexOf(action.filter)

            const newCheckedItemId = [...state.checkBoxChecked]
            // якщо вибрана категорія не є в стейті то добавляє якщо є то забирає
            if (currentItemId === -1) {
                newCheckedItemId.push(action.filter)

            } else {
                newCheckedItemId.splice(currentItemId, 1)
            }
            // console.log(newCheckedItemId)
            // setChecked(newCheckedCategoryId)
            // filters =>
            // handleFilters(filters,'category')
            const newFilters = {...state.filters}

            newFilters[action.filterBy] = newCheckedItemId

            //laodilteredResult()
            //     loadFilteredProductsFromDB(state.skip,state.limit,newFilters)

            return {...state, checkBoxChecked: newCheckedItemId, filters: newFilters}
            // handleFiltersCategory(newCheckedCategoryId)

            // debugger
            // поветрає перший індекс чекнутої категорії або повертє -1 якщо нічого не вибрано


        }
        case LOAD_FILTERED_PRODUCTS : {
            return {...state, filteredProductList: action.products}
        }

        case LOAD_CATEGORIES: {
            return {...state, categoriesList: action.categories}
        }
        case CATEGORIES_IS_LOADING: {

            return {...state, categoriesLoading: action.isLoading}

        }
        case CATEGORIES_HAS_ERROR: {

            return {...state, categoriesError: action.isError, categoriesErrorMsg: action.errorMsg}

        }
        case LOAD_MANUFACTURES: {
            return {...state, manufacturesList: action.manufactures}
        }
        case MANUFACTURES_IS_LOADING: {

            return {...state, manufacturesLoading: action.isLoading}

        }
        case MANUFACTURES_HAS_ERROR: {

            return {...state, manufacturesError: action.isError, manufacturesErrorMsg: action.errorMsg}

        }
        default : {
            return state
        }

    }
}
export const loadProducts = (products) => ({type: LOAD_PRODUCTS, products})
export const loadFilteredProducts = (products) => ({type: LOAD_FILTERED_PRODUCTS, products})
export const loadCategories = (categories) => ({type: LOAD_CATEGORIES, categories})
export const loadManufactures = (manufactures) => ({type: LOAD_MANUFACTURES, manufactures})

export const productsIsLoading = (bool) => ({type: PRODUCTS_IS_LOADING, isLoading: bool})
export const productsHasError = (bool, errorMsg) => ({type: PRODUCTS_HAS_ERROR, isError: bool, errorMsg})

export const categoriesIsLoading = (bool) => ({type: CATEGORIES_IS_LOADING, isLoading: bool})
export const categoriesHasError = (bool, errorMsg) => ({type: CATEGORIES_HAS_ERROR, isError: bool, errorMsg})

export const manufacturesIsLoading = (bool) => ({type: MANUFACTURES_IS_LOADING, isLoading: bool})
export const manufacturesHasError = (bool, errorMsg) => ({type: MANUFACTURES_HAS_ERROR, isError: bool, errorMsg})


export const handleToggleFilter = (filter, filterBy) => ({type: HANDLE_TOGGLE_FILTER, filter, filterBy})


export default productsReducer

// export default combineReducers({products,productsLoading,productsError})

// import {combineReducers} from "redux";
//
// const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
// // const LOAD_PRODUCTS_BY_SOLD = 'LOAD_PRODUCTS_BY_SOLD';
//
// const products = (state =[],action) =>{
//     let newState = {...state}
//
//     switch (action.type) {
//         case LOAD_PRODUCTS :{
//             return action.products
//         }
//         default :{
//             return state
//         }
//
//     }
// }
// export const loadProducts =(products)=>({type:LOAD_PRODUCTS,products})
//
//
// const PRODUCTS_IS_LOADING = "PRODUCTS_IS_LOADING"
//
// const productsLoading = (state = false,action) =>{
//     switch (action.type) {
//         case PRODUCTS_IS_LOADING:{
//
//             return action.isLoading
//
//         }
//         default: return state
//     }
// }
//
//
// export const productsIsLoading = (bool) =>({type:PRODUCTS_IS_LOADING,isLoading : bool})
//
// const PRODUCTS_HAS_ERROR = "PRODUCTS_HAS_ERROR"
//
// const productsErrorState={
//     isError:false,
//     errorMsg :''
//
// }
// const productsError = (state = productsErrorState,action) =>{
//     switch (action.type) {
//         case PRODUCTS_HAS_ERROR:{
//
//             return {...state,isError: action.isError, errorMsg: action.errorMsg}
//
//         }
//         default: return state
//     }
// }
//
//
// export const productsHasError = (bool,errorMsg) =>({type:PRODUCTS_HAS_ERROR,isError : bool,errorMsg})
//
//
//
// export default combineReducers({products,productsLoading,productsError})

