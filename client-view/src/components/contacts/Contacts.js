import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/recipe/recipeContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import { v4 as uuidv4 } from 'uuid';

import './contacts.css';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const Contacts = () => {
  const recipeContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = recipeContext;
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = event => {
    setSpacing(Number(event.target.value));
  };
  useEffect(() => {
    getContacts();
  }, []);

  if (contacts === null && !loading) {
    return (
      <h4>No recipies yet! Go to recipie search to find recipies you like</h4>
    );
  }
  return (
    <Fragment>
      <div className='flex-container'>
        {contacts !== null && !loading ? (
          filtered !== null ? (
            filtered.map(contact => (
              <ContactItem key={contact.id} contact={contact} />
            ))
          ) : (
            contacts.map(contact => (
              <div className={`item-${uuidv4()}`}>
                <ContactItem key={contact.id} contact={contact} id={uuidv4()} />
              </div>
            ))
          )
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

export default Contacts;
