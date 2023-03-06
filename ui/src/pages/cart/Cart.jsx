// http://localhost:3000/?success=true
// useEffect(() => {
//   // Check to see if this is a redirect back from Checkout
//   const query = new URLSearchParams(window.location.search);
//   if (query.get("success")) {
//     setMessage("Order placed! You will receive an email confirmation.");
//   }
//   if (query.get("canceled")) {
//     setMessage(
//       "Order canceled -- continue to shop around and checkout when you're ready."
//     );
//   }
// }, []);

// return message ? (
//   <Message message={message} />
// ) : (
//   <ProductDisplay />
// );

import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

import './cart.scss';
const Cart = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

  const handlePay = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post(
        'http://localhost:5000/api/checkout/create-checkout-session',
        {
          items: [{ name: 'product name', price: 10, quantity: 1 }],
        }
      );

      debugger;
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });

      console.log(res);
    } catch (error) {
      debugger;
    }
  };
  return (
    <div className="cart">
      <div className="wrapper">
        <div className="picture">
          <img
            src="https://data.mecshopping.it/imgprodotto/ml574dvr-mens-suede-sneakers_581391_zoom.jpg"
            alt=""
          />
        </div>
        <div className="detail">
          <h2>New Balance ML574DVR Men's suede sneakers</h2>
          <p>Code: P138710 | Brand: New Balance</p>
        </div>
        <div className="summary">
          <p> Quantiry: 1 </p>
          <p> Total: $ 89.99</p>

          <button
            onClick={() => {
              handlePay();
            }}
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
