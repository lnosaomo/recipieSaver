import React, { useState, useEffect, Fragment, useRef } from 'react';
import axios from 'axios';
import RecipieItem from './layout/RecipieItem';
import { v4 as uuidv4 } from 'uuid';
import './layout/autoSuggest.css';
import '../components/Recipie.css';

const Recipie = () => {
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

  const onchangefoodName = e => {
    setfoodName(e.target.value);
    const foodName = e.target.value;
    var cors_api_host = 'https://cors-anywhere.herokuapp.com/';
    // e.preventDefault();
    axios
      .get(
        `${cors_api_host}https://api.edamam.com/auto-complete?q=${foodName}&app_id=313605df&app_key=3a360d7219529db4accf27b5c25d9845`
      )
      .then(response => {
        //setRecipies(response.data.hits);
        setRess(response.data);
      });
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = ress.filter(
      suggestion => suggestion.indexOf(foodName) > -1
    );

    //debugger;
    console.log(ress);

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
    axios
      .get(
        `${cors_api_host}https://api.edamam.com/search?q=${foodName}&app_id=313605df&app_key=3a360d7219529db4accf27b5c25d9845`
      )
      .then(res => {
        setRecipies(res.data.hits);
      });
    console.log(recipies);
  };

  // Event fired when the user clicks on a suggestion
  const onClick = e => {
    // Update the user input and reset the rest of the state

    setactiveSuggestion(0);
    setfilteredSuggestions([]);
    setshowSuggestions(false);
    setfoodName(e.currentTarget.innerText);
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
        <ul class='suggestions'>
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
      suggestionsListComponent = (
        <div class='no-suggestions'>
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  return (
    <div>
      <form className='navbar-form navbar-left' onSubmit={onSubmit}>
        <label>Meal Name:</label>
        <Fragment>
          <input
            className='input'
            type='text'
            id='foodName'
            ref={text}
            placeholder='type in food name'
            value={foodName}
            onChange={onchangefoodName}
            onKeyDown={onKeyDown}
            autocomplete='off'
          />

          {suggestionsListComponent}
        </Fragment>

        <div>
          <input
            type='submit'
            value='Get Recipies'
            className='btn btn-primary get-recipies'
          />
        </div>
      </form>

      <div className='accordion' id='accordionExample'>
        <div>
          {recipies &&
            recipies.map(recipie => (
              <RecipieItem recipie={recipie} key={uuidv4()} id={uuidv4()} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Recipie;
