// DYNAMIC ROUTE — /pet/:id
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import pets from "../data/pets";

function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const pet = pets.find((p) => p.id === Number(id));

  if (!pet) {
    return (
      <div className="page not-found">
        <p>Pet not found.</p>
        <button className="btn-primary" onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <main className="page detail-page">
      <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
      <div className="detail-card">
        <img src={pet.image} alt={pet.name} className="detail-img" />
        <div className="detail-info">
          {pet.tag && <span className={`tag tag-${pet.tag.toLowerCase().replace(" ", "-")}`}>{pet.tag}</span>}
          <h1>{pet.name}</h1>
          <p className="detail-meta">{pet.breed} &middot; {pet.age} &middot; {pet.category}</p>
          <p className="detail-desc">{pet.description}</p>
          <div className="detail-footer">
            <span className="detail-price">&#8377;{pet.price.toLocaleString("en-IN")}</span>
            <button className="btn-primary" onClick={() => { addToCart(pet); navigate("/cart"); }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PetDetail;
