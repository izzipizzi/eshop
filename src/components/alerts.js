import React, { Component } from 'react'


export  const  showError =(error)=>(
    <div className ='alert alert-danger'style={
        {display: error ? '' : 'none'}
    }>
        {error}
    </div>
)
export const showSucces =(success,component)=>(
    <div className ='alert alert-success'style={
        {display: success ? '' : 'none'}
    }>
        {component}
        {/* Створено новий акаунт Будь-ласка <Link to='/signin'>увійдіть</Link>  */}
    </div>
)