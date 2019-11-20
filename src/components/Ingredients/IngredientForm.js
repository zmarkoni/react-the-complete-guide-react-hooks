import React, { useState } from 'react';
// useState manage State in functional components
import Card from '../UI/Card';
import './IngredientForm.css';

// React.memo is used only to rerender component is PROPS are changed!
const IngredientForm = React.memo(props => {
  //https://reactjs.org/docs/hooks-reference.html#usestate
  const inputState = useState({
    title: '',
    amount: '' // We set Amount to string because VALUE of INPUT elements is always string
  });


  const submitHandler = event => {
    event.preventDefault();
    // ...
  };


  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputState[0].title}
                   onChange={event => inputState[1]({title: event.target.value})}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputState[0].amount}
                   onChange={event => inputState[1]({amount: event.target.value})}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
