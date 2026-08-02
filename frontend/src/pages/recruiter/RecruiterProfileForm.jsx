/*
==========================================
Component: RecruiterProfileForm

Purpose:
Allows recruiters to update their personal profile.

Editable:
- Full Name
- Phone Number

Read Only:
- Email
- Company
- Designation
- Status

Backend:
GET /recruiter/profile
PUT /recruiter/profile
==========================================
*/

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'

import {
  getRecruiterProfile,
  updateRecruiterProfile,
} from '../../services/recruiterService'

import { useNotification } from '../../hooks/useNotification'
import { useAuth } from '../../hooks/useAuth'

import {
  validateRequired,
  validatePhone,
} from '../../utils/validators'

import { ROUTES } from '../../constants/routes'

export default function RecruiterProfileForm() {
  const navigate = useNavigate()
  const { notify } = useNotification()
  const { updateUser } = useAuth()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

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

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!validateRequired(profile.fullName)) {
      newErrors.fullName = 'Full name is required.'
    }

    if (!validatePhone(profile.phoneNumber)) {
      newErrors.phoneNumber =
        'Enter a valid 10-digit phone number.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return

    setSaving(true)

    try {
      await updateRecruiterProfile({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
      })

      updateUser({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
      })

      notify('Profile updated successfully.')

      navigate(ROUTES.RECRUITER_PROFILE)
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
        <SkeletonLoader rows={8} />
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

      {/* Personal Information */}

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

            {/* Company Information */}

      <Card title="Company Information">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <Input
            label="Company"
            value={profile.companyName}
            disabled
            className="opacity-70"
          />

          <Input
            label="Designation"
            value={profile.designation}
            disabled
            className="opacity-70"
          />

        </div>

      </Card>

      <div className="flex justify-end gap-3">

        <Button
          variant="outline"
          onClick={() => window.history.back()}
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