import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";

const Search = React.memo(props => {
    const {onFilteredIngredients} = props; // object destructuring, so we can use it in useEffect dependencies
    const [enteredFilter, setEnteredFilter] = useState('');

    const inputRef = useRef();
    const {isLoading, error, data, sendRequest, clear} = useHttp();
    // We can use useEffect() for all sideEffects functionality.
    // useEffect() is executed after and for EVERY render/rerender cycle
    // useEffect accept 2 arguments(our function, dependency array where we can pass variables or data outside useEffect) and return cleanUp function
    useEffect(() => {
        // will execute right after onChange setEnteredFilter method
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                const queryFilter = enteredFilter.length === 0
                    ? ''
                    : `?equalTo="${enteredFilter}"&orderBy="title"`;

                // To use this queryFilter we need to update Rules in Database to include ingredients.json
                // {
                //   "rules": {
                //     ".read": true,
                //     ".write": true,
                //       "ingredients": { // added
                //         ".indexOn": ["title"]
                //       }
                //   }
                // }

                sendRequest('https://react-hooks-84331.firebaseio.com/ingredients.json' + queryFilter, 'GET');
                // we will handle response in useEffect!!!

                // fetch('https://react-hooks-84331.firebaseio.com/ingredients.json' + queryFilter).then(
                //     response => response.json()
                // ).then(responseData => {
                //     const filteredIngredients = [];
                //     for (const key in responseData) {
                //         filteredIngredients.push({
                //             id: key,
                //             title: responseData[key].title,
                //             amount: responseData[key].amount,
                //         });
                //     }
                //
                //     // Pass filtered ingredients to Ingredients.js
                //     // props.onFilteredIngredients(filteredIngredients);
                //     onFilteredIngredients(filteredIngredients); // we can use without props since we have extract it in object destructuring on the top!!!
                // });
            }
        }, 500);

        // useEffect can return cleanUp function and will run before new effect
        return () => {
            clearTimeout(timer);
        }
    }, [enteredFilter, inputRef, sendRequest]); // Will execute only when enteredFilter is changed
    // with [] empty array as second argument, useEffect() will act like componentDidMount which runs ONLY ONCE(after the first render)!
    useEffect(() => {
        if (!isLoading && !error && data) {
            const filteredIngredients = [];
            for (const key in data) {
                filteredIngredients.push({
                    id: key,
                    title: data[key].title,
                    amount: data[key].amount,
                });
            }

            // Pass filtered ingredients to Ingredients.js
            // props.onFilteredIngredients(filteredIngredients);
            onFilteredIngredients(filteredIngredients); // we can use without props since we have extract it in object destructuring on the top!!!
        }
    }, [data, isLoading, error, onFilteredIngredients]);

    return (
        <section className="search">
            {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    {isLoading && <label>Loading...</label>}
                    <input type="text"
                           value={enteredFilter}
                           ref={inputRef}
                           onChange={event => setEnteredFilter(event.target.value)}
                    />
                </div>
            </Card>
        </section>
    );
});

export default Search;
