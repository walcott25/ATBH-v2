import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface FakeAuthUser {
  email: string
}

interface FakeAuthContextType {
  user: FakeAuthUser | null
  isLoggedIn: boolean
  signIn: (email: string) => void
  signOut: () => void
}

const FakeAuthContext = createContext<FakeAuthContextType | null>(null)

const STORAGE_KEY = 'atbh_fake_auth'

function loadUser(): FakeAuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

function saveUser(user: FakeAuthUser | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function FakeAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FakeAuthUser | null>(loadUser)

  const signIn = useCallback((email: string) => {
    const u = { email }
    setUser(u)
    saveUser(u)
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    saveUser(null)
  }, [])

  return (
    <FakeAuthContext.Provider value={{ user, isLoggedIn: !!user, signIn, signOut }}>
      {children}
    </FakeAuthContext.Provider>
  )
}

export function useFakeAuth() {
  const ctx = useContext(FakeAuthContext)
  if (!ctx) throw new Error('useFakeAuth must be used within FakeAuthProvider')
  return ctx
}
