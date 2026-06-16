// Pets is a SMART / Container Component
// It handles all the state: search, filter, sort
// Then passes results down to PetCard (dumb component)
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePets } from '../context/PetContext'
import PetCard from '../components/PetCard'
import SearchBar from '../components/SearchBar'
import styles from './Pets.module.css'

export default function Pets() {
  const { pets, isFavorite, addFavorite, removeFavorite } = usePets()
  const { category } = useParams()

  // Controlled component state (useState)
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState(category || 'all')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [sortBy, setSortBy] = useState('default')

  function handleToggle(pet) {
    isFavorite(pet.id) ? removeFavorite(pet.id) : addFavorite(pet)
  }

  // Derived state - computed from the filter inputs above
  let filtered = [...pets]

  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (selectedCat !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCat)
  }

  filtered = filtered.filter(p => p.price <= maxPrice)

  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price)
  if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">All Pets ({filtered.length} found)</h1>

        {/* Filters */}
        <div className={styles.filters}>
          <SearchBar value={search} onChange={setSearch} />

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Categories</option>
            <option value="dogs">Dogs</option>
            <option value="cats">Cats</option>
            <option value="birds">Birds</option>
            <option value="rabbits">Rabbits</option>
            <option value="fish">Fish</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className={styles.priceRow}>
          <label>Max Price: <strong style={{ color: '#e76f51' }}>${maxPrice}</strong></label>
          <input
            type="range"
            min={10}
            max={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className={styles.range}
          />
        </div>

        {/* Pet cards grid - passes data to PetCard (dumb component) */}
        {filtered.length > 0 ? (
          <div className="pets-grid">
            {filtered.map(pet => (
              <PetCard
                key={pet.id}
                pet={pet}
                isFav={isFavorite(pet.id)}
                onToggleFav={handleToggle}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80"
              alt="no results"
            />
            <p>No pets found. Try different filters.</p>
            <button
              className="btn btn-orange"
              onClick={() => { setSearch(''); setSelectedCat('all'); setMaxPrice(5000); setSortBy('default') }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
