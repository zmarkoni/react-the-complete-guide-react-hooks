import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const Ingredients = () => {

        const [userIngredients, setUserIngredients] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState();

        useEffect(() => {
            console.log('RENDERING INGREDIENTS', userIngredients);
        }, [userIngredients]); // Will run when userIngredients change ONLY

        const addIngredientHandler = (ingredient) => {
            setIsLoading(true);
            fetch('https://react-hooks-84331.firebaseio.com/ingredients.json', {
                method: 'POST',
                body: JSON.stringify(ingredient),
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                setIsLoading(false);
                return response.json();
            }).then(responseData => {
                // We need to save STATE here and add new ingredients
                setUserIngredients(prevIngredients => [
                    ...prevIngredients,
                    {
                        id: responseData.name,
                        ...ingredient
                    }
                ]);
            }).catch(error => {
                setError('Something went wrong: ', error.message);
                setIsLoading(false);
            });
        };

        const removeIngredientHandler = (ingredientId) => {
            setIsLoading(true);
            fetch(`https://react-hooks-84331.firebaseio.com/ingredients/${ingredientId}.json`, {
                method: 'DELETE',
            }).then(response => {
                setIsLoading(false);
                // We need to get STATE here and remove ingredient
                // filter return new array
                setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId));
            }).catch(error => {
               setError('Something went wrong: ', error.message);
                setIsLoading(false);
            });
        };

        const filteredIngredientsHandler = useCallback( (filteredIngredients) => {
            setUserIngredients(filteredIngredients);
        }, []); // Here we don't pass useCallback dependency since setUserIngredients is useState method

        const clearError = () => {
            setError(null);
        };

        return (
            <div className="App">

                {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

                {/* onAddIngredient will be passed to IngredientForm */}
                <IngredientForm
                    onAddIngredient={addIngredientHandler}
                    loading={isLoading}
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
