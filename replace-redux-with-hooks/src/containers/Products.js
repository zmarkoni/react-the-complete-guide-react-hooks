import React, { useContext } from 'react';
// redux
//import { useSelector } from 'react-redux';

// context
//import { ProductsContext } from "../context/products-context";

//hooks
import {useStore} from "../hooks-store/store";

import ProductItem from '../components/Products/ProductItem';
import './Products.css';

const Products = props => {
  // Redux
  //const productList = useSelector(state => state.shop.products);

  // Context
  //const productList = useContext(ProductsContext).products;

  // Hooks
  const state = useStore()[0];
  //const productList = state.products;
  return (
    <ul className="products-list">
      {state.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
