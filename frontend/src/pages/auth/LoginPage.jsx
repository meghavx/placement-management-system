/*
Purpose
The single entry point of the application. Authenticates the user via
the mock authService and redirects to the correct role dashboard,
matching the Authentication Flow described in the spec.

Current Features
- Role / Email / Password form with validation
- Role must be selected from a dropdown (Student, Recruiter, Placement
  Admin) and must match the account's actual role, or login fails
- Loading state on submit
- Error message on invalid credentials or role mismatch
- Demo credential hints for each role (frontend-only aid)

Future Features
- Backend Integration:
  Endpoint: POST /api/auth/login
  Request: { username, password, role }
  Response: { token, role, fullName, email }
  Loading State: already implemented (`loading` state below).
  Error Handling: already implemented (`error` state below).
  JWT: store response.token via useAuth/useLocalStorage; attach it to
  apiClient's Authorization header (see services/apiClient.js).
  Files To Modify: services/authService.js only.
*/

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import Input from '../../components/Input'
import PasswordInput from '../../components/PasswordInput'
import Dropdown from '../../components/Dropdown'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import { useAuth } from '../../hooks/useAuth'
import { ROLE_HOME_ROUTE } from '../../routes/sidebarMenus'
import { ROLES } from '../../constants/roles'
import { validateRequired } from '../../utils/validators'

// Only these three roles are selectable at login, per product decision.
// Super Admin accounts are provisioned separately and do not appear here.
const ROLE_OPTIONS = [
  { label: 'Student', value: ROLES.STUDENT },
  { label: 'Recruiter', value: ROLES.RECRUITER },
  { label: 'Placement Admin', value: ROLES.PLACEMENT_ADMIN },
  { label: 'Super Admin', value: ROLES.SUPER_ADMIN },
]

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [role, setRole] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!validateRequired(role)) newErrors.role = 'Please select a role.'
    if (!validateRequired(username)) newErrors.username = 'Email is required.'
    if (!validateRequired(password)) newErrors.password = 'Password is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError('')
    if (!validate()) return

    setLoading(true)
    try {
      // login() rejects if role does not match this account's actual role.
      const loggedInUser = await login(username, password, role)
      navigate(ROLE_HOME_ROUTE[loggedInUser.role])
    } catch (err) {
      setLoginError(err.message || 'Invalid email, password, or role selected.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="rounded-full bg-primary-50 p-3 text-primary-600">
            <GraduationCap size={28} />
          </span>
          <h1 className="text-xl font-semibold text-gray-900">College Placement Management Portal</h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>

        {loginError && <div className="mb-4"><Alert type="error" message={loginError} /></div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Dropdown
            label="Role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={ROLE_OPTIONS}
            placeholder="Select your role"
            required
            error={errors.role}
          />
          <Input
            label="Email"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="you@college.edu"
            required
            error={errors.username}
          />
          <PasswordInput
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            error={errors.password}
          />

          <Button type="submit" loading={loading} fullWidth className="bg-[#42e886]! hover:bg-[#28d0ac]! text-white">
            Log In
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
          <p className="mb-1 font-medium text-gray-600">Demo credentials (password: password123):</p>
          <p>Role: Student → student@college.edu</p>
          <p>Role: Recruiter → recruiter@techcorp.com</p>
          <p>Role: Placement Admin → admin@college.edu</p>
        </div>
      </div>
    </div>
  )
}
