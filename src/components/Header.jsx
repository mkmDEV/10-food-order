import { useContext } from 'react';
import CartContext from '@store/CartContext';
import UserProgressContext from '@store/UserProgressContext';

import { Button } from '@components/UI/Button';

import logoImg from '@assets/logo.jpg';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (sum, { quantity }) => sum + quantity,
    0
  );

  const showCardHandler = () => userProgressCtx.showCart();

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A Restaurant" />
        <h1 className="">React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCardHandler}>
          🛒 Cart ({cartTotal})
        </Button>
      </nav>
    </header>
  );
}
