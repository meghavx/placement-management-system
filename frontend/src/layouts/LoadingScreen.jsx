/*
========================================
Component: LoadingScreen

Purpose:
Full-page loading state, shown briefly while auth state is being
resolved on first app load.

Future Features
- None.
========================================
*/

import Loader from '../components/Loader'

export default function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Loader label="Loading application..." size={32} />
    </div>
  )
}
