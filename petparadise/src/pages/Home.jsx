// CONTAINER / SMART component — owns filter logic, passes data to presenters
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PetCard from "../components/PetCard";
import { useCart } from "../context/CartContext";
import pets from "../data/pets";

const categories = ["All", "Dogs", "Cats", "Birds", "Fish", "Small Pets"];

function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filtered = pets.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="page">
      <section className="hero">
        <h1>Find Your Perfect Pet</h1>
        <p>Healthy pets from trusted breeders across India</p>
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or breed..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-msg">No pets found. Try a different search.</p>
      ) : (
        <div className="pets-grid">
          {filtered.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onAdd={addToCart}
              onView={(id) => navigate(`/pet/${id}`)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
