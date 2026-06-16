import { Navigate } from 'react-router-dom'
import { usePets } from '../context/PetContext'

// ProtectedRoute - redirects to login if not logged in
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = usePets()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
