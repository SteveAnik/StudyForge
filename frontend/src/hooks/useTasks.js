import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '../api/client'
import { useAuth } from '../context/AuthContext'

export function useTasks(filters = {}) {
  const { auth } = useAuth()
  const params = new URLSearchParams(filters)
  const query = params.toString()
  return useQuery({
    queryKey: ['tasks', query],
    queryFn: () => apiRequest(`/tasks${query ? `?${query}` : ''}`, { token: auth.token }),
    enabled: Boolean(auth.token)
  })
}

export function useCreateTask() {
  const { auth } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body) => apiRequest('/tasks', { method: 'POST', token: auth.token, body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  })
}
