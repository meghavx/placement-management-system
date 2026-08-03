/*
Purpose
Renders the standalone login page using the reusable LoginCard component.

Current Features
- Displays the reusable login card centered on the page.

Future Features
- Authentication logic is implemented inside LoginCard.
*/

import LoginCard from '../../components/auth/LoginCard'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <LoginCard />
    </div>
  )
}