import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_SELECTED_RECIPE,
  SUCCESS_STATUS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_RECIPE,
  FILTER_RECIPES,
  CLEAR_FILTER,
  RECIPE_ERROR,
  GET_RECIPES,
  CLEAR_RECIPES,
  GET_RECIPE_SEARCH,
  SET_CURRENT_FOODNAME,
  CLEAR_RECIPE_ERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };

    case ADD_RECIPE:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };

    case GET_RECIPE_SEARCH:
      return {
        ...state,
        selectedRecipe: action.payload,
        loading: false
      };

    case DELETE_RECIPE:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };

    case CLEAR_RECIPES:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: false
      };

    case UPDATE_RECIPE:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case SET_CURRENT_FOODNAME:
      return {
        ...state,
        currentFoodName: action.payload
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case FILTER_RECIPES:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.label.match(regex);
        })
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case RECIPE_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case CLEAR_RECIPE_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
