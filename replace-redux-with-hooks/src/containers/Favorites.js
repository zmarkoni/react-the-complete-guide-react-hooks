import React, { useContext } from 'react';
// Redux
//import { useSelector } from 'react-redux';

// Context
//import { ProductsContext } from "../context/products-context";

// Hooks
import {useStore} from "../hooks-store/store";

import FavoriteItem from '../components/Favorites/FavoriteItem';
import './Products.css';

const Favorites = props => {
  // Redux
  // const favoriteProducts = useSelector(state =>
  //   state.shop.products.filter(p => p.isFavorite)
  // );

  // Context
  // const favoriteProducts = useContext(ProductsContext).products.filter(p => p.isFavorite);

  // Hooks
  const state = useStore()[0];
  const favoriteProducts = state.products.filter(p => p.isFavorite);

  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map(prod => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
