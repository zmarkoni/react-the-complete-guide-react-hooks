import React, { useState} from 'react';

// use Context instead of REDUX
// So we will set the store here in ProductsContext

export const ProductsContext = React.createContext({products: []});

export default props => {
    // copy initialState from reducer
    const [productsList, setProductsList] = useState([
        {
          id: 'p1',
          title: 'Red Scarf',
          description: 'A pretty red scarf.',
          isFavorite: false
        },
        {
          id: 'p2',
          title: 'Blue T-Shirt',
          description: 'A pretty blue t-shirt.',
          isFavorite: false
        },
        {
          id: 'p3',
          title: 'Green Trousers',
          description: 'A pair of lightly green trousers.',
          isFavorite: false
        },
        {
          id: 'p4',
          title: 'Orange Hat',
          description: 'Street style! An orange hat.',
          isFavorite: false
        }
      ]);

  return (
    <ProductsContext.Provider value={{products: productsList}}>
        {props.children}
    </ProductsContext.Provider>
  );
};