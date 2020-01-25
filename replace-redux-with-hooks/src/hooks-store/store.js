// build this file: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/15700468#overview
// explanation after finishing: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/15700486#overview
import { useState, useEffect } from 'react';

// Defined outside of custom hook, so it can be initialized only once,
// and will be shared among all components which call any custom hook in this file
// Like this we create global state !!!
let globalState = {};
let listeners = [];
let actions = {};

// customHook will be re-rendered when state is changed since we use useState hook
// we share logic and data
export const useStore = (shouldListen = true) => {
    const setState = useState(globalState)[1];

    // same behaviour like in Reducer
    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload); // payload will be productId
        globalState = { ...globalState, ...newState };

        for (const listener of listeners) {
            listener(globalState); // is used only here to call globalState which will trigger STATE and re-render React components
        }
    };

    useEffect(() => {
        if(shouldListen) {
            listeners.push(setState);
        }

        return () => {
            if(shouldListen) {
                listeners = listeners.filter(listener => listener !== setState);
            }
        }
    }, [setState, shouldListen]);

    // same like Reducer
    return [
        globalState,
        dispatch
    ]
};

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = {...globalState, ...initialState};
    }

    actions = {...actions, ...userActions};
};