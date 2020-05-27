import React, {useEffect} from "react";
import {handleToggleFilter} from "../reducers/product";

const CheckBox = (props) => {

    // const handleToggleFilter = (filters) => {
    //     props.handleToogleFilters()
    //     props.handleToggle()
    // }


    const handleToggleChange = filter => () =>{
        console.log(filter)


}
    return (
        <div>
            {props.items.map((item,index) => {
                return (
                    <li className='list-unstyled' key={index}>
                        <input
                            // onChange={handleToggleFilter(item._id)}
                            onChange={()=>{
                                props.handleToggle(item._id,props.filterBy)
                             //   debugger
                                props.loadFilteredProducts(props.skip,props.limit,props.filters)}
                            }
                            //    onChange={(e)=>props.handleToggleFilter(item._id)}
                               value={props.checkBoxChecked.indexOf(item._id === -1)} type='checkbox'
                               className='form-check-input'/>
                        <label className='form-check-label'> {` ${item.name}`}</label>
                    </li>
                )
            })}
        </div>
    )
}
export default CheckBox