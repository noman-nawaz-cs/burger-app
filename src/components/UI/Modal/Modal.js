import React from 'react';
import './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => (
    props.show ? (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div 
                className='Modal'
                style={{
                    transform: 'translateY(0)',
                    opacity: '1'
                }}
            >
                {props.children}
            </div>
        </>
    ) : null
);

export default Modal;
