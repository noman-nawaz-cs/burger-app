import React from 'react';

import './Burger.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).
        map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <BurgerIngredient key={key + i} type={key}/>
            });
        }).
        flat();
    if(transformedIngredients.length === 0)
        transformedIngredients = <p>Please start adding ingredients!</p>;
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger;