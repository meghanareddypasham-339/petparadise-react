import { Link, useNavigate } from 'react-router-dom'
import { usePets } from '../context/PetContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout, favorites } = usePets()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=60&q=80"
            alt="logo"
            className={styles.logoImg}
          />
          Pet Paradise
        </Link>

        <ul className={styles.links}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pets">All Pets</Link></li>
          <li><Link to="/adoption">Adopt</Link></li>
          <li>
            <Link to="/favorites">
              Favorites
              {favorites.length > 0 && (
                <span className={styles.count}>{favorites.length}</span>
              )}
            </Link>
          </li>
          {user?.isAdmin && <li><Link to="/admin">Admin</Link></li>}
        </ul>

        <div className={styles.authArea}>
          {user ? (
            <>
              <span className={styles.username}>Hi, {user.name}</span>
              <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-orange">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
