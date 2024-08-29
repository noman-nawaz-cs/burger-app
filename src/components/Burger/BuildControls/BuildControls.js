import React from "react";
import './BuildControls.scss';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: 'Meat', type:'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Salad', type:'salad' },
]

const BuildControls = (props) => {
    return (
    <div className = 'BuildControls'>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(control => {
            return <BuildControl
                key ={control.label}
                label = {control.label}
                added = {() => props.ingredientAdded(control.type)}
                removed = {() => props.ingredientRemoved(control.type)}
                disabled = {props.disabled[control.type]}
            />
        })}
        <button className="OrderButton" onClick={props.ordered} disabled={!props.purchasable}>ORDER NOW</button> 
    </div>
)};

export default BuildControls;
