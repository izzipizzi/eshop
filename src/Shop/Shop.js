import React, {useEffect} from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import Container from "../Container";
import css from './Home.module.css'

const Shop = ({products,loadProducts}) => {

    // debugger
    useEffect(()=>{
        //включити коли появиться інтернет
        // loadProducts()

    },[])
    let loadProductCards = products.productsList.map(product=>(<ProductCard key ={product._id} product={product}/>))
    return (
        <Container className={css.Home}>

            <div className='container'>

            </div>


        </Container>
    )
}
export default Shop