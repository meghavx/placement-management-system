// /*
// Purpose
// Provides the current authenticated (mock) user and login/logout actions
// to any component in the tree. Wraps authService so components never
// call the service directly outside this hook.

// Current Features
// - login(username, password, selectedRole) using the mock authService —
//   selectedRole must match the account's actual role or login fails.
// - logout()
// - Exposes user, role, isAuthenticated

// Future Features
// - Backend Integration:
//   - Replace authService.login with a real POST /api/auth/login call.
//   - Store the returned JWT token (instead of a dummy user object).
//   - Attach the token to Axios default headers for subsequent requests.
// */

// import { createContext, useContext } from 'react'
// import { useLocalStorage } from './useLocalStorage'
// import { loginUser, logoutUser } from '../services/authService'

// const AuthContext = createContext(null)

// export function AuthProvider({ children }) {
//   const [user, setUser] = useLocalStorage('pms_user', null)

//   const login = async (username, password, selectedRole) => {
//     const loggedInUser = await loginUser(username, password, selectedRole)
//     setUser(loggedInUser)
//     return loggedInUser
//   }

//   const logout = () => {
//     logoutUser()
//     setUser(null)
//   }

//   const value = {
//     user,
//     role: user?.role || null,
//     isAuthenticated: !!user,
//     login,
//     logout,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }


import { createContext, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { loginUser, logoutUser } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('pms_user', null)

  const login = async (username, password, selectedRole) => {
    const loggedInUser = await loginUser(username, password, selectedRole)

    // Store the complete user object returned by the backend
    setUser(loggedInUser)

    return loggedInUser
  }

  const updateUser = (updatedFields) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields,
    }))
  }

  const logout = async () => {
    try {
      await logoutUser()
    } finally {
      setUser(null)
    }
  }

  const value = {
    user,
    role: user?.role ?? null,
    accessToken: user?.accessToken ?? null,
    isAuthenticated: !!user?.accessToken,
    login,
    logout,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}