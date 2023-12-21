import { useContext } from 'react';
import CartContext from '@store/CartContext';
import UserProgressContext from '@store/UserProgressContext';

import { Button } from '@components/UI/Button';
import { CartItem } from '@components/CartItem';
import { Modal } from '@components/UI/Modal';

import { currencyFormatter } from '@utils/formatting';

export const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce(
    (total, { quantity, price }) => total + quantity * price,
    0
  );

  const closeCartHandler = () => userProgressCtx.hideCart();
  const openCheckoutHandler = () => userProgressCtx.showCheckout();

  return (
    <Modal
      className={'cart'}
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' && closeCartHandler}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onIncrease={() => cartCtx.addItem(item)}
            {...item}
          />
        ))}
      </ul>
      <p className={'cart-total'}>{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button onClick={closeCartHandler} textOnly>
          Close
        </Button>
        {!!cartCtx.items.length && (
          <Button onClick={openCheckoutHandler}>💰 Go to Checkout 💰</Button>
        )}
      </p>
    </Modal>
  );
};
