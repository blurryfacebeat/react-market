import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Button, Segment, Divider } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeAmount);
    setCartEmpty(products.length === 0);
  }, [products]);

  return <>
    <Divider />
      <Segment clearing size="large">
        <strong>Общая сумма покупки:</strong> {cartAmount} руб.
        <StripeCheckout
          name="СитиМобайл"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="RUB"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_iB31Sds5p29i3J49MOi5Cs6S00owtZKDfK"
          token={handleCheckout}
          triggerEvent="onClick"
        >
          <Button
            icon="cart"
            disabled={isCartEmpty || success}
            color="teal"
            floated="right"
            content="Подтвердить покупку"
          />
        </StripeCheckout>
      </Segment>
  </>
}

export default CartSummary;
