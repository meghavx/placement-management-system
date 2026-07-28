/*
Purpose
Lightweight global toast-notification system used across the app to
show success/error messages (e.g. "Profile Updated", "Drive Published")
without relying on browser alert().

Current Features
- notify(message, type) to push a toast
- Auto-dismiss after a few seconds

Future Features
- Backend Integration: trigger notify() from service-layer catch blocks
  once real API error responses are available.
*/

import { createContext, useCallback, useContext, useState } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const notify = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3500)
  }, [])

  const dismiss = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ toasts, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
