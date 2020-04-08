import React, { Fragment } from 'react'

import {Link, withRouter} from 'react-router-dom'

import {signout,isAuth} from '../auth'

const isActive =(history,path)=>{
    if (history.location.pathname === path) {

        return ({color :'black', backgroundColor: '#4db2ff'})
        
    }else{
        return ({color : 'white'
               })
    }
}

const Menu = ({history})=>{
    return(
        <div> 
            <ul className='nav nav-tabs bg-primary'>
                <li className='nav-item'>
                    <Link className='nav-link'
                        style={isActive(history,'/')} 
                        to='/'>Home</Link>                   
                </li>

                <li className='nav-item'>
                    <Link className='nav-link'
                        style={isActive(history,'/user/dashboard')} 
                        to='/user/dashboard'>Dashboard</Link>                   
                </li>

                {!isAuth() && (

                   <Fragment>
                       <li className='nav-item'>
                            <Link 
                                className='nav-link'
                                style={isActive(history,'/signin')}
                                to='/signin'>
                                    
                                    Sign IN

                             </Link>                  
                        </li>
                        <li className='nav-item'>
                            <Link 
                                className='nav-link'
                                style={isActive(history,'/signup')}
                                to='/signup'>
                                    
                                    Sign UP

                            </Link>                  
                        </li>
                   </Fragment>
                         
                )}
               
              {isAuth () && (
                <li className='nav-item'>
                    <Link 
                        className='nav-link'
                        style={{cursor : 'pointer',color : 'white'}}
                        onClick={()=>{
                            signout(()=>{
                                history.push('/')
                            })
                        }}>
                            Sign OUT
                    </Link>                  
                </li>
              )}
                
            </ul>
        </div>
    )
}


export default withRouter(Menu)