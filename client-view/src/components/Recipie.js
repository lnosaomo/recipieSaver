import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipieItem from './layout/RecipieItem';
import '../components/Recipie.css';
const Recipie = () => {
  const [recipies, setRecipies] = useState([]);
  const [search, setSearch] = useState({
    mealName: '',
    type: 'personal'
  });
  const code = [];
  const { mealName, type } = search;

  const onChange = e => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    var cors_api_host = 'https://cors-anywhere.herokuapp.com/';

    e.preventDefault();
    axios
      .get(
        `${cors_api_host}https://api.edamam.com/search?q=${mealName}&app_id=313605df&app_key=3a360d7219529db4accf27b5c25d9845&from=0&to=3&calories=591-722&health=alcohol-free`
      )
      .then(res => {
        setRecipies(res.data.hits);
      });

    console.log(recipies);
  };

  return (
    <div>
      <form className='navbar-form navbar-left'>
        <label>Meal Name:</label>
        <input
          type='text'
          name='mealName'
          value={mealName}
          onChange={onChange}
          className='form-control col-lg-8=6'
        />
        <h6>Meal Type:</h6>
        <input
          type='radio'
          name='type'
          value='personal'
          onChange={onChange}
          checked={type === 'personal'}
        />{' '}
        Personal
        {'    '}
        <input
          type='radio'
          name='type'
          value='professional'
          onChange={onChange}
          checked={type === 'professional'}
        />{' '}
        Professional
        <div>
          <input
            type='submit'
            value='Get Recipies'
            className='btn btn-primary'
            onClick={onSubmit}
          />
        </div>
      </form>

      <div className='accordion' id='accordionExample'>
        <div>
          {recipies &&
            recipies.map(recipie => <RecipieItem recipie={recipie} />)}
        </div>
      </div>
    </div>
  );
};

export default Recipie;
