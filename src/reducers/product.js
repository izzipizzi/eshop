import {combineReducers} from "redux";
import {loadFilteredProductsFromDB} from "../apiActions";

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const LOAD_FILTERED_PRODUCTS = 'LOAD_FILTERED_PRODUCTS';
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const LOAD_MANUFACTURES = 'LOAD_MANUFACTURES';

const CREATE_PRODUCT = "CREATE_PRODUCT"
const PRODUCTS_IS_LOADING = "PRODUCTS_IS_LOADING"
const PRODUCTS_HAS_ERROR = "PRODUCTS_HAS_ERROR"

const CREATE_MANUFACTURER = "CREATE_MANUFACTURER"
const MANUFACTURES_IS_LOADING = "MANUFACTURES_IS_LOADING"
const MANUFACTURES_HAS_ERROR = "MANUFACTURES_HAS_ERROR"
const HANDLE_CHANGE_MANUFACTURER = "HANDLE_CHANGE_MANUFACTURER"

const CREATE_CATEGORY = "CREATE_CATEGORY"
const REMOVE_CATEGORY = "REMOVE_CATEGORY"
const CATEGORIES_IS_LOADING = "CATEGORIES_IS_LOADING"
const CATEGORIES_HAS_ERROR = "CATEGORIES_HAS_ERROR"
const HANDLE_CHANGE_CATEGORY = "HANDLE_CHANGE_CATEGORY"

const HANDLE_TOGGLE_FILTER = "HANDLE_TOGGLE_FILTER"
const HANDLE_CHANGE_INPUT = "HANDLE_CHANGE_INPUT"


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

    productInput : {
        category : '',
        manufacturer: ''
    },

    category : {},
    categoryId : '',
    categoriesLoading: false,
    categoriesError: false,
    categoriesErrorMsg: '',
    categoriesList: [],

    manufacturer:{},
    manufacturerId : '',
    manufacturesLoading: false,
    manufacturesError: false,
    manufacturesErrorMsg: '',
    manufacturesList: [],


    product :{},
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

            state.filters[action.filterBy] = newCheckedItemId

            return {...state, checkBoxChecked: newCheckedItemId}

        }
        case HANDLE_CHANGE_INPUT:{
            state.productInput[action.name] = action.value
            return {...state }
        }
        case LOAD_FILTERED_PRODUCTS : {
            return {...state, filteredProductList: action.products}
        }

        case LOAD_CATEGORIES: {
            return {...state, categoriesList: action.categories}
        }
        case HANDLE_CHANGE_CATEGORY: {
            return {...state, categoryId : action.categoryId}
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
        case HANDLE_CHANGE_MANUFACTURER: {
            return {...state, manufacturerId : action.manufacturerId}
        }
        case MANUFACTURES_IS_LOADING: {

            return {...state, manufacturesLoading: action.isLoading}

        }
        case MANUFACTURES_HAS_ERROR: {

            return {...state, manufacturesError: action.isError, manufacturesErrorMsg: action.errorMsg}

        }
        case CREATE_CATEGORY :{
            state.categoriesList.push(action.category)
            return {...state,category :action.category}
        }
        case REMOVE_CATEGORY :{
            return state
        }
        case CREATE_MANUFACTURER :{
            state.manufacturesList.push(action.manufacturer)
            return {...state,manufacturer :action.manufacturer}
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

export const createProduct = (product) => ({type: CREATE_PRODUCT, product})
export const productsIsLoading = (bool) => ({type: PRODUCTS_IS_LOADING, isLoading: bool})
export const productsHasError = (bool, errorMsg) => ({type: PRODUCTS_HAS_ERROR, isError: bool, errorMsg})

export const createCategory = (category) => ({type: CREATE_CATEGORY, category})
export const removeCategory = (categoryId) => ({type: REMOVE_CATEGORY,categoryId})
export const categoriesIsLoading = (bool) => ({type: CATEGORIES_IS_LOADING, isLoading: bool})
export const categoriesHasError = (bool, errorMsg) => ({type: CATEGORIES_HAS_ERROR, isError: bool, errorMsg})

export const createManufacturer = (manufacturer) => ({type: CREATE_CATEGORY, manufacturer})
export const manufacturesIsLoading = (bool) => ({type: MANUFACTURES_IS_LOADING, isLoading: bool})
export const manufacturesHasError = (bool, errorMsg) => ({type: MANUFACTURES_HAS_ERROR, isError: bool, errorMsg})


export const handleToggleFilter = (filter, filterBy) => ({type: HANDLE_TOGGLE_FILTER, filter, filterBy})
export const handleChangeInput = (name,value) => ({type: HANDLE_CHANGE_INPUT, name,value})
export const handleChangeCategory = (categoryId) => ({type: HANDLE_CHANGE_CATEGORY, categoryId})
export const handleChangeManufacturer = (manufacturerId) => ({type: HANDLE_CHANGE_MANUFACTURER, manufacturerId})


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

