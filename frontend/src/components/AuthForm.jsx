import { useState } from 'react'
import { apiRequest } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function AuthForm() {
  const { login } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await apiRequest(isRegister ? '/auth/register' : '/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      login({ token: data.token, user: data.user })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={submit} className="card auth-card">
      <h2>{isRegister ? 'Create account' : 'Sign in'}</h2>
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error ? <p className="error">{error}</p> : null}
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      <button type="button" className="secondary" onClick={() => setIsRegister((v) => !v)}>
        {isRegister ? 'Have an account? Login' : 'Need an account? Register'}
      </button>
    </form>
  )
}
