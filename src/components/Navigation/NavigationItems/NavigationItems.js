import React from 'react';
import './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className='NavigationItems'>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/" active={false}>Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;