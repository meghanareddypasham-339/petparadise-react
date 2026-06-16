import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePets } from '../context/PetContext'
import { careTips } from '../data/pets'
import styles from './PetDetails.module.css'

export default function PetDetails({ tab }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { pets, isFavorite, addFavorite, removeFavorite } = usePets()

  // Active tab state
  const [activeTab, setActiveTab] = useState(tab || 'overview')

  const pet = pets.find(p => p.id === parseInt(id))

  // If pet not found
  if (!pet) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80"
              alt="not found"
            />
            <p>Pet not found.</p>
            <Link to="/pets" className="btn btn-orange">Back to Pets</Link>
          </div>
        </div>
      </div>
    )
  }

  const fav = isFavorite(pet.id)
  const tips = careTips[pet.category] || []

  return (
    <div className="page">
      <div className="container">

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link> &gt; <Link to="/pets">Pets</Link> &gt; <Link to={`/pets/${pet.category}`}>{pet.category}</Link> &gt; {pet.name}
        </div>

        <div className={styles.grid}>
          {/* Left - Image */}
          <div>
            <img
              src={pet.image}
              alt={pet.name}
              className={styles.mainImg}
              onError={(e) => { e.target.src = 'https://placehold.co/500x400?text=No+Image' }}
            />
          </div>

          {/* Right - Info */}
          <div className={styles.info}>
            <p className={styles.category}>{pet.category.toUpperCase()}</p>
            <h1 className={styles.name}>{pet.name}</h1>
            <p className={styles.breed}>{pet.breed}</p>

            <div className={styles.price}>${pet.price}</div>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <small>Age</small>
                <strong>{pet.age}</strong>
              </div>
              <div className={styles.metaItem}>
                <small>Gender</small>
                <strong>{pet.gender}</strong>
              </div>
              <div className={styles.metaItem}>
                <small>Category</small>
                <strong style={{ textTransform: 'capitalize' }}>{pet.category}</strong>
              </div>
              <div className={styles.metaItem}>
                <small>Vaccination</small>
                <span className={`badge ${pet.vaccinated ? 'badge-green' : 'badge-red'}`}>
                  {pet.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                </span>
              </div>
            </div>

            <p className={styles.desc}>{pet.description}</p>

            <div className={styles.btns}>
              <Link to="/adoption" className="btn btn-orange">Adopt {pet.name}</Link>
              <button
                className="btn btn-outline"
                onClick={() => fav ? removeFavorite(pet.id) : addFavorite(pet)}
              >
                {fav ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button className="btn" style={{ background: '#eee' }} onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Tabs - Nested Routes equivalent */}
        <div className={styles.tabs}>
          {['overview', 'care', 'reviews', 'vaccination'].map(t => (
            <button
              key={t}
              className={`${styles.tab} ${activeTab === t ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <div>
              <h3>About {pet.name}</h3>
              <p style={{ color: '#666', marginTop: '10px', lineHeight: '1.7' }}>{pet.description}</p>
              <p style={{ color: '#888', marginTop: '10px', fontSize: '0.9rem' }}>
                Price: <strong>${pet.price}</strong> &nbsp;|&nbsp; Age: <strong>{pet.age}</strong> &nbsp;|&nbsp; Gender: <strong>{pet.gender}</strong>
              </p>
            </div>
          )}

          {activeTab === 'care' && (
            <div>
              <h3>Care Tips for {pet.breed}</h3>
              <ul className={styles.careList}>
                {tips.map(tip => (
                  <li key={tip} className={styles.careTip}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3>Customer Reviews</h3>
              {[
                { name: 'Alex P.', text: `Absolutely love ${pet.name}! Best pet ever.`, stars: 5 },
                { name: 'Maria L.', text: `${pet.name} is so well-behaved. Highly recommend!`, stars: 5 },
                { name: 'Tom R.', text: 'Great experience. The team was very helpful.', stars: 4 },
              ].map(r => (
                <div key={r.name} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <strong>{r.name}</strong>
                    <span style={{ color: '#f59e0b' }}>{'★'.repeat(r.stars)}</span>
                  </div>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'vaccination' && (
            <div>
              <h3>Vaccination Record</h3>
              {pet.vaccinated ? (
                <table className={styles.vaccTable}>
                  <thead>
                    <tr><th>Vaccine</th><th>Date</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {['Rabies', 'Distemper', 'Bordetella', 'Parvovirus'].map(v => (
                      <tr key={v}>
                        <td>{v}</td>
                        <td>Jan 2024</td>
                        <td><span className="badge badge-green">Done</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: '#888', marginTop: '10px' }}>
                  Vaccination records not available. Please contact us for more information.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
