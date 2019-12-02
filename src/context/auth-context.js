import React, { useState } from 'react';

// Context is used to pass state throw components!!!

// This is regular React component, no need to include anything than React to create context.
// Only when we want to use context we need useContext hook.
// Also we need to wrap our parent component with Provider which is created here.

// useContext(MyContext) only lets you read the context and subscribe to its changes.
// You still need a <MyContext.Provider> above in the tree to provide the value for this context.

// We will subscribe on this context in App.js,
// Also I will console.log it in IngredientsList.js
export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {}
});

// In index.js we will publish context provider
const AuthContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loginHendler = () => {
      setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuth: isAuthenticated,
                login: loginHendler
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;