import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import PetDetail from "./pages/PetDetail";
import Cart from "./pages/Cart";
import Enquiry from "./pages/Enquiry";

// PROTECTED ROUTE — only accessible if cart has items
function ProtectedEnquiry() {
  const { totalItems } = useCart();
  return totalItems > 0 ? <Enquiry /> : <Navigate to="/cart" replace />;
}

function Header() {
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header className="site-header">
      <Link to="/" className="site-logo">Pet Paradise</Link>
      <nav className="site-nav">
        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>Home</Link>
        <Link to="/cart" className={location.pathname === "/cart" ? "nav-link active" : "nav-link"}>
          Cart {totalItems > 0 && <span className="nav-badge">{totalItems}</span>}
        </Link>
        <Link to="/enquiry" className={location.pathname === "/enquiry" ? "nav-link active" : "nav-link"}>Enquiry</Link>
      </nav>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ErrorBoundary>
          <GlobalStyles />
          <Header />
          <Routes>
            {/* Basic route */}
            <Route path="/" element={<Home />} />
            {/* Dynamic route */}
            <Route path="/pet/:id" element={<PetDetail />} />
            {/* Basic route */}
            <Route path="/cart" element={<Cart />} />
            {/* Protected route */}
            <Route path="/enquiry" element={<ProtectedEnquiry />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </CartProvider>
    </BrowserRouter>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito:wght@300;400;500;600&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --green: #2d6a4f;
        --green-dark: #1b4332;
        --green-light: #d8f3dc;
        --accent: #f4a261;
        --bg: #f8f7f4;
        --text: #1a1a1a;
        --muted: #666;
        --border: #e5e5e5;
        --radius: 12px;
      }

      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); }

      /* Header */
      .site-header {
        position: sticky; top: 0; z-index: 100;
        background: #fff; border-bottom: 1px solid var(--border);
        height: 60px; padding: 0 40px;
        display: flex; align-items: center; justify-content: space-between;
        box-shadow: 0 1px 6px rgba(0,0,0,0.05);
      }
      .site-logo {
        font-family: 'Lora', serif; font-size: 1.4rem; font-weight: 700;
        color: var(--green); text-decoration: none;
      }
      .site-nav { display: flex; gap: 24px; align-items: center; }
      .nav-link {
        font-size: 0.9rem; font-weight: 500; color: var(--muted);
        text-decoration: none; position: relative;
        transition: color 0.15s;
      }
      .nav-link:hover, .nav-link.active { color: var(--green); }
      .nav-badge {
        background: var(--accent); color: #fff;
        border-radius: 10px; padding: 1px 7px; font-size: 0.72rem;
        font-weight: 700; margin-left: 4px;
      }

      /* Pages */
      .page { max-width: 1160px; margin: 0 auto; padding: 40px 24px 60px; }

      /* Hero */
      .hero {
        background: var(--green-light); border-radius: 16px;
        padding: 48px 36px; margin-bottom: 32px; text-align: center;
      }
      .hero h1 {
        font-family: 'Lora', serif; font-size: 2.2rem;
        color: var(--green-dark); margin-bottom: 8px;
      }
      .hero p { color: var(--green); font-size: 1rem; margin-bottom: 20px; }
      .search-input {
        width: 100%; max-width: 400px; padding: 10px 18px;
        border: 1.5px solid #c8e6c9; border-radius: 24px;
        font-family: 'Nunito', sans-serif; font-size: 0.9rem;
        background: #fff; outline: none; transition: border-color 0.2s;
      }
      .search-input:focus { border-color: var(--green); }

      /* Categories */
      .category-bar {
        display: flex; gap: 8px; flex-wrap: wrap;
        margin-bottom: 28px;
      }
      .cat-btn {
        padding: 7px 18px; border-radius: 20px; border: 1.5px solid var(--border);
        background: #fff; color: var(--muted); font-family: 'Nunito', sans-serif;
        font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.15s;
      }
      .cat-btn:hover { border-color: var(--green); color: var(--green); }
      .cat-btn.active { background: var(--green); border-color: var(--green); color: #fff; }

      /* Pet Grid */
      .pets-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        gap: 22px;
      }
      .empty-msg { text-align: center; color: var(--muted); padding: 60px 0; }

      /* Pet Card */
      .pet-card {
        background: #fff; border-radius: var(--radius);
        border: 1px solid var(--border);
        overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;
      }
      .pet-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
      .pet-img-wrap { position: relative; height: 190px; overflow: hidden; cursor: pointer; }
      .pet-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s; }
      .pet-card:hover .pet-img-wrap img { transform: scale(1.04); }
      .tag {
        position: absolute; top: 10px; left: 10px;
        padding: 3px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700;
      }
      .tag-popular { background: #fff3e0; color: #e65100; }
      .tag-best-seller { background: #e8f5e9; color: #2e7d32; }
      .tag-premium { background: #fce4ec; color: #880e4f; }

      .pet-info { padding: 14px 16px 16px; }
      .pet-name {
        font-family: 'Lora', serif; font-size: 1rem; font-weight: 600;
        cursor: pointer; margin-bottom: 3px;
        transition: color 0.15s;
      }
      .pet-name:hover { color: var(--green); }
      .pet-meta { font-size: 0.78rem; color: var(--muted); margin-bottom: 12px; }
      .pet-footer { display: flex; align-items: center; justify-content: space-between; }
      .pet-price { font-size: 1.05rem; font-weight: 700; color: var(--green); }

      /* Detail page */
      .btn-back {
        background: none; border: 1px solid var(--border); color: var(--muted);
        border-radius: 8px; padding: 7px 16px; cursor: pointer;
        font-family: 'Nunito', sans-serif; font-size: 0.85rem; margin-bottom: 24px;
        transition: all 0.15s;
      }
      .btn-back:hover { border-color: var(--green); color: var(--green); }
      .detail-card {
        display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
        background: #fff; border-radius: 16px; overflow: hidden;
        border: 1px solid var(--border);
      }
      .detail-img { width: 100%; height: 380px; object-fit: cover; }
      .detail-info { padding: 36px 32px 36px 0; display: flex; flex-direction: column; gap: 12px; }
      .detail-info h1 { font-family: 'Lora', serif; font-size: 1.8rem; }
      .detail-meta { font-size: 0.85rem; color: var(--muted); }
      .detail-desc { font-size: 0.95rem; color: #444; line-height: 1.65; }
      .detail-footer { display: flex; align-items: center; gap: 20px; margin-top: auto; }
      .detail-price { font-size: 1.5rem; font-weight: 700; color: var(--green); }

      /* Buttons */
      .btn-primary {
        background: var(--green); color: #fff; border: none;
        border-radius: 8px; padding: 10px 22px; cursor: pointer;
        font-family: 'Nunito', sans-serif; font-size: 0.9rem; font-weight: 600;
        transition: background 0.15s;
      }
      .btn-primary:hover { background: var(--green-dark); }
      .btn-primary.full-width { width: 100%; padding: 13px; font-size: 1rem; }
      .btn-outline {
        background: #fff; color: var(--green); border: 1.5px solid var(--green);
        border-radius: 8px; padding: 10px 22px; cursor: pointer;
        font-family: 'Nunito', sans-serif; font-size: 0.9rem; font-weight: 600;
        transition: all 0.15s;
      }
      .btn-outline:hover { background: var(--green-light); }
      .btn-add {
        background: var(--green); color: #fff; border: none;
        border-radius: 8px; padding: 8px 14px; cursor: pointer;
        font-family: 'Nunito', sans-serif; font-size: 0.8rem; font-weight: 600;
        transition: background 0.15s;
      }
      .btn-add:hover { background: var(--green-dark); }
      .btn-remove {
        background: none; border: 1px solid #fca5a5; color: #dc2626;
        border-radius: 6px; padding: 6px 12px; cursor: pointer;
        font-family: 'Nunito', sans-serif; font-size: 0.8rem;
        transition: all 0.15s;
      }
      .btn-remove:hover { background: #fef2f2; }

      /* Cart */
      .page-title {
        font-family: 'Lora', serif; font-size: 1.5rem; margin-bottom: 24px;
      }
      .cart-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
      .cart-row {
        display: flex; align-items: center; gap: 16px;
        background: #fff; border: 1px solid var(--border);
        border-radius: var(--radius); padding: 14px 16px;
      }
      .cart-thumb { width: 70px; height: 70px; border-radius: 8px; object-fit: cover; }
      .cart-info { flex: 1; }
      .cart-name { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
      .cart-sub { font-size: 0.82rem; color: var(--muted); }
      .cart-summary {
        background: #fff; border: 1px solid var(--border);
        border-radius: var(--radius); padding: 20px 24px;
        display: flex; align-items: center; justify-content: space-between;
      }
      .cart-total { font-size: 1.1rem; }
      .cart-total strong { color: var(--green); }
      .cart-actions { display: flex; gap: 12px; }
      .cart-empty-page {
        text-align: center; padding: 100px 24px;
        display: flex; flex-direction: column; align-items: center; gap: 12px;
      }
      .cart-empty-page h2 { font-family: 'Lora', serif; color: var(--muted); }

      /* Form */
      .form-page { max-width: 520px; }
      .form-sub { color: var(--muted); font-size: 0.9rem; margin-bottom: 28px; }
      .enquiry-form { display: flex; flex-direction: column; gap: 20px; }
      .field { display: flex; flex-direction: column; gap: 6px; }
      .field label { font-size: 0.85rem; font-weight: 600; color: var(--text); }
      .field input, .field textarea {
        padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 8px;
        font-family: 'Nunito', sans-serif; font-size: 0.9rem; outline: none;
        transition: border-color 0.2s; background: #fff;
      }
      .field input:focus, .field textarea:focus { border-color: var(--green); }
      .field textarea { resize: vertical; }
      .error { font-size: 0.78rem; color: #dc2626; }
      .success-box {
        background: var(--green-light); border-radius: 12px;
        padding: 40px 32px; text-align: center;
      }
      .success-box h2 { font-family: 'Lora', serif; color: var(--green-dark); margin-bottom: 8px; }

      /* Not found */
      .not-found { text-align: center; padding: 100px 24px; display: flex; flex-direction: column; align-items: center; gap: 16px; }

      @media (max-width: 700px) {
        .site-header { padding: 0 16px; }
        .hero { padding: 32px 20px; }
        .hero h1 { font-size: 1.7rem; }
        .detail-card { grid-template-columns: 1fr; }
        .detail-info { padding: 24px; }
        .cart-summary { flex-direction: column; gap: 16px; align-items: flex-start; }
      }
    `}</style>
  );
}

export default App;
