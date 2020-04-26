import React, { Component,useEffect,useState } from 'react'

import Snackbar from '@material-ui/core/Snackbar';

  

export  const  showError =(error)=>(
    <div className ='alert alert-danger'style={
        {display: error ? '' : 'none'}
    }>
        {error}
    </div>
)
