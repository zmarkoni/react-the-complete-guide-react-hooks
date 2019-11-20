import React, {useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = () => {

        const [userIngredients, setUserIngredients] = useState([]);

        // We can use useEffect() for all sideEffects functionality.
        // useEffect() is executed after and for EVERY render/rerender cycle
        // useEffect accept 2 arguments
        useEffect(() => {
            fetch('https://react-hooks-84331.firebaseio.com/ingredients.json').then(
                response => response.json()
            ).then(responseData => {
                const loadedIngredients = [];
                for (const key in responseData) {
                    loadedIngredients.push({
                        id: key,
                        title: responseData[key].title,
                        amount: responseData[key].amount,
                    });
                }

                // update state
                setUserIngredients(loadedIngredients);
            });
        }, []); // with [] empty array as second argument, useEffect() will act like componentDidMount which runs ONLY ONCE(after the first render)!

        useEffect(() => {
            console.log('RENDERING INGREDIENTS', userIngredients);
        }, [userIngredients]); // Will run when userIngredients change ONLY

        const addIngredientHandler = (ingredient) => {
            fetch('https://react-hooks-84331.firebaseio.com/ingredients.json', {
                method: 'POST',
                body: JSON.stringify(ingredient),
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
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
            });
        };

        const removeIngredientHandler = (ingredientId) => {
            // We need to get STATE here and remove ingredient
            // filter return new array
            setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId));
        };

        return (
            <div className="App">
                {/* onAddIngredient will be passed to IngredientForm */}
                <IngredientForm onAddIngredient={addIngredientHandler}/>

                <section>
                    <Search/>
                    <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
                </section>
            </div>
        );
    }
;

export default Ingredients;
