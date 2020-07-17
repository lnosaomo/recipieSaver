import React, {
  useState,
  useEffect,
  useContext,
  Fragment,
  useRef
} from 'react';
import axios from 'axios';
import RecipieItem from './layout/RecipieItem';
import SearchBar from './layout/searchBar';

import { v4 as uuidv4 } from 'uuid';
import './layout/autoSuggest.css';
import '../components/Recipie.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Spinner from './layout/Spinner';
import AlertContext from '../context/alert/alertContext';
import response from './layout/sample-recipie';
import ContactContext from '../context/recipe/recipeContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import AuthContext from '../context/auth/authContext';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { API_ID, API_KEY } from './auth/secrets';

const Recipie = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const useStyles = makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  }));

  const recipeContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { contacts, filtered, getContacts } = recipeContext;
  const {
    setCurrentFoodName,
    currentFoodName,
    selectedRecipe,
    getRecipeSearch,
    loading,
    clearErrors,
    error
  } = recipeContext;

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (error === 'Recipie already saved') {
      setAlert(error, 'light-danger');
      clearErrors();
    }
  }, [error]);

  let isSaved = [];
  if (contacts !== null && contacts.length > 0) {
    selectedRecipe.forEach((recipie, index) => {
      contacts.forEach(src => {
        if (recipie.recipe.url === src.url) {
          selectedRecipe[index].alreadyExists = true;
        } else {
          selectedRecipe[index].alreadyExists = false;
        }
      });
    });
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [recipies, setRecipies] = useState([]);
  const [search, setSearch] = useState({
    mealName: '',
    type: 'personal'
  });

  const [activeSuggestion, setactiveSuggestion] = useState(0);
  const [ress, setRess] = useState([]);
  const [foodName, setfoodName] = useState(' ');

  const [filteredSuggestions, setfilteredSuggestions] = useState([]);
  const [showSuggestions, setshowSuggestions] = useState(true);
  const { mealName, type } = search;
  const text = useRef('');
  let foodSearch = localStorage.getItem('foodSearch');
  useEffect(() => {
    getRecipeSearch(foodSearch ? foodSearch : currentFoodName);
  }, []);

  const onchangefoodName = e => {
    setfoodName(e.target.value);
    const foodName = e.target.value;
    var cors_api_host = 'https://cors-anywhere.herokuapp.com/';

    axios
      .get(
        `${cors_api_host}https://api.edamam.com/auto-complete?q=${foodName}&app_id=${API_ID}&app_key=${API_KEY}`
      )
      .then(response => {
        setRess(response.data);
      });
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = ress.filter(
      suggestion => suggestion.indexOf(foodName) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown

    setactiveSuggestion(0);
    setfilteredSuggestions(filteredSuggestions);
    setshowSuggestions(true);
    setfoodName(e.currentTarget.value);
  };

  const onSubmit = e => {
    var cors_api_host = 'https://cors-anywhere.herokuapp.com/';

    e.preventDefault();
    getRecipeSearch(currentFoodName);
  };

  // Event fired when the user clicks on a suggestion
  const onClick = e => {
    // Update the user input and reset the rest of the state

    setactiveSuggestion(0);
    setfilteredSuggestions([]);
    setshowSuggestions(false);
    setfoodName(e.currentTarget.innerText);
    localStorage.setItem('foodSearch', e.currentTarget.innerText);

    setCurrentFoodName(e.currentTarget.innerText);
  };

  // Event fired when the user presses a key down
  const onKeyDown = e => {
    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      setactiveSuggestion(0);
      setshowSuggestions(false);
      setfoodName(filteredSuggestions[activeSuggestion]);
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setactiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setactiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;
  if (showSuggestions) {
    if (ress.length > 0) {
      suggestionsListComponent = (
        <ul class='suggestions '>
          {ress.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = 'suggestion-active';
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = <div class='no-suggestions'></div>;
    }
  }
  const classes = useStyles();

  return (
    <div>
      <h6 class='text-right'>
        <strong>
          Recipies Saved:
          {`${contacts !== null && isAuthenticated ? contacts.length : 0}`}
        </strong>
      </h6>
      <form className='search' onSubmit={onSubmit}>
        <label class='meal-name'>
          Search for recipes to save (food name or main ingredient):
        </label>
        <Fragment>
          <div>
            <Paper component='form' className='input'>
              <input
                type='text'
                id='foodName'
                placeholder={
                  'type in food name e.g coconut rice and apple banana chutney'
                }
                value={foodName}
                onChange={onchangefoodName}
                onKeyDown={onKeyDown}
                autocomplete='off'
              />
              <IconButton
                type='submit'
                className={classes.iconButton}
                aria-label='search'
              >
                <SearchIcon />
              </IconButton>
            </Paper>

            {suggestionsListComponent}
          </div>
        </Fragment>
      </form>

      <div className='accordion' id='accordionExample'>
        {loading && <Spinner />}
        <div>
          {!loading && selectedRecipe !== null && (
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={responsive}
              infinite={false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass='carousel-container'
              renderButtonGroupOutside={true}
              dotListClass='custom-dot-list-style'
              itemClass='carousel-item-padding-40-px'
              partialVisible={true}
            >
              {selectedRecipe.map(recipie => (
                <RecipieItem
                  recipie={recipie}
                  error={error === 'Recipie already saved' ? true : false}
                  key={uuidv4()}
                  id={uuidv4()}
                />
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipie;
