import React, { useState } from 'react';

// We will subscribe on this context in App.js
export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {}
});

// Here we publish our context provider
const AuthContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loginHendler = () => {
      setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider
            value={{ login: loginHendler, isAuth: isAuthenticated }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;