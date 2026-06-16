// Login page uses CONTROLLED COMPONENTS (useState for every input)
// Form VALIDATION is done before submitting
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { usePets } from '../context/PetContext'
import styles from './Login.module.css'

// Demo accounts
const ACCOUNTS = [
  { email: 'user@demo.com', password: 'user123', name: 'Demo User', isAdmin: false },
  { email: 'admin@demo.com', password: 'admin123', name: 'Admin User', isAdmin: true },
]

export default function Login() {
  const { login, user } = usePets()
  const navigate = useNavigate()

  // CONTROLLED component - every input is tied to state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')

  // If already logged in, redirect home
  if (user) {
    navigate('/')
    return null
  }

  // FORM VALIDATION
  function validate() {
    const errs = {}
    if (!email) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email'
    }
    if (!password) {
      errs.password = 'Password is required'
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters'
    }
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoginError('')

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const found = ACCOUNTS.find(a => a.email === email && a.password === password)
    if (!found) {
      setLoginError('Wrong email or password. Use the demo buttons below.')
      return
    }

    login(found)
    navigate('/')
  }

  function fillDemo(type) {
    const acc = ACCOUNTS.find(a => (type === 'admin') === a.isAdmin)
    setEmail(acc.email)
    setPassword(acc.password)
    setErrors({})
    setLoginError('')
  }

  return (
    <div className="page">
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.top}>
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=80&q=80"
              alt="pet"
              className={styles.topImg}
            />
            <h2>Welcome Back</h2>
            <p>Sign in to save favorites and manage adoptions</p>
          </div>

          {/* Demo account buttons */}
          <div className={styles.demoBtns}>
            <button onClick={() => fillDemo('user')} className={styles.demoBtn}>
              User Demo
            </button>
            <button onClick={() => fillDemo('admin')} className={styles.demoBtnAdmin}>
              Admin Demo
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#aaa', marginBottom: '16px' }}>
            Click above to auto-fill login details
          </p>

          {loginError && (
            <div className={styles.loginErr}>{loginError}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className={errors.email ? 'error' : ''}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                placeholder="you@example.com"
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={errors.password ? 'error' : ''}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })) }}
                placeholder="••••••"
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-orange" style={{ width: '100%', padding: '12px' }}>
              Sign In
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: '#888' }}>
            Want to adopt? <Link to="/adoption" style={{ color: '#e76f51' }}>Fill the adoption form</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
