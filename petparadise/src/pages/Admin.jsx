// Admin page - only accessible by admin users (Protected Route + adminOnly)
// Demonstrates: Add, Edit, Delete pets
import { useState } from 'react'
import { usePets } from '../context/PetContext'
import styles from './Admin.module.css'

const empty = { name: '', breed: '', category: 'dogs', age: '', gender: 'Male', price: '', vaccinated: true, image: '', description: '' }

export default function Admin() {
  const { pets, addPet, updatePet, deletePet } = usePets()
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(empty)
  const [formErrors, setFormErrors] = useState({})
  const [toast, setToast] = useState('')

  function showMsg(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.breed.trim()) errs.breed = 'Breed is required'
    if (!form.age.trim()) errs.age = 'Age is required'
    if (!form.price || isNaN(form.price)) errs.price = 'Valid price is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    return errs
  }

  function handleSave(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return }

    const petData = { ...form, price: Number(form.price) }

    if (editId) {
      updatePet(editId, petData)
      showMsg('Pet updated successfully!')
    } else {
      addPet(petData)
      showMsg('Pet added successfully!')
    }

    setForm(empty)
    setEditId(null)
    setShowForm(false)
  }

  function handleEdit(pet) {
    setForm({ ...pet })
    setEditId(pet.id)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  function handleDelete(pet) {
    if (window.confirm('Delete ' + pet.name + '?')) {
      deletePet(pet.id)
      showMsg(pet.name + ' deleted.')
    }
  }

  function handleCancel() {
    setForm(empty)
    setEditId(null)
    setShowForm(false)
    setFormErrors({})
  }

  return (
    <div className="page">
      <div className="container">

        <div className={styles.header}>
          <h1 className="page-title" style={{ margin: 0 }}>Admin Dashboard</h1>
          <button className="btn btn-orange" onClick={() => { setShowForm(!showForm); setEditId(null); setForm(empty) }}>
            {showForm ? 'Cancel' : '+ Add New Pet'}
          </button>
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <form className={styles.form} onSubmit={handleSave} noValidate>
            <h3 className={styles.formTitle}>{editId ? 'Edit Pet' : 'Add New Pet'}</h3>

            <div className={styles.formGrid}>
              <div className="form-group">
                <label>Pet Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Buddy" className={formErrors.name ? 'error' : ''} />
                {formErrors.name && <div className="form-error">{formErrors.name}</div>}
              </div>

              <div className="form-group">
                <label>Breed *</label>
                <input name="breed" value={form.breed} onChange={handleChange} placeholder="e.g. Golden Retriever" className={formErrors.breed ? 'error' : ''} />
                {formErrors.breed && <div className="form-error">{formErrors.breed}</div>}
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option value="dogs">Dogs</option>
                  <option value="cats">Cats</option>
                  <option value="birds">Birds</option>
                  <option value="rabbits">Rabbits</option>
                  <option value="fish">Fish</option>
                </select>
              </div>

              <div className="form-group">
                <label>Age *</label>
                <input name="age" value={form.age} onChange={handleChange} placeholder="e.g. 2 years" className={formErrors.age ? 'error' : ''} />
                {formErrors.age && <div className="form-error">{formErrors.age}</div>}
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price ($) *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 1200" className={formErrors.price ? 'error' : ''} />
                {formErrors.price && <div className="form-error">{formErrors.price}</div>}
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Description *</label>
                <textarea name="description" rows={3} value={form.description} onChange={handleChange} placeholder="Describe the pet..." style={{ resize: 'vertical' }} className={formErrors.description ? 'error' : ''} />
                {formErrors.description && <div className="form-error">{formErrors.description}</div>}
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" name="vaccinated" checked={form.vaccinated} onChange={handleChange} />
                  Vaccinated
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button type="submit" className="btn btn-orange">{editId ? 'Save Changes' : 'Add Pet'}</button>
              <button type="button" className="btn btn-outline" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        )}

        {/* Pets Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pet</th>
                <th>Breed</th>
                <th>Category</th>
                <th>Price</th>
                <th>Vaccinated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map(pet => (
                <tr key={pet.id}>
                  <td>
                    <div className={styles.petCell}>
                      <img
                        src={pet.image}
                        alt={pet.name}
                        onError={(e) => { e.target.src = 'https://placehold.co/40?text=pet' }}
                      />
                      <span>{pet.name}</span>
                    </div>
                  </td>
                  <td style={{ color: '#888', fontSize: '0.85rem' }}>{pet.breed}</td>
                  <td><span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>{pet.category}</span></td>
                  <td><strong>${pet.price}</strong></td>
                  <td>
                    <span className={`badge ${pet.vaccinated ? 'badge-green' : 'badge-red'}`}>
                      {pet.vaccinated ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => handleEdit(pet)}>Edit</button>
                      <button className={styles.delBtn} onClick={() => handleDelete(pet)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Toast notification */}
        {toast && <div className={styles.toast}>{toast}</div>}
      </div>
    </div>
  )
}
