/*
========================================
Component: NotFound

Purpose:
404 page shown for any unmatched route.

Future Features
- None.
========================================
*/

import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { ROUTES } from '../constants/routes'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-6 text-center">
      <h1 className="text-5xl font-bold text-primary-600">404</h1>
      <p className="text-gray-600">The page you are looking for does not exist.</p>
      <Link to={ROUTES.LOGIN}>
        <Button>Back to Login</Button>
      </Link>
    </div>
  )
}
