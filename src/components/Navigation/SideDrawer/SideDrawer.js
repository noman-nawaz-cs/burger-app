import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import './SideDrawer.scss';

const SideDrawer = (props) => {
    const classes = ['SideDrawer', props.open?'Open':'Close'];
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={classes.join(' ')}>
                <div className='Logo-SideDrawer'>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </>
    );
}

export default SideDrawer;