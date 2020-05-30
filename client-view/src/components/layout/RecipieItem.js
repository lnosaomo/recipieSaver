import React from 'react';

const RecipieItem = ({ recipie }) => {
  console.log(recipie);
  return (
    <div className='card'>
      <div className='card-header' id='headingOne'>
        <h2 className='mb-0'>
          <button
            className='btn btn-link'
            type='button'
            data-toggle='collapse'
            data-target='#collapseOne'
            aria-expanded='true'
            aria-controls='collapseOne'
          >
            {recipie.recipe.label}
          </button>
        </h2>
      </div>

      <div
        id='collapseOne'
        className='collapse show'
        aria-labelledby='headingOne'
        data-parent='#accordionExample'
      >
        <div className='card-body'>
          {recipie.recipe.ingredientLines.map(line => (
            <li>{line}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipieItem;
