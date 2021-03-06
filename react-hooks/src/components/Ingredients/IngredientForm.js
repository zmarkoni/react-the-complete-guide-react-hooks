import React, {useState} from 'react';
// useState manage State in functional components
import Card from '../UI/Card';
import './IngredientForm.css';
import '../UI/LoadingIndicator';
import LoadingIndicator from "../UI/LoadingIndicator";

// React.memo is used only to rerender component is PROPS are changed!
const IngredientForm = React.memo(props => {
    // console.log('IngredientForm props: ', props);

    //https://reactjs.org/docs/hooks-reference.html#usestate

    // useState will replace current state, not merge like before, so we need always to pass other state when using it.
    // Because of that, it is best to have state for each property independently!

    // https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/15700336#announcements
    const [enteredTitle, setEnteredTitle] = useState('');
    //     property.value, actionFunction
    const [enteredAmount, setEnteredAmount] = useState('');
    //console.log('RENDERING INGREDIENT FROM!');

    const submitHandler = event => {
        event.preventDefault();

        props.onAddIngredient({ // props.onAddIngredient is coming from parent component Ingredients.js
            title: enteredTitle,
            amount: enteredAmount
        });
    };

    //console.log('loading: ', props.loading);

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
                        {props.loading && <LoadingIndicator/> }
                    </div>
                </form>
            </Card>
        </section>
    );
});

export default IngredientForm;
