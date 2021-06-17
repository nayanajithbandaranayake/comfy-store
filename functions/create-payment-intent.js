// https://localhost:8888/.netlify/functions/create-payment-intent

require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart_products, total_amount, shippingFee, total_items } =
      JSON.parse(event.body);
    const calculateOrderAmount = () => {
      return total_amount + shippingFee;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  } else {
    return {
      statusCode: 200,
      body: "PAYMENT_INTENT",
    };
  }
};
