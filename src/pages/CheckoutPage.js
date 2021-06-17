import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart_products } = useCartContext();

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="section-center section page">
        {cart_products.length < 1 ? (
          <div className="empty">
            <h2>your cart it currently empty</h2>
            <Link className="btn" to="/products">
              Fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
