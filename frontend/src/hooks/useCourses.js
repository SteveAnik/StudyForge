import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '../api/client'
import { useAuth } from '../context/AuthContext'

export function useCourses() {
  const { auth } = useAuth()
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => apiRequest('/courses', { token: auth.token }),
    enabled: Boolean(auth.token)
  })
}

export function useCreateCourse() {
  const { auth } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body) => apiRequest('/courses', { method: 'POST', token: auth.token, body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] })
  })
}
