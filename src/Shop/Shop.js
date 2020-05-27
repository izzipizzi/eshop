import React, {useEffect, useState} from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import Container from "../Container";
import css from './Shop.module.css'
import CheckBox from "../components/CheckBox";

const Shop = (props) => {

    // debugger
    useEffect(() => {
        //включити коли появиться інтернет
        // loadProducts()
        props.loadCategories()
        props.loadManufactures()
        props.loadFilteredProducts(props.products.skip,props.products.limit,props.products.filters)

    }, [])
    // debugger

    const handleToggleFilter = (filter) => {
        console.log(filter)
    }
    let loadProductCards = props.products.productsList.map(product => (
        <ProductCard key={product._id} product={product}/>))
    let loadCategoriesCheckBox = () => {
        // debugger
        return (
            <CheckBox
                checkBoxChecked={props.products.checkBoxChecked}
                items={props.products.categoriesList}
                handleToggle={props.handleToggleFilter}
                loadFilteredProducts={props.loadFilteredProducts}
                filterBy='category'
                skip = {props.products.skip}
                limit ={ props.products.limit}
                filters ={props.products.filters}

            />
        )
    }
    let loadManufacturesCheckBox = () => {
        // debugger
        return (
            <CheckBox
                checkBoxChecked={props.products.checkBoxChecked}
                items={props.products.manufacturesList}
                handleToggle={props.handleToggleFilter}
                filterBy='manufacturer'
            />)
    }
    return (
        <Container className={css.Home}>

            <div className='container'>
                <div className={css.rightContent}>
                    {props.products.categoriesLoading ? (<p>Loading....</p>) :
                        (props.products.categoriesError ? (<p>{props.products.categoriesErrorMsg}</p>) : loadCategoriesCheckBox())
                    }
                    {props.products.manufacturesLoading ? (<p>Loading....</p>) :
                        (props.products.manufacturesError ? (<p>{props.products.manufacturesErrorMsg}</p>) : loadManufacturesCheckBox())
                    }
                </div>


            </div>


        </Container>
    )
}
export default Shop