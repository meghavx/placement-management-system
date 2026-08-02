import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { forgotPassword } from '../../services/authService'

import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'

import { ROUTES } from '../../constants/routes'
import { validateRequired } from '../../utils/validators'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Will be replaced with API responses later
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const validate = () => {
    const newErrors = {}

    if (!validateRequired(email)) {
      newErrors.email = 'Email is required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSuccessMessage('')
    setErrorMessage('')

    if (!validate()) return

    setLoading(true)

    try {
      const response = await forgotPassword(email)
      setSuccessMessage(
        response.message ||
        'Password reset link sent successfully.'
      )
    } catch (err) {
      setErrorMessage(err.message)
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

          <h1 className="text-xl font-semibold text-gray-900">
            Forgot Password
          </h1>

          <p className="text-sm text-gray-500">
            Enter your registered email address. We'll send you a password reset link.
          </p>
        </div>

        {successMessage && (
          <div className="mb-4">
            <Alert type="success" message={successMessage} />
          </div>
        )}

        {errorMessage && (
          <div className="mb-4">
            <Alert type="error" message={errorMessage} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@college.edu"
            required
            error={errors.email}
          />

          <Button
            type="submit"
            loading={loading}
            fullWidth
            className="bg-[#42e886]! hover:bg-[#28d0ac]! text-white"
          >
            Send Reset Link
          </Button>

        </form>

        <div className="mt-6 text-center">
          <Link
            to={ROUTES.LOGIN}
            className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
          >
            Back to Sign In
          </Link>
        </div>

      </div>
    </div>
  )
}