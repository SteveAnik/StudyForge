import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../api/client'
import { useAuth } from '../context/AuthContext'

export function usePracticeChallenges(topic) {
  const { auth } = useAuth()
  const query = topic ? `?topic=${encodeURIComponent(topic)}` : ''
  return useQuery({
    queryKey: ['practice-challenges', topic || 'all'],
    queryFn: () => apiRequest(`/practice/challenges${query}`, { token: auth.token }),
    enabled: Boolean(auth.token)
  })
}

export function useEvaluatePractice() {
  const { auth } = useAuth()
  return useMutation({
    mutationFn: (body) => apiRequest('/practice/evaluate', { method: 'POST', token: auth.token, body })
  })
}

export function useOverviewAnalytics() {
  const { auth } = useAuth()
  return useQuery({
    queryKey: ['analytics-overview'],
    queryFn: () => apiRequest('/analytics/overview', { token: auth.token }),
    enabled: Boolean(auth.token)
  })
}

export function useTopicAnalytics() {
  const { auth } = useAuth()
  return useQuery({
    queryKey: ['analytics-topics'],
    queryFn: () => apiRequest('/analytics/topics', { token: auth.token }),
    enabled: Boolean(auth.token)
  })
}
