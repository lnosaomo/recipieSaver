import React, { useReducer } from "react";
import {v4 as  uuid} from "uuid"; 
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        name: "Marc Adams",
        email: "ma@gmail.com",
        phone: "919-345-3212",
        type: "personal",
        id:"1"
      },

      {
        name: "Mary Jane Adams",
        email: "mj@gmail.com",
        phone: "919-345-3213",
        type: "professional",
        id:"2"
      },
      {
        name: " Jane Adams",
        email: "m@gmail.com",
        phone: "919-345-7213",
        type: "professional",
        id:"3"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  ///Add Contact
   const addContact = contact => {
       contact.id = uuid();
        dispatch({ type: ADD_CONTACT, payload: contact});
   }
  ///Delete Contact

  /// Set Current Contact

  /// Clear Current Contact

  /// Update Contact

  /// Filter Contacts

  ///Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;


