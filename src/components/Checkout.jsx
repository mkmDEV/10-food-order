import { useHttp } from '@hooks/useHttp';
import { useContext } from 'react';
import CartContext from '@store/CartContext';
import UserProgressContext from '@store/UserProgressContext';

import { currencyFormatter } from '@utils/formatting';

import { Button } from '@components/UI/Button';
import { Input } from '@components/UI/Input';
import { Modal } from '@components/UI/Modal';
import { Error } from '@components/Error';

const reqCfg = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', reqCfg);
  const totalPrice = cartCtx.items.reduce(
    (total, { quantity, price }) => total + quantity * price,
    0
  );

  const closeHandler = () => userProgressCtx.hideCheckout();

  const finishHandler = () => {
    closeHandler();
    cartCtx.resetCart();
    clearData();
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const customerData = new FormData(event.target);
    const customer = Object.fromEntries(customerData.entries());
    const { items } = cartCtx;

    sendRequest(JSON.stringify({ order: { customer, items } }));
  };

  const actions = (
    <>
      <Button onClick={closeHandler} type={'button'} textOnly>
        Close
      </Button>
      <Button type={'submit'}>Submit Order 💳</Button>
    </>
  );

  if (data && !error)
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={userProgressCtx.progress === 'checkout' && closeHandler}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details vie email within th next few
          minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={finishHandler}>OK</Button>
        </p>
      </Modal>
    );

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={userProgressCtx.progress === 'checkout' && closeHandler}
    >
      <form onSubmit={submitHandler}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(totalPrice)}</p>

        <Input id={'name'} label={'Full name'} type={'text'} />
        <Input id={'email'} label={'Email address'} type={'email'} />
        <Input id={'street'} label={'Street'} type={'text'} />
        <div className="control-row">
          <Input id={'postal-code'} label={'Postal code'} type={'text'} />
          <Input id={'city'} label={'City'} type={'text'} />
        </div>

        {error && <Error title={'Failed to submit order'} message={error} />}

        <p className="modal-actions">
          {isSending ? <span>Sending order data...</span> : actions}
        </p>
      </form>
    </Modal>
  );
};
