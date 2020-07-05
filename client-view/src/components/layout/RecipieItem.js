import React from 'react';

const RecipieItem = ({ recipie, id }) => {
  const openRecipieSource = url => {
    window.open(`'${url}'`, '_blank');
  };
  return (
    <div className='card container'>
      <div className='card-header' id='headingOne'>
        <h2 className='mb-0'>
          <div></div>
          <div className='text-right right'>
            {' '}
            <a href='#' className=' btn btn-link'>
              Save recipe
            </a>
          </div>
          <button
            className='btn btn-secondary'
            type='button'
            data-toggle='collapse'
            data-target={`#collapseOne${id}`}
            aria-expanded='true'
            aria-controls={`collapseOne${id}`}
          >
            {recipie.recipe.label}
          </button>
        </h2>

        <img
          src={`${recipie.recipe.image}`}
          data-toggle='collapse'
          data-target={`#collapseOne${id}`}
          aria-expanded='true'
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
              Total Calories: {recipie.recipe.calories}
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
            // onClick={openRecipieSource(recipie.recipe.url)}
          >
            Get Instructions
          </button>
          <strong>From: {recipie.recipe.source}</strong>
        </div>
      </div>
    </div>
  );
};

export default RecipieItem;
