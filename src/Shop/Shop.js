import React, {useEffect, useState} from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import Container from "../Container";
import css from './Shop.module.css'
import CheckBox from "../components/CheckBox";
import {loadFilteredProducts} from "../reducers/product";

const Shop = (props) => {

    // debugger
    useEffect(() => {
        //включити коли появиться інтернет
        // loadProducts()
        props.loadCategories()
        props.loadManufactures()
        props.loadFilteredProducts(props.products.selectedPage,props.products.limit,props.products.filters)

    }, [])
    // debugger
    let loadCategoriesCheckBox = () => {
        // debugger
        return (
            <CheckBox
                checkBoxChecked={props.products.checkBoxChecked}
                items={props.products.categoriesList}
                handleToggle={props.handleToggleFilter}
                loadFilteredProducts={props.loadFilteredProducts}
                filterBy='category'
                page = {props.products.selectedPage}
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
                loadFilteredProducts={props.loadFilteredProducts}
                filterBy='manufacturer'
                page = {props.products.selectedPage}
                limit ={ props.products.limit}
                filters ={props.products.filters}
            />)
    }

    let loadProductCards = props.products.filteredProductList.map(product=>(<ProductCard key ={product._id} product={product}/>))

    let pagesCount =Math.ceil(props.products.totalProductsSize/props.products.size)

    let pages= []
    for (let i = 1; i<=pagesCount; i++){
        pages.push(i)
    }
    useEffect(()=>{
        props.loadFilteredProducts(props.products.selectedPage,props.products.limit,props.products.filters)

    },[props.products.selectedPage])
    return (
        <Container className={css.shop}>

            <div className={css.shopContent}>

                <div className={css.contentLeft}>
                    <h4>Категорії</h4>

                    {props.products.categoriesLoading ? (<p>Loading....</p>) :
                        (props.products.categoriesError ? (<p>{props.products.categoriesErrorMsg}</p>) : loadCategoriesCheckBox())
                    }

                    <h4>Виробники</h4>
                    {props.products.manufacturesLoading ? (<p>Loading....</p>) :
                        (props.products.manufacturesError ? (<p>{props.products.manufacturesErrorMsg}</p>) : loadManufacturesCheckBox())
                    }
                </div>
                <div className={css.contentRight}>

                    <div className='card-holder'>
                        {props.products.isLoading ? (<p>Loading....</p>):
                            (props.products.isError ? (<p>{props.products.errorMsg}</p>): loadProductCards)
                        }
                    </div>



                </div>




            </div>

            <div className={css.paginationPages}>{pages.map((page) => {
                return (
                    <span className={(props.products.selectedPage) === page && css.active}
                          onClick={() => {
                              props.setCurrentPage(page)

                          }}
                    >{page}</span>
                )
            })}</div>


        </Container>
    )
}
export default Shop