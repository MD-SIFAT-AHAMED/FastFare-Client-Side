import React from 'react';
import logo from '../../../assets/logo.png'
const FastFareLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <p className='text-xl md:text-3xl font-bold -ml-2'>FastFare</p>
        </div>
    );
};

export default FastFareLogo;