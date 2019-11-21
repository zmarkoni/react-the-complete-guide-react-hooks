import React, { useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

// reducer autmoticaly pass 2 arguments(state, action)
const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
        case "SET_INGREDIENT":
            return action.ingredients;
        case "ADD_INGREDIENT":
            return [...currentIngredients, action.ingredient];
        case "DELETE_INGREDIENT":
            return currentIngredients.filter(ing => ing.id !== action.id);
        default:
            throw new Error('Should not get there!');
    }
};

const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case "SEND":
            return {loading: true, error: null};
        case "RESPONSE":
            return {...currentHttpState, loading: false}; // here we will not update error
        case "ERROR":
            return {loading: false, error: action.errorMessage};
        case "CLEAR":
            return {...currentHttpState, error: null};
        default:
            throw new Error('Should not get there!');
    }
};

const Ingredients = () => {

        const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
        // const [userIngredients, setUserIngredients] = useState([]);

        const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});

        // const [isLoading, setIsLoading] = useState(false);
        // const [error, setError] = useState();

        useEffect(() => {
            console.log('RENDERING INGREDIENTS', userIngredients);
        }, [userIngredients]); // Will run when userIngredients change ONLY

        const addIngredientHandler = (ingredient) => {
            // setIsLoading(true);
            dispatchHttp({type: "SEND"});

            fetch('https://react-hooks-84331.firebaseio.com/ingredients.json', {
                method: 'POST',
                body: JSON.stringify(ingredient),
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                // setIsLoading(false);
                dispatchHttp({type: "RESPONSE"});
                return response.json();
            }).then(responseData => {
                // We need to save STATE here and add new ingredients
                // setUserIngredients(prevIngredients => [
                //     ...prevIngredients,
                //     {
                //         id: responseData.name,
                //         ...ingredient
                //     }
                // ]);
                dispatch({
                   type: "ADD_INGREDIENT",
                    ingredient: {
                        id: responseData.name,
                        ...ingredient
                    }
                });
            }).catch(error => {
                // setError('Something went wrong: ', error.message);
                // setIsLoading(false);
                dispatchHttp({type: "ERROR", errorMessage: error.message});
            });
        };

        const removeIngredientHandler = (ingredientId) => {
            // setIsLoading(true);
            dispatchHttp({type: "SEND"});
            fetch(`https://react-hooks-84331.firebaseio.com/ingredients/${ingredientId}.json`, {
                method: 'DELETE',
            }).then(response => {
                // setIsLoading(false);
                dispatchHttp({type: "RESPONSE"});
                // We need to get STATE here and remove ingredient
                // filter return new array
                //setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId));

                dispatch({
                   type: "DELETE_INGREDIENT",
                    id: ingredientId
                });
            }).catch(error => {
                //setError('Something went wrong: ', error.message);
                // setIsLoading(false);
                dispatchHttp({type: "ERROR", errorMessage: error.message});
            });
        };

        const filteredIngredientsHandler = useCallback( (filteredIngredients) => {
            // setUserIngredients(filteredIngredients);
            dispatch({
               type: "SET_INGREDIENT",
               ingredients: filteredIngredients
            });
        }, []); // Here we don't pass useCallback dependency since setUserIngredients is useState method

        const clearError = () => {
            // setError(null);
            dispatchHttp({type: "CLEAR"});
        };

        return (
            <div className="App">

                {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}

                {/* onAddIngredient will be passed to IngredientForm */}
                <IngredientForm
                    onAddIngredient={addIngredientHandler}
                    loading={httpState.loading}
                />

                <section>
                    <Search onFilteredIngredients={filteredIngredientsHandler}/>
                    <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
                </section>
            </div>
        );
    }
;

export default Ingredients;
