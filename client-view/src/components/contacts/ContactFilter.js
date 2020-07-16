import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/recipe/recipeContext';
import { Link } from 'react-router-dom';

const ContactFilter = () => {
  const recipeContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered, contacts } = recipeContext;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div>
      <br />
      <br />
      <Link className='' to='/recipe'>
        <h6 class='text-left'>
          {' '}
          <i class='fa fa-arrow-left' aria-hidden='true'></i>
          {''}Go back to recipe search{' '}
        </h6>
      </Link>
      <br />
      <br />
      <form action=''>
        <input
          type='text'
          ref={text}
          placeholder='Filter Recipes...'
          onChange={onChange}
        />
      </form>
      <br />
      <h3 class='text-left'>
        <strong>
          Saved Recipes {`(${contacts !== null ? contacts.length : ''})`}
        </strong>
      </h3>
      <br />
    </div>
  );
};

export default ContactFilter;
