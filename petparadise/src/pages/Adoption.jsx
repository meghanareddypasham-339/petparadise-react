// Adoption page shows:
// 1. CONTROLLED components (useState for form inputs + validation)
// 2. UNCONTROLLED component (useRef for feedback textarea)
import { useState, useRef } from 'react'
import { usePets } from '../context/PetContext'
import styles from './Adoption.module.css'

export default function Adoption() {
  const { pets } = usePets()

  // CONTROLLED component state - every field tied to useState
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', petId: '', reason: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // UNCONTROLLED component - feedback box uses useRef (no state)
  const feedbackRef = useRef()

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // FORM VALIDATION
  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    else if (form.name.trim().length < 3) errs.name = 'Name must be at least 3 characters'

    if (!form.email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format'

    if (!form.phone) errs.phone = 'Phone number is required'

    if (!form.address.trim()) errs.address = 'Address is required'

    if (!form.petId) errs.petId = 'Please select a pet'

    if (!form.reason.trim()) errs.reason = 'Please tell us why you want this pet'

    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  // UNCONTROLLED - read directly from DOM using ref
  function handleFeedback() {
    const value = feedbackRef.current.value
    if (!value.trim()) {
      alert('Please write your feedback first.')
      return
    }
    alert('Thank you for your feedback: ' + value)
    feedbackRef.current.value = ''
  }

  const selectedPet = pets.find(p => p.id === parseInt(form.petId))

  if (submitted) {
    return (
      <div className="page">
        <div className="container">
          <div className={styles.success}>
            <img
              src={selectedPet?.image || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&q=80'}
              alt="adopted pet"
              className={styles.successImg}
            />
            <h2>Application Submitted!</h2>
            <p>
              Thank you, <strong>{form.name}</strong>! Your adoption request for{' '}
              <strong>{selectedPet?.name}</strong> has been received.
            </p>
            <p>We will contact you at <strong>{form.email}</strong> within 24-48 hours.</p>
            <button
              className="btn btn-orange"
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', address: '', petId: '', reason: '' }) }}
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <div className={styles.layout}>

          {/* Left - Form */}
          <div className={styles.formSide}>
            <h1 className="page-title">Adoption Form</h1>
            <p style={{ color: '#888', marginBottom: '24px', fontSize: '0.9rem' }}>
              Fill in the form below. We review all applications within 24-48 hours.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    className={errors.name ? 'error' : ''}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    className={errors.email ? 'error' : ''}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
              </div>

              <div className={styles.row}>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    className={errors.phone ? 'error' : ''}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 555 123 4567"
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>

                <div className="form-group">
                  <label>Pet Interested In *</label>
                  <select
                    name="petId"
                    className={errors.petId ? 'error' : ''}
                    value={form.petId}
                    onChange={handleChange}
                  >
                    <option value="">-- Select a Pet --</option>
                    {pets.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.breed}) - ${p.price}
                      </option>
                    ))}
                  </select>
                  {errors.petId && <div className="form-error">{errors.petId}</div>}
                </div>
              </div>

              <div className="form-group">
                <label>Home Address *</label>
                <input
                  name="address"
                  type="text"
                  className={errors.address ? 'error' : ''}
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main St, City"
                />
                {errors.address && <div className="form-error">{errors.address}</div>}
              </div>

              <div className="form-group">
                <label>Why do you want this pet? *</label>
                <textarea
                  name="reason"
                  rows={4}
                  className={errors.reason ? 'error' : ''}
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Tell us about your lifestyle and why you would be a great owner..."
                  style={{ resize: 'vertical' }}
                />
                {errors.reason && <div className="form-error">{errors.reason}</div>}
              </div>

              <button type="submit" className="btn btn-orange" style={{ width: '100%', padding: '12px', fontSize: '1rem' }}>
                Submit Application
              </button>
            </form>

            {/* UNCONTROLLED component using useRef */}
            <div className={styles.feedbackBox}>
              <h4>Quick Feedback <span style={{ color: '#aaa', fontWeight: 'normal', fontSize: '0.8rem' }}>(Uncontrolled - useRef)</span></h4>
              <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '10px' }}>
                Have a suggestion? We read every message.
              </p>
              <textarea
                ref={feedbackRef}
                rows={3}
                placeholder="Write your feedback here..."
                style={{ width: '100%', padding: '10px', border: '1.5px solid #ddd', borderRadius: '6px', fontSize: '0.85rem', resize: 'none', fontFamily: 'Arial' }}
              />
              <button
                className="btn btn-outline"
                style={{ marginTop: '10px' }}
                onClick={handleFeedback}
              >
                Send Feedback
              </button>
            </div>
          </div>

          {/* Right - Info sidebar */}
          <div className={styles.sidebar}>
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80"
              alt="pets"
              className={styles.sideImg}
            />
            <div className={styles.steps}>
              <h3>How It Works</h3>
              <div className={styles.step}>
                <div className={styles.stepNum}>1</div>
                <div>
                  <strong>Fill the Form</strong>
                  <p>Tell us about yourself and the pet you want.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>2</div>
                <div>
                  <strong>We Review</strong>
                  <p>Our team checks your application within 48 hours.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>3</div>
                <div>
                  <strong>Meet the Pet</strong>
                  <p>Visit us and meet your new pet before adoption.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>4</div>
                <div>
                  <strong>Take Home</strong>
                  <p>Complete paperwork and welcome your pet home!</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
