import React, {useEffect, useCallback, useReducer, useMemo} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";
// reducer automatically pass 2 arguments(state, action)
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

const Ingredients = () => {
        const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
        // const [userIngredients, setUserIngredients] = useState([]);
        const {isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear} = useHttp();

        useEffect(() => {
            if (!isLoading && !error && reqIdentifier === 'REMOVE_ING_IDENTIFIER') {
                dispatch({type: "DELETE_INGREDIENT", id: reqExtra});
            } else if (!isLoading && !error && reqIdentifier === 'ADD_ING_IDENTIFIER') {
                //console.log("ADD_INGREDIENT: " ,data);
                dispatch({
                    type: "ADD_INGREDIENT",
                    ingredient: {id: data.name, ...reqExtra}
                });
            }
        }, [data, reqExtra, reqIdentifier, isLoading, error]); // Will run when userIngredients change ONLY

        const addIngredientHandler = useCallback((ingredient) => {
            sendRequest(
                'https://react-hooks-84331.firebaseio.com/ingredients.json',
                'POST',
                JSON.stringify(ingredient),
                ingredient,
                'ADD_ING_IDENTIFIER'
            );
            // We will handle response in useEffect
        }, [sendRequest]);

        const removeIngredientHandler = useCallback((ingredientId) => {
            sendRequest(
                `https://react-hooks-84331.firebaseio.com/ingredients/${ingredientId}.json`,
                'DELETE',
                null,
                ingredientId,
                'REMOVE_ING_IDENTIFIER'
            );
            // We will do this in useEffect since it will be triggered when sendRequest is done,
            // since we have there dispatchHttp which update state, so useEffect will be triggered
            // dispatch({
            //    type: "DELETE_INGREDIENT",
            //     id: ingredientId
            // });
        }, [sendRequest]);

        // useCallback prevent infinite loop by cashing the setUserIngredients(SET_INGREDIENT) to avoid re-rendering inside useEffect in Search.js
        // https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/15700360#announcements
        const filteredIngredientsHandler = useCallback((filteredIngredients) => {
            // setUserIngredients(filteredIngredients);
            dispatch({
                type: "SET_INGREDIENT",
                ingredients: filteredIngredients
            });
        }, []); // Here we don't pass useCallback dependency since setUserIngredients is useState method

        // const clearError = useCallback(() => {
        //     clear();
        // }, []);

        // When we using useMemo hook, we don't need to use React.memo!
        const ingredientList = useMemo(() => {
            return <IngredientList
                ingredients={userIngredients}
                onRemoveItem={removeIngredientHandler}
            />
        }, [userIngredients, removeIngredientHandler]);

        return (
            <div className="App">
                {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

                {/* onAddIngredient will be passed to IngredientForm */}
                <IngredientForm
                    onAddIngredient={(ingredient) => addIngredientHandler(ingredient)}
                    // can be written shorter without passing argument 'ingredient'
                    //onAddIngredient={addIngredientHandler}
                    loading={isLoading}
                />

                <section>
                    <Search onFilteredIngredients={filteredIngredientsHandler}/>
                    {ingredientList}
                </section>
            </div>
        );
    }
;

export default Ingredients;
