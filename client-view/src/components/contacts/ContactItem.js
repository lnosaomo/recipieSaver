import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact, id }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, label, url, ingredientLines, image, source, calories } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };
  return (
    <div className='card container'>
      <div className='card-header' id='headingOne'>
        <h2 className='mb-0'>
          <div></div>
          <div className='text-right right'>
            {' '}
            {/* <Link
              className=' btn btn-link'
              //to='/'
              // onClick={() => {
              //   addContact(recipie.recipe);
              //   //console.log(recipie.recipe);
              // }}
            >
              {' '}
              Save recipe{' '}
            </Link> */}
          </div>
          <button
            className='btn btn-secondary'
            type='button'
            data-toggle='collapse'
            data-target={`#collapseOne${id}`}
            aria-expanded='true'
            aria-controls={`collapseOne${id}`}
          >
            {label}
          </button>
        </h2>

        <img
          src={`${image}`}
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
            <p class='badge badge-primary'>Total Calories: {calories}</p>
          </div>
          <div>
            {' '}
            <strong>Ingredients</strong>
            {ingredientLines.map(line => (
              <li>{line}</li>
            ))}
          </div>
          <br />
          <button
            className='btn btn-secondary'
            type='button'
            onClick={() => {
              window.open(`${url}`, '_blank');
            }}
          >
            Get Cooking Instructions
          </button>
          <strong>From: {source}</strong>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
