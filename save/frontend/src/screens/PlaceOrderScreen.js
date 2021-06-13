import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Expédition</h3>
            <div>
              {cart.shipping.address}, {cart.shipping.city},
              {cart.shipping.postalCode}, {cart.shipping.country},
            </div>
          </div>
          <div>
            <h3>Paiement</h3>
            <div>Paiement Method: {cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Panier</h3>
                <div>Prix</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Le panier est vide</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>
                      <div>Quantité: {item.qty}</div>
                    </div>
                    <div className="cart-price">{item.price} Dt</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}
              >
                Passer la commande
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>éléments</div>
              <div>{itemsPrice} Dt</div>
            </li>
            <li>
              <div>Expédition</div>
              <div>{shippingPrice} Dt</div>
            </li>
            <li>
              <div>Tax</div>
              <div>{taxPrice} Dt</div>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
