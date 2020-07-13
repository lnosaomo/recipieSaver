import React, { useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import responseArray from '../../components/layout/sample-recipie';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  GET_RECIPE_SEARCH,
  SET_CURRENT_FOODNAME,
  SET_SELECTED_RECIPE
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    selectedRecipe: [],
    current: null,
    currentFoodName: '',
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContacts = async contact => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR });
    }
  };
  // Get Recipe search
  const getRecipeSearch = async foodName => {
    var cors_api_host = 'https://cors-anywhere.herokuapp.com/';
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };
    // try {

    //TODO Add back await
    const res = await axios.get(
      `${cors_api_host}https://api.edamam.com/search?q=${foodName}&app_id=313605df&app_key=3a360d7219529db4accf27b5c25d9845`
    );
    console.log(res);
    dispatch({
      type: GET_RECIPE_SEARCH,
      payload: res.data.hits
    });
    // } catch (err) {
    //   dispatch({ type: CONTACT_ERROR });
    // }
    // await axios
    //   .get(
    //     `${cors_api_host}https://api.edamam.com/search?q=${'rice'}&app_id=313605df&app_key=3a360d7219529db4accf27b5c25d9845`
    //   )
    //   .then(res => {
    //     //setRecipies(response.data.hits);
    //     console.log(res);
    //     //setRess(response.data);
    //   });

    //console.log(response.hits);
    //const res = await axios.get('/api/contacts');
  };

  ///Add Contact

  const addContact = async contact => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      signal: signal
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR });
    }
  };

  // useEffect(() => {
  //   addContact(contact);
  //   return () => {
  //     abortController.abort();
  //   };
  // }, []);
  ////// Set Selected Recipie
  const setSelectedRecipe = async recipe => {
    dispatch({ type: SET_SELECTED_RECIPE, payload: recipe });
  };

  /// Update Contact

  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR });
    }
  };

  ///Delete Contact

  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR });
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  /// Set Current Contact

  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  /// Set Current FoodName

  const setCurrentFoodName = name => {
    dispatch({ type: SET_CURRENT_FOODNAME, payload: name });
  };

  /// Clear Current Contact

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  /// Filter Contacts

  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  ///Clear Filter

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        currentFoodName: state.currentFoodName,
        selectedRecipe: state.selectedRecipe,
        error: state.error,
        setCurrent,
        getContacts,
        clearCurrent,
        addContact,
        deleteContact,
        updateContact,
        filterContacts,
        clearFilter,
        setCurrentFoodName,
        setSelectedRecipe,
        getRecipeSearch,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
