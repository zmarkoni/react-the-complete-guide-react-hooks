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

    return (
        <div className="App">
            {/* onAddIngredient will be passed to IngredientForm */}
            <IngredientForm onAddIngredient={addIngredientHandler}/>

            <section>
                <Search/>
                <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
            </section>
        </div>
    );
};

export default Ingredients;
