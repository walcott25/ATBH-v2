import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export function useFeatureFlags() {
  const flags = useQuery(api.featureFlags.getAll)

  if (!flags) {
    return {
      isLoading: true,
      maintenance: false,
      chatbot: true,
      whatsapp: true,
      notifications: true,
      donate: true,
      gallery: true,
      blog: true,
      events: true,
      experience: true,
      tripPlanner: true,
      map: true,
    }
  }

  return { isLoading: false, ...flags }
}
