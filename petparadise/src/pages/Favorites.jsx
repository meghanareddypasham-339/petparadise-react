import { Link } from 'react-router-dom'
import { usePets } from '../context/PetContext'
import PetCard from '../components/PetCard'

// Favorites is a Protected Route - only logged-in users can see it
export default function Favorites() {
  const { favorites, isFavorite, addFavorite, removeFavorite } = usePets()

  function handleToggle(pet) {
    isFavorite(pet.id) ? removeFavorite(pet.id) : addFavorite(pet)
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">My Favorites ({favorites.length})</h1>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=300&q=80"
              alt="no favorites"
            />
            <p>You have no favorites yet. Browse pets and click the heart icon!</p>
            <Link to="/pets" className="btn btn-orange">Browse Pets</Link>
          </div>
        ) : (
          <>
            <p style={{ color: '#888', marginBottom: '20px', fontSize: '0.9rem' }}>
              Click the heart icon on any card to remove it from favorites.
            </p>
            <div className="pets-grid">
              {favorites.map(pet => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  isFav={true}
                  onToggleFav={handleToggle}
                />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <Link to="/adoption" className="btn btn-orange">Adopt One of These Pets</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
