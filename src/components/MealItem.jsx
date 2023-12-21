import { useContext } from 'react';
import CartContext from '@store/CartContext';

import { Button } from '@components/UI/Button';

import { currencyFormatter } from '@utils/formatting';

export default function MealItem({ meal }) {
  const { name, price, image, description } = meal;
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = () => cartCtx.addItem(meal);

  return (
    <li className={'meal-item'}>
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className={'meal-item-price'}>{currencyFormatter.format(price)}</p>
          <p className={'meal-item-description'}>{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={addItemToCartHandler} type="button">
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
}
