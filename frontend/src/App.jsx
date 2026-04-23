import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthForm from './components/AuthForm'
import { AuthProvider, useAuth } from './context/AuthContext'
import DashboardPage from './pages/DashboardPage'

const queryClient = new QueryClient()

function AppInner() {
  const { auth } = useAuth()

  if (!auth.token) {
    return (
      <div className="center">
        <div className="auth-shell">
          <div className="brand-block">
            <p className="eyebrow">Student Productivity Platform</p>
            <h1>StudyForge</h1>
            <p className="subtitle">Plan coursework, practice algorithms, and track mastery with a professional study workspace.</p>
          </div>
          <AuthForm />
        </div>
      </div>
    )
  }

  return <DashboardPage />
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </QueryClientProvider>
  )
}
