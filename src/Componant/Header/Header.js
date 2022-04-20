
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <div className='navbar'>
            <nav>
                <Link to='/'>HOME</Link>
                <Link to='/product'>PRODUCT</Link>
                <Link to='/log out'>log out</Link>
                <Link to="/login"> login</Link>
            </nav>
        </div>
    );
};

export default Header;