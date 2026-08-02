import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

import PasswordInput from '../../components/PasswordInput'
import Button from '../../components/Button'
import Alert from '../../components/Alert'

import { ROUTES } from '../../constants/routes'
import { validateRequired } from '../../utils/validators'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()

  // We'll use this during API integration
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const validate = () => {
    const newErrors = {}

    if (!validateRequired(newPassword)) {
      newErrors.newPassword = 'New password is required.'
    }

    if (!validateRequired(confirmPassword)) {
      newErrors.confirmPassword = 'Please confirm your password.'
    }

    if (
      newPassword &&
      confirmPassword &&
      newPassword !== confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match.'
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
      // TODO:
      // await resetPassword(token, newPassword)

      setSuccessMessage(
  'Password reset successful. You can now sign in with your new password.'
)

    } catch (err) {
      setErrorMessage(
        err.message || 'Unable to reset password.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <span className="rounded-full bg-primary-50 p-3 text-primary-600">
              <GraduationCap size={28} />
            </span>

            <h1 className="text-xl font-semibold text-gray-900">
              Invalid Reset Link
            </h1>

            <p className="text-sm text-gray-500">
              This password reset link is invalid or missing.
            </p>
          </div>

          <Link to={ROUTES.FORGOT_PASSWORD}>
            <Button fullWidth>
              Request New Link
            </Button>
          </Link>

        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="rounded-full bg-primary-50 p-3 text-primary-600">
            <GraduationCap size={28} />
          </span>

          <h1 className="text-xl font-semibold text-gray-900">
            Reset Password
          </h1>

          <p className="text-sm text-gray-500">
            Enter your new password below.
          </p>
        </div>

        {successMessage ? (
  <div className="space-y-6">
    <Alert
      type="success"
      message={successMessage}
    />

    <Link to={ROUTES.LOGIN}>
      <Button
        fullWidth
        className="bg-[#42e886]! hover:bg-[#28d0ac]! text-white"
      >
        Go to Sign In
      </Button>
    </Link>
  </div>
) : (
  <>
    {errorMessage && (
      <div className="mb-4">
        <Alert type="error" message={errorMessage} />
      </div>
    )}

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate
    >
      <PasswordInput
        label="New Password"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        required
        error={errors.newPassword}
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        required
        error={errors.confirmPassword}
      />

      <Button
        type="submit"
        loading={loading}
        fullWidth
        className="bg-[#42e886]! hover:bg-[#28d0ac]! text-white"
      >
        Reset Password
      </Button>
    </form>
  </>
)}

        {!successMessage && (
  <div className="mt-6 text-center">
    <Link
      to={ROUTES.LOGIN}
      className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
    >
      Back to Sign In
    </Link>
  </div>
)}

      </div>
    </div>
  )
}