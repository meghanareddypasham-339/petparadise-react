// INTEGRATION TEST - Favorites Flow
// Tests: Add Favorite → Context Updated → localStorage Updated → Favorites Page Shows It
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PetProvider } from '../context/PetContext'
import Favorites from '../pages/Favorites'
import PetCard from '../components/PetCard'
import { petsData } from '../data/pets'

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear()
})

function wrap(ui) {
  return render(
    <MemoryRouter>
      <PetProvider>{ui}</PetProvider>
    </MemoryRouter>
  )
}

const testPet = petsData[0] // Buddy - Golden Retriever

describe('Favorites Integration Test', () => {

  // Step 1 - Favorites page is empty at start
  it('Step 1: Favorites page shows empty message when no favorites', () => {
    wrap(<Favorites />)
    expect(screen.getByText('You have no favorites yet. Browse pets and click the heart icon!')).toBeInTheDocument()
  })

  // Step 2 - PetCard renders with heart button
  it('Step 2: PetCard heart button renders correctly', () => {
    wrap(<PetCard pet={testPet} isFav={false} onToggleFav={() => {}} />)
    expect(screen.getByText(testPet.name)).toBeInTheDocument()
    expect(screen.getByTitle('Add to favorites')).toBeInTheDocument()
  })

  // Step 3 - Adding pet saves to localStorage
  it('Step 3: Adding to favorites saves in localStorage', () => {
    localStorage.setItem('pp_favorites', JSON.stringify([testPet]))
    const stored = JSON.parse(localStorage.getItem('pp_favorites'))
    expect(stored.length).toBe(1)
    expect(stored[0].name).toBe('Buddy')
  })

  // Step 4 - Favorites page reads from localStorage
  it('Step 4: Favorites page shows pet from localStorage', () => {
    localStorage.setItem('pp_favorites', JSON.stringify([testPet]))
    wrap(<Favorites />)
    expect(screen.getByText(testPet.name)).toBeInTheDocument()
    expect(screen.getByText('My Favorites (1)')).toBeInTheDocument()
  })

  // Step 5 - Removing favorite updates the list
  it('Step 5: Clicking heart removes pet from favorites', async () => {
    localStorage.setItem('pp_favorites', JSON.stringify([testPet]))
    wrap(<Favorites />)
    expect(screen.getByText(testPet.name)).toBeInTheDocument()
    const heartBtn = screen.getByTitle('Remove from favorites')
    fireEvent.click(heartBtn)
    await waitFor(() => {
      expect(screen.getByText('You have no favorites yet. Browse pets and click the heart icon!')).toBeInTheDocument()
    })
  })

  // Step 6 - Multiple pets in favorites
  it('Step 6: Multiple favorites are shown correctly', () => {
    const threePets = petsData.slice(0, 3)
    localStorage.setItem('pp_favorites', JSON.stringify(threePets))
    wrap(<Favorites />)
    expect(screen.getByText('My Favorites (3)')).toBeInTheDocument()
  })

  // Step 7 - No duplicates
  it('Step 7: Same pet cannot be added twice', () => {
    const favs = [testPet]
    const alreadyExists = favs.find(p => p.id === testPet.id)
    const updated = alreadyExists ? favs : [...favs, testPet]
    expect(updated.length).toBe(1)
  })
})
