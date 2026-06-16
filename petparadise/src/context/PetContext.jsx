import { createContext, useContext, useState, useEffect } from 'react'
import { petsData } from '../data/pets'

// 1. Create the context
const PetContext = createContext()

// 2. Provider component - wraps the whole app
export function PetProvider({ children }) {

  // --- FAVORITES (saved in localStorage) ---
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('pp_favorites')
    return saved ? JSON.parse(saved) : []
  })

  // useEffect saves favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pp_favorites', JSON.stringify(favorites))
  }, [favorites])

  function addFavorite(pet) {
    setFavorites(prev => {
      if (prev.find(p => p.id === pet.id)) return prev
      return [...prev, pet]
    })
  }

  function removeFavorite(petId) {
    setFavorites(prev => prev.filter(p => p.id !== petId))
  }

  function isFavorite(petId) {
    return favorites.some(p => p.id === petId)
  }

  // --- USER LOGIN (saved in localStorage) ---
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pp_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    localStorage.setItem('pp_user', JSON.stringify(user))
  }, [user])

  function login(userData) {
    setUser(userData)
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('pp_user')
  }

  // --- PETS (admin can add/edit/delete) ---
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('pp_pets')
    return saved ? JSON.parse(saved) : petsData
  })

  useEffect(() => {
    localStorage.setItem('pp_pets', JSON.stringify(pets))
  }, [pets])

  function addPet(pet) {
    const newPet = { ...pet, id: Date.now() }
    setPets(prev => [...prev, newPet])
  }

  function updatePet(id, updated) {
    setPets(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p))
  }

  function deletePet(id) {
    setPets(prev => prev.filter(p => p.id !== id))
  }

  // Share everything through context
  return (
    <PetContext.Provider value={{
      pets, addPet, updatePet, deletePet,
      favorites, addFavorite, removeFavorite, isFavorite,
      user, login, logout
    }}>
      {children}
    </PetContext.Provider>
  )
}

// 3. Custom hook to use the context
export function usePets() {
  return useContext(PetContext)
}
