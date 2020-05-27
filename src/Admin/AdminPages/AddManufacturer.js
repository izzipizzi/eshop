// import {connect} from "react-redux";
// import Container from "../../Container";
// import React, {Fragment, useEffect} from "react";
// import {Field, reduxForm} from "redux-form";
// import {Redirect} from "react-router-dom";
// import SignInForm from "../../SignIn/SignInForm";
// import {addCategory, loadCategoriesFromDB} from "../../apiActions";
// import {handleChangeCategory, handleChangeInput} from "../../reducers/product";
//
// let AddCategory =(props)=>{
//
//     useEffect(()=>{
//         props.loadCategories()
//     },[])
//
//     const handleChangeForSelect =(e) =>{
//         props.handleChange(e.target.value)
//     }
//     const handleChange =name => event =>{
//         // props.createCategory(e.target.value)
//         props.handleChangeInput(name,event.target.value)
//     }
//     const handleSubmit =(e) =>{
//         props.createCategory(e.target.value)
//         // props.handleChangeInput(name,e.target.value)
//     }
//
//     const loadCategoriesSelector = ()=>{
//         return(
//             <select onChange={handleChangeForSelect}>
//                 {props.products.categoriesList.map((category)=>{
//                     return <option key={category._id} value={category._id}>{category.name}</option>
//                 })}
//             </select>
//         )
//     }
//     return(
//         <Container className={'container'}>
//             {props.products.categoriesLoading ? (<p>Loading....</p>) :
//                 (props.products.categoriesError ? (<p>{props.products.categoriesErrorMsg}</p>) : loadCategoriesSelector())}
//             <form onSubmit={handleSubmit}>
//                 <label>Назва категорії</label>
//                 <input name="name"
//                        type="name"
//                        value ={props.products.productInput.category}
//                        placeholder="Назва категорії"
//                 onChange={handleChange('category')}/>
//                 <button type={'submit'} > Добавити</button>
//
//             </form>
//         </Container>
//     )
// }
//  AddCategory = reduxForm({
//     form: 'addCategoryForm'
// })(AddCategory)
//
// const mapStateToProps = (state) =>{
//     return(
//         {
//             products: state.productsReducer,
//             user: state.user.currentUser
//
//         }
//     )
// }
// const mapDispatchToProps =(dispatch) =>{
//     return(
//         {
//             createCategory:(category)=>dispatch(addCategory(category)),
//             loadCategories: ()=>dispatch(loadCategoriesFromDB()),
//             handleChange :(categoryId) => dispatch(handleChangeCategory(categoryId)),
//             handleChangeInput : (name,value) => dispatch(handleChangeInput(name,value))
//         }
//     )
// }
//
// const AddCategoryContainer = connect(mapStateToProps,mapDispatchToProps)(AddCategory)
//
// export default AddCategoryContainer

import {connect} from "react-redux";
import Container from "../../Container";
import React, {Fragment, useEffect} from "react";
import {Field, reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import SignInForm from "../../SignIn/SignInForm";
import {
    addCategory,
    addManufacturer,
    deleteCategory,
    deleteManufacturer,
    loadCategoriesFromDB,
    loadManufacturesFromDB
} from "../../apiActions";
import {handleChangeCategory, handleChangeManufacturer, removeCategory} from "../../reducers/product";

let AddManufacturer =(props)=>{

    useEffect(()=>{
        props.loadManufactures()
    },[])

    const handleChange =(e) =>{
        props.handleChange(e.target.value)

    }

    const loadManufacturesSelector = ()=>{
        return(
           <div>
               <select  onChange={handleChange}>
                   {props.products.manufacturesList.map((manufacturer)=>{
                       return <option key={manufacturer._id} value={manufacturer._id}>{manufacturer.name}</option>
                   })}
               </select>
           </div>

        )
    }
    return(
        <Container className={'container'}>
            {props.products.manufacturesLoading ? (<p>Loading....</p>) :
                (props.products.manufacturesError ? (<p>{props.products.manufacturesErrorMsg}</p>) : loadManufacturesSelector())}
            <button onClick={()=>props.removeManufacturer(props.products.manufacturerId)} >remove</button>

            <form onSubmit={props.handleSubmit}>
                <label>Назва категорії</label>
                <Field name="name"
                      component={'input'}
                       type="name"
                       placeholder="Назва Виробника"/>
                <button type={'submit'} > Добавити</button>

            </form>
        </Container>
    )
}
AddManufacturer = reduxForm({
    form: 'addManufacturerForm'
})(AddManufacturer)

const AddManufacturerFormContainer =(props)=>{
    const addManufacturerSubmit = values => {
        props.createManufacturer(values)

    }

    return(
        <Fragment>
            {props.user.role === undefined || 0 ? (<Redirect to={'/'}/>):(
                <AddManufacturer
                    handleChange={props.handleChange}
                    removeManufacturer = {props.removeManufacturer}
                    loadManufactures={props.loadManufactures}
                    products={props.products}
                    onSubmit = {addManufacturerSubmit}/>)}
        </Fragment>
    )
}

const mapStateToProps = (state) =>{
    return(
        {
            products: state.productsReducer,
            user: state.user.currentUser

        }
    )
}
const mapDispatchToProps =(dispatch) =>{
    return(
        {
            createManufacturer:(manufacturer)=>dispatch(addManufacturer(manufacturer)),
            loadManufactures: ()=>dispatch(loadManufacturesFromDB()),
            handleChange :(manufacturerId) => dispatch(handleChangeManufacturer(manufacturerId)),
            removeManufacturer :(manufacturerId) => dispatch(deleteManufacturer(manufacturerId))
        }
    )
}

const AddManufacturerContainer = connect(mapStateToProps,mapDispatchToProps)(AddManufacturerFormContainer)

export default AddManufacturerContainer

