import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import Input from '../../components/Input'
import PasswordInput from '../../components/PasswordInput'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import { useAuth } from '../../hooks/useAuth'
import { ROLE_HOME_ROUTE } from '../../routes/sidebarMenus'
import { ROLES } from '../../constants/roles'
import { validateRequired } from '../../utils/validators'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const role = ROLES.SUPER_ADMIN
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
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
          <p className="text-sm text-gray-500">Sign in as Super Administrator</p>
        </div>

        {loginError && <div className="mb-4"><Alert type="error" message={loginError} /></div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
      </div>
    </div>
  )
}

// TODO:
// This page intentionally duplicates LoginPage to avoid refactoring
// the authentication flow close to release.
// Consider extracting a shared LoginForm after the project deadline.