import React from 'react';
import './Logo.scss';
import burgerLogo from '../../assets/images/burger-logo.png'

const Logo = (props) => (
    <div className='Logo'N>
        <img src = {burgerLogo} alt='MyBurger'></img>
    </div>
)

export default Logo;