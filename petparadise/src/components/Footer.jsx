import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.logo}>Pet Paradise</div>
          <p>Connecting pets with loving homes since 2020.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pets">All Pets</Link></li>
            <li><Link to="/adoption">Adopt</Link></li>
          </ul>
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            <li><Link to="/pets/dogs">Dogs</Link></li>
            <li><Link to="/pets/cats">Cats</Link></li>
            <li><Link to="/pets/birds">Birds</Link></li>
            <li><Link to="/pets/rabbits">Rabbits</Link></li>
            <li><Link to="/pets/fish">Fish</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>123 Paw Street, Pet City</p>
          <p>hello@petparadise.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>2024 Pet Paradise. All rights reserved.</p>
      </div>
    </footer>
  )
}
