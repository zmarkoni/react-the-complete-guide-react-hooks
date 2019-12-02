import React, {useContext} from 'react';

import './IngredientList.css';
import {AuthContext} from "../../context/auth-context";

const IngredientList = (props) => {
    console.log('RENDERING INGREDIENT LIST!');

    // just for testing context
    const authContext = useContext(AuthContext);
    console.log('INGREDIENT_LIST authContext: ', authContext);

    return (
        <section className="ingredient-list">
            <h2>Loaded Ingredients</h2>
            <ul>
                {props.ingredients.map(ig => (
                    <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
                        <span>{ig.title}</span>
                        <span>{ig.amount}x</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default IngredientList;
