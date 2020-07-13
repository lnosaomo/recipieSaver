import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
  }, []);

  if (contacts === null && !loading) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      <Link className=' btn btn-link' to='/recipie'>
        {' '}
        Back to recipies{' '}
      </Link>
      {contacts !== null && !loading ? (
        filtered !== null ? (
          filtered.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        ) : (
          contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} id={uuidv4()} />
          ))
        )
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
