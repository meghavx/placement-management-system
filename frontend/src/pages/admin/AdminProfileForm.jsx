/*
==========================================
Component: AdminProfileForm

Purpose:
Allows Placement Admins to update their profile information.

Current Features:
- Editable Full Name
- Editable Phone Number
- Email & Status read-only
- Validation
- Save Changes

Future Backend Integration:
GET /placement-admin/profile
PUT /placement-admin/profile
==========================================
*/

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'

import { useNotification } from '../../hooks/useNotification'
import { useAuth } from '../../hooks/useAuth'

import { ROUTES } from '../../constants/routes'

import {
  getAdminProfile,
  updateAdminProfile,
} from '../../services/adminService'

import {
  validatePhone,
  validateRequired,
} from '../../utils/validators'

export default function AdminProfileForm() {
  const navigate = useNavigate()

  const { notify } = useNotification()
  const { updateUser } = useAuth()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile()
        setProfile(data)
      } catch (error) {
        console.error(error)
        notify('Failed to load profile.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!validateRequired(profile.fullName))
      newErrors.fullName = 'Full name is required.'

    if (!validatePhone(profile.phoneNumber))
      newErrors.phoneNumber =
        'Enter a valid 10-digit phone number.'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return

    setSaving(true)

    try {
      await updateAdminProfile(profile)

      updateUser({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
      })

      notify('Profile updated successfully.')

      navigate(ROUTES.ADMIN_PROFILE)
    } catch (error) {
      notify(error.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Edit Profile"
          breadcrumb={['Dashboard', 'Profile', 'Edit']}
        />

        <SkeletonLoader rows={5} />
      </div>
    )
  }
    return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Edit Profile"
        description="Update the information that can be modified."
        breadcrumb={['Dashboard', 'Profile', 'Edit']}
      />

      <Card title="Personal Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Full Name"
            value={profile.fullName}
            onChange={(e) =>
              handleChange('fullName', e.target.value)
            }
            required
            error={errors.fullName}
          />

          <Input
            label="Email"
            value={profile.email}
            disabled
            className="opacity-70"
          />

          <Input
            label="Phone Number"
            value={profile.phoneNumber}
            onChange={(e) =>
              handleChange('phoneNumber', e.target.value)
            }
            required
            error={errors.phoneNumber}
          />

          <Input
            label="Status"
            value={profile.active ? 'Active' : 'Inactive'}
            disabled
            className="opacity-70"
          />
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => navigate(ROUTES.ADMIN_PROFILE)}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          loading={saving}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}