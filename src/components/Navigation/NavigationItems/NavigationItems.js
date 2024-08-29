import React from 'react';
import './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className='NavigationItems'>
        <NavigationItem link="https://noman-nawaz-cs.github.io/burger-app/" active>Burger Builder</NavigationItem>
        <NavigationItem link="https://noman-nawaz-cs.github.io/burger-app/" active={false}>Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;