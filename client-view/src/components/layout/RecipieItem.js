import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';

const RecipieItem = ({ recipie, id }) => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const { currentFoodName, addContact } = contactContext;

  return (
    <div className='card container'>
      <div className='card-header' id='headingOne'>
        <h2 className='mb-0'>
          <div></div>
          <div className='text-right right'>
            {' '}
            <a
              className=' btn btn-link'
              href={isAuthenticated ? '/' : '/login'}
              onClick={() => {
                if (isAuthenticated) {
                  addContact(recipie.recipe);
                }
              }}
            >
              {' '}
              Save recipe{' '}
            </a>
          </div>
          <button
            className='btn btn-secondary'
            type='button'
            data-toggle='collapse'
            data-target={`#collapseOne${id}`}
            aria-expanded='false'
            aria-controls={`collapseOne${id}`}
          >
            {recipie.recipe.label}
          </button>
        </h2>

        <img
          src={`${recipie.recipe.image}`}
          data-toggle='collapse'
          data-target={`#collapseOne${id}`}
          aria-expanded='false'
          aria-controls={`collapseOne${id}`}
          class='img-thumbnail rounded float-left'
        ></img>
      </div>

      <div
        id={`collapseOne${id}`}
        className='collapse show'
        aria-labelledby='headingOne'
        data-parent='#accordionExample'
      >
        <div className='card-body'>
          <div className='text-right'>
            {' '}
            <p class='badge badge-primary'>
              Total Calories: {recipie.recipe.calories.toFixed()}
            </p>
          </div>
          <div>
            {' '}
            <strong>Ingredients</strong>
            {recipie.recipe.ingredientLines.map(line => (
              <li>{line}</li>
            ))}
          </div>
          <br />
          <button
            className='btn btn-secondary'
            type='button'
            onClick={() => {
              window.open(`${recipie.recipe.url}`, '_blank');
            }}
          >
            Get Cooking Instructions
          </button>
          <strong>From: {recipie.recipe.source}</strong>
        </div>
      </div>
    </div>
  );
};

export default RecipieItem;
