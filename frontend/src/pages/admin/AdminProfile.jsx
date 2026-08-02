/*
==========================================
Component: AdminProfile

Purpose:
Displays the logged-in Placement Admin profile in a read-only format.

Current Features:
- Fetches profile from backend
- Personal information card
- Redirect to Edit Profile page

Future Backend Integration:
PUT /placement-admin/profile handled in AdminProfileForm.jsx
==========================================
*/

import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'

import { useNotification } from '../../hooks/useNotification'
import { ROUTES } from '../../constants/routes'

import { getAdminProfile } from '../../services/adminService'

export default function AdminProfile() {
  const navigate = useNavigate()
  const { notify } = useNotification()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile()
        setProfile(data)
      } catch (error) {
        console.error(error)
        notify('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader
          title="My Profile"
          breadcrumb={['Dashboard', 'Profile']}
        />

        <SkeletonLoader rows={6} />
      </div>
    )
  }
    return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="My Profile"
        description="View your personal information."
        breadcrumb={['Dashboard', 'Profile']}
      />

      {/* ================= Header Card ================= */}

      <Card>
        <div className="flex flex-col gap-6 px-2 py-3 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-5">

            {/* Avatar */}

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-200 text-2xl font-bold text-white shadow-sm">
              {profile.fullName
                ?.split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>

            {/* Admin Details */}

            <div>

              <h2 className="text-3xl font-bold text-gray-900">
                {profile.fullName}
              </h2>

              <p className="mt-1 text-lg text-gray-600">
                Placement Administrator
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Admin ID • {profile.id || '--'}
              </p>

            </div>

          </div>

          <Button
            icon={Pencil}
            onClick={() => navigate(ROUTES.ADMIN_PROFILE_FORM)}
          >
            Edit Profile
          </Button>

        </div>
      </Card>
            {/* ================= Personal Information ================= */}

      <Card title="Personal Information">

        <div className="grid grid-cols-1 gap-8 py-2 pl-4 md:grid-cols-3">

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="mt-1 text-base font-semibold text-gray-900">
              {profile.email || '--'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone Number
            </p>

            <p className="mt-1 text-base font-semibold text-gray-900">
              {profile.phoneNumber || '--'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                profile.active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {profile.active ? 'Active' : 'Inactive'}
            </span>

          </div>

        </div>

      </Card>

    </div>
  )
}