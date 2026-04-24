const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000/api'

export async function apiRequest(path, { method = 'GET', token, body } = {}) {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })

  const payload = await res.json()
  if (!res.ok || !payload.success) {
    const message = payload?.error || 'Request failed'
    if (res.status === 401 && message === 'Token expired') {
      window.dispatchEvent(new CustomEvent('studyforge:auth-expired'))
      throw new Error('Session expired. Please log in again.')
    }
    throw new Error(message)
  }
  return payload.data
}
