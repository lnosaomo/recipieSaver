import React, { Fragment, useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/recipe/recipeContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const recipeContext = useContext(ContactContext);
  const { contacts } = recipeContext;

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = async () => {
    await logout();
    window.location.reload(false);
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/'>
          {' '}
          My saved recipes {`[${contacts !== null ? contacts.length : ''}]`}
        </Link>
      </li>
      <li>
        <a onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'> Register </Link>
      </li>
      <li>
        <Link to='/login'> Login </Link>
      </li>
    </Fragment>
  );

  return (
    // <div className='navbar bg-primary'>

    // </div>

    <div className='navbar nav-wrapper'>
      <h3>
        <i className={icon} />
        {title}
      </h3>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: ' Recipe Keeper',
  icon: 'fas fa-utensils'
};

export default Navbar;
