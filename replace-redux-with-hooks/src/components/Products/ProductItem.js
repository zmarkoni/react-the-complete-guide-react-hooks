import React, { useContext } from 'react';
// Redux
//import { useDispatch } from 'react-redux';
//import { toggleFav } from '../../store/actions/products';
import Card from '../UI/Card';
import './ProductItem.css';

// Context
//import { ProductsContext } from "../../context/products-context";

// Hooks
import {useStore} from "../../hooks-store/store";

const ProductItem = React.memo(props => {
  console.log('ProductItem RENDERING');
  // Redux
  //const dispatch = useDispatch();

  // Context
  //const toggleFav = useContext(ProductsContext).toggleFav;

  //Hooks
  const dispatch = useStore(false)[1]; // shouldListen = false

  const toggleFavHandler = () => {
    // Redux
    //dispatch(toggleFav(props.id));

    // Context
    //toggleFav(props.id);

    //Hooks
    dispatch('TOGGLE_FAV', props.id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
