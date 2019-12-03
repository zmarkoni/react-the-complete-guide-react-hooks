import {useReducer, useCallback} from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
};

// Reducer is updating httpState properties directly
const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case "SEND":
            return {
                loading: true,
                error: null,
                data: null,
                extra: null,
                identifier: action.identifier};
        case "RESPONSE":
            return {
                ...currentHttpState,
                loading: false,
                data: action.responseData,
                extra: action.extra}; // here we will not update error
        case "ERROR":
            return {
                loading: false,
                error: action.errorMessage};
        case "CLEAR":
            return initialState;
        default:
            throw new Error('Should not get there!');
    }
};

const useHttp = () => {
    // our state is httpState
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback( () => dispatchHttp({type: 'CLEAR'}), []);

    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp({type: "SEND", identifier: reqIdentifier});

        fetch(
            url,
            {
                method: method,
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            return response.json();
        }).then(responseData => {
                dispatchHttp({
                    type: "RESPONSE",
                    responseData: responseData,
                    extra: reqExtra
                });
            }
        ).catch(error => {
            dispatchHttp({type: "ERROR", errorMessage: error.message});
        });
    }, []);
    return {
        isLoading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier,
        clear: clear
    }
};

export default useHttp;