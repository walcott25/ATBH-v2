import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

const SYSTEM_KEYS = ['_id', '_creationTime']

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

  const clean = Object.fromEntries(
    Object.entries(flags).filter(([k]) => !SYSTEM_KEYS.includes(k))
  )

  return { isLoading: false, ...clean } as typeof flags & { isLoading: boolean }
}
