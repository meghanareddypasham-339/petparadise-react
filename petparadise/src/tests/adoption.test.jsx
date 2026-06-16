// UNIT TEST 2 - Adoption Form Validation
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PetProvider } from '../context/PetContext'
import Adoption from '../pages/Adoption'

function renderAdoption() {
  return render(
    <MemoryRouter>
      <PetProvider>
        <Adoption />
      </PetProvider>
    </MemoryRouter>
  )
}

describe('Adoption Form Validation', () => {
  it('renders the adoption form', () => {
    renderAdoption()
    expect(screen.getByText('Adoption Form')).toBeInTheDocument()
  })

  it('shows error when name is empty', async () => {
    renderAdoption()
    fireEvent.click(screen.getByText('Submit Application'))
    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument()
    })
  })

  it('shows error when name is too short', async () => {
    renderAdoption()
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'AB' } })
    fireEvent.click(screen.getByText('Submit Application'))
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 3 characters')).toBeInTheDocument()
    })
  })

  it('shows error when email is empty', async () => {
    renderAdoption()
    fireEvent.click(screen.getByText('Submit Application'))
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
  })

  it('shows error for invalid email', async () => {
    renderAdoption()
    fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'bademail' } })
    fireEvent.click(screen.getByText('Submit Application'))
    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument()
    })
  })

  it('shows error when phone is empty', async () => {
    renderAdoption()
    fireEvent.click(screen.getByText('Submit Application'))
    await waitFor(() => {
      expect(screen.getByText('Phone number is required')).toBeInTheDocument()
    })
  })

  it('shows error when no pet selected', async () => {
    renderAdoption()
    fireEvent.click(screen.getByText('Submit Application'))
    await waitFor(() => {
      expect(screen.getByText('Please select a pet')).toBeInTheDocument()
    })
  })

  it('clears name error when user types', async () => {
    renderAdoption()
    fireEvent.click(screen.getByText('Submit Application'))
    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument()
    })
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'John' } })
    await waitFor(() => {
      expect(screen.queryByText('Full name is required')).not.toBeInTheDocument()
    })
  })

  it('renders feedback textarea (uncontrolled useRef)', () => {
    renderAdoption()
    expect(screen.getByPlaceholderText('Write your feedback here...')).toBeInTheDocument()
  })
})
