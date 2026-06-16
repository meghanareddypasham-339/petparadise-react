function PetCard({ pet, onAdd, onView }) {
  return (
    <div className="pet-card" data-testid="pet-card">
      <div
        className="pet-img-wrap"
        onClick={() => onView(pet.id)}
      >
        <img src={pet.image} alt={pet.name} loading="lazy" />

        {pet.tag && (
          <span
            className={`tag tag-${pet.tag
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {pet.tag}
          </span>
        )}
      </div>

      <div className="pet-info">
        <h3
          className="pet-name"
          onClick={() => onView(pet.id)}
        >
          {pet.name}
        </h3>

        <p className="pet-meta">
          {pet.breed} &middot; {pet.age}
        </p>

        <p className="pet-description">
          {pet.description}
        </p>

        <div className="pet-extra">
          <span
            className={`pet-status ${
              pet.status === "Available"
                ? "available"
                : "reserved"
            }`}
          >
            {pet.status}
          </span>
        </div>

        <div className="pet-footer">
          <span className="pet-price">
            ₹{pet.price.toLocaleString("en-IN")}
          </span>

          <button
            className="btn-add"
            onClick={() => onAdd(pet)}
            data-testid="add-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetCard;