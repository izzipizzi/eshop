import React from "react";
import MenuContainer from "./Menu/MenuContainer";

const Container = ({className, children}) => {
    return (
        <div>
            <MenuContainer/>

            <div className={className}>
                {children}
            </div>
        </div>

    )
}
export default Container