import {
    addCategory,
    addDelivery,
    addManufacturer,
    addProduct,
    deleteCategory,
    deleteDelivery,
    deleteManufacturer,
    deleteProduct,
    loadCategoriesFromDB, loadCategoryById, loadDeliveryById,
    loadDeliveryFromDB, loadManufacturerById,
    loadManufacturesFromDB, loadProductById,
    loadProductsFromDB, updateCategory, updateDelivery, updateManufacturer, updateProduct
} from "../../apiActions";
import React, {Fragment, useEffect, useState} from "react";
import {Field, reduxForm, values} from "redux-form";
import {connect} from "react-redux";
import Container from "../../Container";
import {
    handleChangeCategory,
    handleChangeDelivery, handleChangeInput,
    handleChangeManufacturer, handleChangePhoto,
    handleChangeProduct
} from "../../reducers/product";

import css from './DataUpdate.module.css'

//--------------category-----------------------------
let AddCategoryForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="name">Добавити категорію</label>
            <Field
                name={'name'}
                value={props.product.category.name}
                component={'input'}
                type={'text'}
                placeholder={'Введіть назву категорії'}
            />
            <button type={'submit'}>Добавити</button>
        </form>
    )
}
AddCategoryForm = reduxForm({
    form: 'addCategoryForm'
})(AddCategoryForm)

let UpdateCategoryForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="name">Виберіть категорію з випадаючого списку зверху</label>
            <Field name="name"
                   component={'input'}
                   type="name"
                   placeholder="Оновити категорію"/>
            <button type={'submit'}> Оновити</button>

        </form>
    )
}

UpdateCategoryForm = reduxForm({
    form: 'updateCategoryForm'
})(UpdateCategoryForm)
//--------------category-----------------------------

//--------------manufacturer-----------------------------

let AddManufacturerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="name">Добавити виробника</label>

            <Field
                name={'name'}
                value={props.product.manufacturer.name}
                component={'input'}
                type={'text'}
                placeholder={'Введіть назву Виробника'}
            />
            <button type={'submit'}>Добавити</button>
        </form>
    )
}
AddManufacturerForm = reduxForm({
    form: 'addManufacturerForm'
})(AddManufacturerForm)

let UpdateManufacturerForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="name">Виберіть Виробника з випадаючого списку зверху</label>
            <Field name="name"
                   component={'input'}
                   type="name"
                   placeholder="Оновити вирробника"/>
            <button type={'submit'}> Оновити</button>

        </form>
    )
}

UpdateManufacturerForm = reduxForm({
    form: 'updateManufacturerForm'
})(UpdateManufacturerForm)
//--------------manufacturer-----------------------------
//--------------delivery-----------------------------


let AddDeliveryForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="name">Добавити доставку</label>

            <Field
                name={'name'}
                value={props.product.delivery.name}
                component={'input'}
                type={'text'}
                placeholder={'Введіть назву Доставки'}
            />
            <button type={'submit'}>Добавити</button>
        </form>
    )
}
AddDeliveryForm = reduxForm({
    form: 'addDeliveryForm'
})(AddDeliveryForm)

let UpdateDeliveryForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="name">Виберіть Доставку з випадаючого списку зверху</label>
            <Field name="name"
                   component={'input'}
                   type="name"
                   placeholder="Оновити доставку"/>
            <button type={'submit'}> Оновити</button>

        </form>
    )
}

UpdateDeliveryForm = reduxForm({
    form: 'updateDeliveryForm'
})(UpdateDeliveryForm)


//--------------delivery-----------------------------

let AddProductForm = (props) => {


    useEffect(() => {
        props.loadProducts('createdAt', 50)
        props.loadCategories()
        props.loadManufactures()
        props.loadDeliveries()

    }, [])

    const handleChangeCategory = (e) => {
        props.handleChangeCategory(e.target.value)


    }
    const handleChangeManufacturer = (e) => {
        props.handleChangeManufacturer(e.target.value)


    }
    const handleChangeDelivery = (e) => {
        props.handleChangeDelivery(e.target.value)


    }

    const loadCategoriesSelector = () => {
        return (
            <div>
                <select onChange={handleChangeCategory}>
                    <option>Виберіть категорію</option>

                    {props.product.categoriesList.map((category) => {
                        return <option key={category._id} value={category._id}>{category.name}</option>
                    })}

                </select>

            </div>
        )
    }
    const loadManufacturesSelector = () => {
        return (
            <div>
                <select onChange={handleChangeManufacturer}>
                    <option>Виберіть Виробника</option>

                    {props.product.manufacturesList.map((manufacturer) => {
                        return <option key={manufacturer._id} value={manufacturer._id}>{manufacturer.name}</option>
                    })}
                </select>

            </div>

        )
    }
    const loadDeliverySelector = () => {
        return (
            <div>
                <select onChange={handleChangeDelivery}>
                    <option>Виберіть доставку</option>
                    {props.product.deliveryList.map((delivery) => {
                        return <option key={delivery._id} value={delivery._id}>{delivery.name}</option>
                    })}
                </select>
            </div>
        )
    }
    const handleChangePhoto = (event) => {

        props.handleChangePhoto(event.target.files[0])
        console.log(event.target.files[0])

    }

    return (
        <div>
            <form onSubmit={props.handleSubmit} className={css.form}>
                <div className={css.formItem}>
                    <h3>Добавити товар</h3>
                </div>
                <div className={css.formItem}><label>Фото товару</label>
                    <input
                        type={'file'}
                        onChange={handleChangePhoto}
                    /></div>

                <div className={css.formItem}>
                    <label>Назва товару</label>
                    <Field name="name"
                          component={'input'}
                          type="name"
                          placeholder="Назва товару"/></div>

                <div className={css.formItem}>
                    <label>Опис товару</label>
                    <Field name="description"
                          component={'textarea'}
                          placeholder="опис товару"
                          type="text"

                /></div>
                <div className={css.formItem}>
                    <label>Ціна товару</label>
                    <Field name="price"
                          component={'input'}
                          placeholder="ціна товару"
                          type="text"

                /></div>
                <div className={css.formItem}>
                    <label>Кількість товару</label>
                    <Field name="quantity"
                          component={'input'}
                          type="text"
                          placeholder="кількість товару"/>
                </div>
                <div className={css.formItem}>
                    <label>Категорія товару</label>
                    {props.product.categoriesLoading ? (<p>Loading....</p>) :
                    (props.product.categoriesError ? (
                        <p>{props.product.categoriesErrorMsg}</p>) : loadCategoriesSelector())}
                </div>
                <div className={css.formItem}>
                    <label>Виробник товару</label>
                    {props.product.manufacturesLoading ? (<p>Loading....</p>) :
                    (props.product.manufacturesError ? (
                        <p>{props.product.manufacturesErrorMsg}</p>) : loadManufacturesSelector())}
                </div>
                <div className={css.formItem}>
                    <label>Доставка товару</label>
                    {props.product.deliveryLoading ? (<p>Loading....</p>) :
                    (props.product.deliveryError ? (
                        <p>{props.product.deliveryErrorMsg}</p>) : loadDeliverySelector())}
                </div>

                <div className={css.formItem}>
                    <button type={'submit'}>Добавити товар</button>
                </div>

            </form>


        </div>
    )
}
AddProductForm = reduxForm({
    form: 'addProductForm'
})(AddProductForm)

let UpdateProductForm = (props) => {


    useEffect(() => {
        props.loadProducts('createdAt', 50)
        props.loadCategories()
        props.loadManufactures()
        props.loadDeliveries()
        // setProduct(props.product.product)

    }, [])


    const handleChange = (e) => {
        props.handleChange(e.target.value)
        props.productByID(e.target.value)


    }
    const handleChangeCategory = (e) => {
        props.handleChangeCategory(e.target.value)
        props.categoryByID(e.target.value)


    }
    const handleChangeManufacturer = (e) => {
        props.handleChangeManufacturer(e.target.value)
        props.manufacturerByID(e.target.value)


    }
    const handleChangeDelivery = (e) => {
        props.handleChangeDelivery(e.target.value)
        props.deliveryByID(e.target.value)


    }

    const loadProductSelector = () => {
        return (
            <div>
                <select onChange={handleChange}>
                    <option>Виберіть товар</option>
                    {props.product.productsList.map((product) => {
                        return <option key={product._id} value={product._id}>{product.name}</option>
                    })}
                </select>
                <button onClick={() => props.removeProduct(props.product.productId)}>Видалити товар</button>
            </div>
        )
    }
    const loadCategoriesSelector = () => {
        return (
            <div>
                <select onChange={handleChangeCategory}>
                    <option>Виберіть категорію</option>

                    {props.product.categoriesList.map((category) => {
                        return <option key={category._id} value={category._id}>{category.name}</option>
                    })}

                </select>
                <button onClick={() => props.removeCategory(props.product.categoryId)}>Видалити категорію</button>

            </div>
        )
    }
    const loadManufacturesSelector = () => {
        return (
            <div>
                <select onChange={handleChangeManufacturer}>
                    <option>Виберіть Виробника</option>

                    {props.product.manufacturesList.map((manufacturer) => {
                        return <option key={manufacturer._id} value={manufacturer._id}>{manufacturer.name}</option>
                    })}
                </select>
                <button onClick={() => props.removeManufacturer(props.product.manufacturerId)}>Видалити виробника
                </button>

            </div>

        )
    }
    const loadDeliverySelector = () => {
        return (
            <div>
                <select onChange={handleChangeDelivery}>
                    <option>Виберіть доставку</option>
                    {props.product.deliveryList.map((delivery) => {
                        return <option key={delivery._id} value={delivery._id}>{delivery.name}</option>
                    })}
                </select>
                <button onClick={() => props.removeDelivery(props.product.deliveryId)}>Видалити доставку</button>

            </div>
        )
    }
    const handleChangePhoto = (event) => {

        props.handleChangePhoto(event.target.files[0])
        console.log(event.target.files[0])

    }

    return (
        <div>

            <form onSubmit={props.handleSubmit} className={css.form}>
                <h4>Виберіть товар який потрібно видалити або обновити</h4>
                <div className={css.formItem}>
                    {props.product.isLoading ? (<p>Loading....</p>) :
                        (props.product.isError ? (<p>{props.product.errorMsg}</p>) : loadProductSelector())}
                </div>
                <div className={css.formItem}><label htmlFor="quantity">Оновіть фото товару</label>
                    <input
                        type={'file'}
                        onChange={handleChangePhoto}
                    /></div>
                <div className={css.formItem}><label htmlFor="name">Оновіть назву товару</label>

                    <Field name="name"
                           component={'input'}
                           type="name"
                           placeholder="Назва товару"/></div>

                <div className={css.formItem}><label htmlFor="quantity">Оновіть опис товару</label>

                    <Field name="description"
                           component={'textarea'}
                           placeholder="опис товару"
                           type="text"

                    /></div>
                <div className={css.formItem}>
                    <label htmlFor="price">Оновіть ціну товару</label>
                    <Field name="price"
                           component={'input'}
                           placeholder="ціна товару"
                           type="text"

                /></div>
                <div className={css.formItem}><label htmlFor="quantity">Оновіть кількість товару</label>
                    <Field name="quantity"
                           component={'input'}
                           type="text"
                           placeholder="кількість товару"/></div>
                <div className={css.formItem}>{props.product.categoriesLoading ? (<p>Loading....</p>) :
                    (props.product.categoriesError ? (
                        <p>{props.product.categoriesErrorMsg}</p>) : loadCategoriesSelector())}</div>
                <div className={css.formItem}>{props.product.manufacturesLoading ? (<p>Loading....</p>) :
                    (props.product.manufacturesError ? (
                        <p>{props.product.manufacturesErrorMsg}</p>) : loadManufacturesSelector())}</div>
                <div className={css.formItem}>{props.product.deliveryLoading ? (<p>Loading....</p>) :
                    (props.product.deliveryError ? (
                        <p>{props.product.deliveryErrorMsg}</p>) : loadDeliverySelector())}</div>

                <div className={css.formItem}>
                    <button type={'submit'}>Оновити товар</button>
                </div>

            </form>
            <div className={css.addItemBlock}>
                <UpdateCategoryForm onSubmit={props.updateCategorySubmit}/>
                <UpdateManufacturerForm onSubmit={props.updateManufacturerSubmit}/>
                <UpdateDeliveryForm onSubmit={props.updateDeliverySubmit}/>
            </div>
        </div>
    )
}
UpdateProductForm = reduxForm({
    form: 'updateProductForm',
    enableReinitialize: true
})(UpdateProductForm)

UpdateProductForm = connect(
    state => ({
        initialValues: state.productsReducer.product

    }),
    {} // bind account loading action creator
)(UpdateProductForm)


const DataUpdate = (props) => {

    const addCategorySubmit = values => {
        props.addCategory(values)
    }
    const addManufacturerSubmit = values => {
        props.addManufacturer(values)
    }
    const addDeliverySubmit = values => {
        props.addDelivery(values)
    }
    const addProductSubmit = values => {
        // let formData = new FormData()
        props.handleChangeInput('name', values.name)
        props.handleChangeInput('description', values.description)
        props.handleChangeInput('price', values.price)
        props.handleChangeInput('quantity', values.quantity)
        props.handleChangeInput('category', props.product.categoryId)
        props.handleChangeInput('manufacturer', props.product.manufacturerId)
        props.handleChangeInput('shipping', props.product.deliveryId)

        props.createProduct(props.product.formData)

    }
    const updateCategorySubmit = values => {
        props.categoryUpdate(props.product.category._id, values.name)
    }
    const updateManufacturerSubmit = values => {
        props.manufacturerUpdate(props.product.manufacturer._id, values.name)
    }
    const updateDeliverySubmit = values => {
        props.deliveryUpdate(props.product.delivery._id, values.name)
    }
    const updateProductSubmit = values => {
        // let formData = new FormData()
        // console.log(values)
        //
        props.handleChangeInput('_id', values.id)
        props.handleChangeInput('name', values.name)
        props.handleChangeInput('description', values.description)
        props.handleChangeInput('price', values.price)
        props.handleChangeInput('quantity', values.quantity)
        props.handleChangeInput('category', props.product.categoryId)
        props.handleChangeInput('manufacturer', props.product.manufacturerId)
        props.handleChangeInput('shipping', props.product.deliveryId)

        props.productUpdate(props.product.productId, props.product.formData)

    }


    return (
        <Fragment>
            <Container className={'container'}>
                <div className={css.addItemBlock}>
                    <h4>Добавити категорію/виробника/доставку</h4>
                    <AddCategoryForm
                        onSubmit={addCategorySubmit}
                        product={props.product}
                    />
                    <AddManufacturerForm
                        onSubmit={addManufacturerSubmit}
                        product={props.product}
                    />
                    <AddDeliveryForm
                        onSubmit={addDeliverySubmit}
                        product={props.product}
                    /></div>
                <AddProductForm

                    handleChange={props.handleChange}
                    handleChangeCategory={props.handleChangeCategory}
                    handleChangeManufacturer={props.handleChangeManufacturer}
                    handleChangeDelivery={props.handleChangeDelivery}
                    handleChangePhoto={props.handleChangePhoto}

                    loadProducts={props.loadProducts}
                    loadCategories={props.loadCategories}
                    loadManufactures={props.loadManufactures}
                    loadDeliveries={props.loadDeliveries}


                    product={props.product}
                    onSubmit={addProductSubmit}
                />
                <UpdateProductForm
                    removeCategory={props.removeCategory}
                    removeManufacturer={props.removeManufacturer}
                    removeDelivery={props.removeDelivery}
                    removeProduct={props.removeProduct}

                    handleChange={props.handleChange}
                    handleChangeCategory={props.handleChangeCategory}
                    handleChangeManufacturer={props.handleChangeManufacturer}
                    handleChangeDelivery={props.handleChangeDelivery}
                    handleChangePhoto={props.handleChangePhoto}

                    loadProducts={props.loadProducts}
                    loadCategories={props.loadCategories}
                    loadManufactures={props.loadManufactures}
                    loadDeliveries={props.loadDeliveries}

                    categoryByID={props.categoryByID}
                    manufacturerByID={props.manufacturerByID}
                    deliveryByID={props.deliveryByID}
                    productByID={props.productByID}

                    updateCategorySubmit={updateCategorySubmit}
                    updateManufacturerSubmit={updateManufacturerSubmit}
                    updateDeliverySubmit={updateDeliverySubmit}


                    product={props.product}
                    onSubmit={updateProductSubmit}
                />

            </Container>

        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return (
        {
            product: state.productsReducer,
        }
    )
}
const mapDispatchToProps = (dispatch) => {
    return (
        {
            loadProducts: () => dispatch(loadProductsFromDB()),
            loadCategories: () => dispatch(loadCategoriesFromDB()),
            loadManufactures: () => dispatch(loadManufacturesFromDB()),
            loadDeliveries: () => dispatch(loadDeliveryFromDB()),

            addCategory: (category) => dispatch(addCategory(category)),
            addManufacturer: (manufacturer) => dispatch(addManufacturer(manufacturer)),
            addDelivery: (delivery) => dispatch(addDelivery(delivery)),
            createProduct: (product) => dispatch(addProduct(product)),


            removeCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
            removeManufacturer: (manufacturerId) => dispatch(deleteManufacturer(manufacturerId)),
            removeDelivery: (deliveryId) => dispatch(deleteDelivery(deliveryId)),
            removeProduct: (productId) => dispatch(deleteProduct(productId)),


            handleChange: (productId) => dispatch(handleChangeProduct(productId)),
            handleChangeCategory: (categoryId) => dispatch(handleChangeCategory(categoryId)),
            handleChangeManufacturer: (manufacturerId) => dispatch(handleChangeManufacturer(manufacturerId)),
            handleChangeDelivery: (deliveryId) => dispatch(handleChangeDelivery(deliveryId)),
            handleChangePhoto: (photo) => dispatch(handleChangePhoto(photo)),
            handleChangeInput: (name, value) => dispatch(handleChangeInput(name, value)),

            categoryByID: (categoryId) => dispatch(loadCategoryById(categoryId)),
            deliveryByID: (deliveryId) => dispatch(loadDeliveryById(deliveryId)),
            manufacturerByID: (manufacturerId) => dispatch(loadManufacturerById(manufacturerId)),
            productByID: (productId) => dispatch(loadProductById(productId)),


            categoryUpdate: (id, name) => dispatch(updateCategory(id, name)),
            manufacturerUpdate: (id, name) => dispatch(updateManufacturer(id, name)),
            deliveryUpdate: (id, name) => dispatch(updateDelivery(id, name)),
            productUpdate: (id, name) => dispatch(updateProduct(id, name)),


        }
    )
}

const DataUpdateContainer = connect(mapStateToProps, mapDispatchToProps)(DataUpdate)
export default DataUpdateContainer