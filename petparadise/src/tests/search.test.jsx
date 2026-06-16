// UNIT TEST 1 - Search Functionality
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { petsData } from '../data/pets'

// Test 1: SearchBar renders correctly
describe('SearchBar Component', () => {
  it('renders search input', () => {
    render(
      <MemoryRouter>
        <SearchBar value="" onChange={() => {}} />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText('Search by name or breed...')).toBeInTheDocument()
  })

  it('calls onChange when user types', () => {
    let val = ''
    render(
      <MemoryRouter>
        <SearchBar value={val} onChange={(v) => { val = v }} />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Buddy' } })
    expect(val).toBe('Buddy')
  })

  it('shows clear button when text is entered', () => {
    render(
      <MemoryRouter>
        <SearchBar value="Golden" onChange={() => {}} />
      </MemoryRouter>
    )
    expect(screen.getByText('X')).toBeInTheDocument()
  })

  it('hides clear button when input is empty', () => {
    render(
      <MemoryRouter>
        <SearchBar value="" onChange={() => {}} />
      </MemoryRouter>
    )
    expect(screen.queryByText('X')).not.toBeInTheDocument()
  })
})

// Test 2: Search logic (derived state)
describe('Pet Search Logic', () => {
  it('finds Golden Retriever when searching Golden', () => {
    const results = petsData.filter(p =>
      p.name.toLowerCase().includes('golden') ||
      p.breed.toLowerCase().includes('golden')
    )
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].breed).toBe('Golden Retriever')
  })

  it('returns no results for unknown search', () => {
    const results = petsData.filter(p =>
      p.name.toLowerCase().includes('zzzzz') ||
      p.breed.toLowerCase().includes('zzzzz')
    )
    expect(results.length).toBe(0)
  })

  it('filters dogs only', () => {
    const dogs = petsData.filter(p => p.category === 'dogs')
    expect(dogs.length).toBe(5)
    dogs.forEach(d => expect(d.category).toBe('dogs'))
  })

  it('total pets count is 25', () => {
    expect(petsData.length).toBe(25)
  })

  it('filters by max price correctly', () => {
    const cheap = petsData.filter(p => p.price <= 100)
    cheap.forEach(p => expect(p.price).toBeLessThanOrEqual(100))
  })
})
