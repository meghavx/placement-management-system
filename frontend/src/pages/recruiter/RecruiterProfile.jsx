import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil } from 'lucide-react'

import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'

import { getRecruiterProfile } from '../../services/recruiterService'
import { useNotification } from '../../hooks/useNotification'
import { ROUTES } from '../../constants/routes'

export default function RecruiterProfile() {
  const navigate = useNavigate()
  const { notify } = useNotification()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getRecruiterProfile()
        setProfile(data)
      } catch (error) {
        console.error(error)
        notify('Failed to load profile.', 'error')
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
        <SkeletonLoader rows={8} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="My Profile"
        description="View your recruiter profile and company information."
        breadcrumb={['Dashboard', 'Profile']}
      />

      {/* ================= Header Card ================= */}

      <Card>
        <div className="flex flex-col gap-6 px-2 py-3 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-200 text-2xl font-bold text-white shadow-sm">
              {profile.fullName
                ?.split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>

              <h2 className="text-3xl font-bold text-gray-900">
                {profile.fullName}
              </h2>

              <p className="mt-1 text-lg text-gray-600">
                {profile.designation || '--'}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {profile.companyName || '--'}
              </p>

            </div>

          </div>

          <Button
            icon={Pencil}
            onClick={() => navigate(ROUTES.RECRUITER_PROFILE_FORM)}
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

            {/* ================= Company Information ================= */}

      <Card title="Company Information">

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3">

          {/* Company Highlight */}

          <div className="flex flex-col items-center justify-center rounded-xl border border-primary-100 bg-primary-50 p-6">

            <p className="text-sm font-medium text-primary-600">
              Company
            </p>

            <p className="mt-2 text-center text-3xl font-bold text-primary-700">
              {profile.companyName || '--'}
            </p>

            <p className="mt-2 text-xs text-primary-500">
              Organization
            </p>

          </div>

          {/* Company Details */}

          <div className="md:col-span-2 pl-6">

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Company ID
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  {profile.companyId ?? '--'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Designation
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  {profile.designation || '--'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Recruiter ID
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  {profile.id ?? '--'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  User ID
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  {profile.userId ?? '--'}
                </p>
              </div>

            </div>

          </div>

        </div>

      </Card>

    </div>
  )
}