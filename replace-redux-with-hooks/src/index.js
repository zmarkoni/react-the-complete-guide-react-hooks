import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';

// Redux
/*
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import productReducer from './store/reducers/products';

const rootReducer = combineReducers({
  shop: productReducer
});
const store = createStore(rootReducer);
*/

// Context
//import ProductsProvider from './context/products-context';

// hooks
import configureProductsStore from "./hooks-store/products-store";
import configureCounterStore from "./hooks-store/counter-store";

configureProductsStore();
configureCounterStore();
// configureCategoryStore(); example

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

/*
Context
<ProductsProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ProductsProvider>,
 */

/*
Redux
<Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Provider>,
 */