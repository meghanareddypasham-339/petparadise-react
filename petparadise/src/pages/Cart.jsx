// CART PAGE — reads global state from CartContext
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // "Protected" behaviour — redirect if cart is empty after clearing
  if (cart.length === 0) {
    return (
      <main className="page cart-empty-page">
        <h2>Your cart is empty</h2>
        <p>Add some pets before checking out.</p>
        <button className="btn-primary" onClick={() => navigate("/")}>Browse Pets</button>
      </main>
    );
  }

  return (
    <main className="page">
      <h2 className="page-title">Your Cart ({totalItems} items)</h2>
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-row" data-testid="cart-item">
            <img src={item.image} alt={item.name} className="cart-thumb" />
            <div className="cart-info">
              <p className="cart-name">{item.name}</p>
              <p className="cart-sub">Qty: {item.qty} &middot; &#8377;{(item.price * item.qty).toLocaleString("en-IN")}</p>
            </div>
            <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <span className="cart-total">Total: <strong>&#8377;{totalPrice.toLocaleString("en-IN")}</strong></span>
        <div className="cart-actions">
          <button className="btn-outline" onClick={clearCart}>Clear Cart</button>
          <button className="btn-primary" onClick={() => navigate("/enquiry")}>Proceed to Enquiry</button>
        </div>
      </div>
    </main>
  );
}

export default Cart;
