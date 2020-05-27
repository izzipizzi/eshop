import {combineReducers} from "redux";

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const PRODUCTS_IS_LOADING = "PRODUCTS_IS_LOADING"
const PRODUCTS_HAS_ERROR = "PRODUCTS_HAS_ERROR"


// const LOAD_PRODUCTS_BY_SOLD = 'LOAD_PRODUCTS_BY_SOLD';
const productsInitialState ={
    productsList: [{"sold":0,"_id":"5eba4c35e7e29742c03f3905","name":"Iphone 11 Pro Max 256Gb","description":"Екран (6.5\", OLED (Super Retina XDR), 2688x1242) / Apple A13 Bionic / основна потрійна камера: 12 Мп + 12 Мп + 12 Мп, фронтальна камера: 12 Мп / RAM 4 ГБ / 256 ГБ вбудованої пам'яті / 3G / LTE / GPS / ГЛОНАСС / Nano-SIM / iOS 1","price":40000,"shipping":{"_id":"5ea4453ad661b9569016e017","name":"Justin","createdAt":"2020-04-25T14:12:10.729Z","updatedAt":"2020-04-25T14:12:10.729Z","__v":0},"category":{"_id":"5eba4b7de7e29742c03f38ff","name":"Cмартфони","createdAt":"2020-05-12T07:08:45.463Z","updatedAt":"2020-05-12T07:08:45.463Z","__v":0},"manufacturer":{"_id":"5eb942c29917854d14ec6f04","name":"Apple","createdAt":"2020-05-11T12:19:14.143Z","updatedAt":"2020-05-11T12:19:14.143Z","__v":0},"quantity":100,"createdAt":"2020-05-12T07:11:49.820Z","updatedAt":"2020-05-12T07:11:49.820Z","__v":0},{"sold":0,"_id":"5eba4ca6e7e29742c03f3906","name":"Iphone 7 32Gb","description":"Екран (4.7\", IPS, 1334x750)/ Apple A10 Fusion/ основна камера: 12 Мп, фронтальна камера: 7 Мп/ RAM 2 ГБ/ 32 ГБ вбудованої пам'яті/ 3G/ LTE/ GPS/ Nano-SIM/ iOS 10","price":10500,"shipping":{"_id":"5ea4453ad661b9569016e017","name":"Justin","createdAt":"2020-04-25T14:12:10.729Z","updatedAt":"2020-04-25T14:12:10.729Z","__v":0},"category":{"_id":"5eba4b7de7e29742c03f38ff","name":"Cмартфони","createdAt":"2020-05-12T07:08:45.463Z","updatedAt":"2020-05-12T07:08:45.463Z","__v":0},"manufacturer":{"_id":"5eb942c29917854d14ec6f04","name":"Apple","createdAt":"2020-05-11T12:19:14.143Z","updatedAt":"2020-05-11T12:19:14.143Z","__v":0},"quantity":200,"createdAt":"2020-05-12T07:13:42.812Z","updatedAt":"2020-05-12T07:13:42.812Z","__v":0},{"sold":0,"_id":"5eba4d19e7e29742c03f3907","name":"Iphone SE 2020","description":"Екран (4.7\", IPS, 1334x750) / Apple A13 Bionic / основна камера: 12 Мп, фронтальна камера: 7 Мп / 64 ГБ вбудованої пам'яті / 3G / LTE / GPS / Nano-SIM / iOS 13","price":15000,"shipping":{"_id":"5ea50ee2e497761658b3403b","name":"Нова Пошта","createdAt":"2020-04-26T04:32:34.228Z","updatedAt":"2020-04-26T04:32:34.228Z","__v":0},"category":{"_id":"5eba4b7de7e29742c03f38ff","name":"Cмартфони","createdAt":"2020-05-12T07:08:45.463Z","updatedAt":"2020-05-12T07:08:45.463Z","__v":0},"manufacturer":{"_id":"5eb942c29917854d14ec6f04","name":"Apple","createdAt":"2020-05-11T12:19:14.143Z","updatedAt":"2020-05-11T12:19:14.143Z","__v":0},"quantity":300,"createdAt":"2020-05-12T07:15:37.876Z","updatedAt":"2020-05-12T07:15:37.876Z","__v":0},{"sold":0,"_id":"5eba4dbfe7e29742c03f3908","name":"Iphone Xr 64 Gb","description":"\nЕкран (6.1\", IPS, 1792x828) / Apple A12 Bionic / основна камера: 12 Мп, фронтальна камера: 7 Мп / RAM 3 ГБ / 64 ГБ вбудованої пам'яті / 3G / LTE / GPS / Nano-SIM / iOS 12","price":18500,"shipping":{"_id":"5ea4453ad661b9569016e017","name":"Justin","createdAt":"2020-04-25T14:12:10.729Z","updatedAt":"2020-04-25T14:12:10.729Z","__v":0},"category":{"_id":"5eba4b7de7e29742c03f38ff","name":"Cмартфони","createdAt":"2020-05-12T07:08:45.463Z","updatedAt":"2020-05-12T07:08:45.463Z","__v":0},"manufacturer":{"_id":"5eb942c29917854d14ec6f04","name":"Apple","createdAt":"2020-05-11T12:19:14.143Z","updatedAt":"2020-05-11T12:19:14.143Z","__v":0},"quantity":300,"createdAt":"2020-05-12T07:18:23.678Z","updatedAt":"2020-05-12T07:18:23.678Z","__v":0},{"sold":0,"_id":"5eba4e50e7e29742c03f3909","name":"Iphone 11 128","description":"Екран (6.1\", IPS (Liquid Retina HD), 1792x828) / Apple A13 Bionic / основна подвійна камера: 12 Мп + 12 Мп, фронтальна камера: 12 Мп / RAM 4 ГБ / 128 ГБ вбудованої пам'яті / 3G / LTE / GPS / ГЛОНАСС / Nano-SIM / iOS 13 / 3046 мА*год","price":25000,"shipping":{"_id":"5ea4453ad661b9569016e017","name":"Justin","createdAt":"2020-04-25T14:12:10.729Z","updatedAt":"2020-04-25T14:12:10.729Z","__v":0},"category":{"_id":"5eba4b7de7e29742c03f38ff","name":"Cмартфони","createdAt":"2020-05-12T07:08:45.463Z","updatedAt":"2020-05-12T07:08:45.463Z","__v":0},"manufacturer":{"_id":"5eb942c29917854d14ec6f04","name":"Apple","createdAt":"2020-05-11T12:19:14.143Z","updatedAt":"2020-05-11T12:19:14.143Z","__v":0},"quantity":400,"createdAt":"2020-05-12T07:20:48.102Z","updatedAt":"2020-05-12T07:20:48.102Z","__v":0},{"sold":0,"_id":"5eba4ef4e7e29742c03f390a","name":"AirPods 2","description":"Збільшений час роботи в режимі телефонної розмови. Активація Siri голосом. AirPods — унікальні бездротові навушники. Вони пасуватимуть до всіх ваших пристроїв. Дістаньте їх із футляра, і відразу можете користуватися. Просто надіньте їх, і вони миттєво встановлять з'єднання, а, отже, ви зможете відразу зануритися в насичений якісний звук. Немов за помахом чарівної палички.","price":5000,"shipping":{"_id":"5ea4453ad661b9569016e017","name":"Justin","createdAt":"2020-04-25T14:12:10.729Z","updatedAt":"2020-04-25T14:12:10.729Z","__v":0},"category":{"_id":"5eba4b99e7e29742c03f3902","name":"Безпровідні навушники","createdAt":"2020-05-12T07:09:13.477Z","updatedAt":"2020-05-12T07:09:13.477Z","__v":0},"manufacturer":{"_id":"5eb942c29917854d14ec6f04","name":"Apple","createdAt":"2020-05-11T12:19:14.143Z","updatedAt":"2020-05-11T12:19:14.143Z","__v":0},"quantity":1000,"createdAt":"2020-05-12T07:23:32.641Z","updatedAt":"2020-05-12T07:23:32.641Z","__v":0}],
    isLoading: false,
    isError:false,
    errorMsg :''

}
const productsReducer = (state =productsInitialState,action) =>{

    switch (action.type) {
        case LOAD_PRODUCTS :{
            return {...state, productsList:action.products}
        }
        case PRODUCTS_IS_LOADING:{

            return {...state, isLoading:action.isLoading}

        }
        case PRODUCTS_HAS_ERROR:{

            return {...state,isError: action.isError, errorMsg: action.errorMsg}

        }
        default :{
            return state
        }

    }
}
export const loadProducts =(products)=>({type:LOAD_PRODUCTS,products})
export const productsIsLoading = (bool) =>({type:PRODUCTS_IS_LOADING,isLoading : bool})
export const productsHasError = (bool,errorMsg) =>({type:PRODUCTS_HAS_ERROR,isError : bool,errorMsg})


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

