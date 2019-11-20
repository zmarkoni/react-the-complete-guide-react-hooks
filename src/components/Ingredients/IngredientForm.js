import React, { useState } from 'react';
// useState manage State in functional components
import Card from '../UI/Card';
import './IngredientForm.css';

// React.memo is used only to rerender component is PROPS are changed!
const IngredientForm = React.memo(props => {
  //https://reactjs.org/docs/hooks-reference.html#usestate

  // When we have one State for some connected properties
  // const [inputState, setInputState] = useState({
  //   title: '',
  //   amount: '' // We set Amount to string because VALUE of INPUT elements is always string
  // });

  //useState will replace current state, not merge like before, so we need always to pass other state when using it.
  //Because of that, it is best to have state for each property independently!

  //https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/15700336#announcements
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
      props.onAddIngredient({
          id: Math.random().toString(),
          title: enteredTitle,
          amount: enteredAmount})
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title"
                   value={enteredTitle}
                   onChange={event => {
                     setEnteredTitle(event.target.value);
                   }}
                   // When we have one State for some connected properties
                   // onChange={event => {
                   //     const newAmount = event.target.value;
                   //     setInputState(prevInputState => ({
                   //         amount: newAmount,
                   //         title: prevInputState.title
                   //     }));
                   // }}
             />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"
                   value={enteredAmount}
                   onChange={event => {
                     setEnteredAmount(event.target.value);
                   }}/>
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
