import React from "react";

export function SaveBtn(props) {
    return (
        <button {...props} className = "btn btn-dark float-right" style ={{border: 'solid 3px', backgroundColor: 'white', color: 'black'}}>
        {props.children}
        </button>
    )
}