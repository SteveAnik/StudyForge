import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem('studyforge_auth')
    return raw ? JSON.parse(raw) : { token: null, user: null }
  })

  useEffect(() => {
    function handleExpired() {
      localStorage.removeItem('studyforge_auth')
      setAuth({ token: null, user: null })
    }
    window.addEventListener('studyforge:auth-expired', handleExpired)
    return () => window.removeEventListener('studyforge:auth-expired', handleExpired)
  }, [])

  const value = useMemo(() => ({
    auth,
    login: (next) => {
      localStorage.setItem('studyforge_auth', JSON.stringify(next))
      setAuth(next)
    },
    logout: () => {
      localStorage.removeItem('studyforge_auth')
      setAuth({ token: null, user: null })
    }
  }), [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}
