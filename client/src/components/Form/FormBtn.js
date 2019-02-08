import React from "react";

export function FormBtn(props) {
    return (
        <button {...props} className = "btn btn-dark float-right" style = {{backgroundColor: 'white', color: 'black', border: '3px solid black'}}>
        {props.children}
        </button>
    )
}