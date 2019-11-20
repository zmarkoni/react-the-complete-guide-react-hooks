import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
const Ingredients = () => {

    const [ userIngredients, setUserIngredients ] = useState([]);

    const addIngredientHandler = (ingredient) => {
        // We need to save STATE here and add new ingredients
        setUserIngredients(prevIngredients => [...prevIngredients, {...ingredient}]);
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
                <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
            </section>
        </div>
    );
};

export default Ingredients;
