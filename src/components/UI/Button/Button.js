import React from "react";

import './Button.scss';

const Button = (props) => (
    <button className={`Button ${props.btnType}`} onClick={props.clicked}>
        {props.children}
    </button>
);

export default Button;