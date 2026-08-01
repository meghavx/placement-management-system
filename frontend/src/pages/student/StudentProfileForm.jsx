/*
==========================================
Component: StudentProfileForm

Purpose:
Allows students to view and update personal information, academic
information, skills, and certifications (FR-4.3.1, FR-4.3.2).

Current Features:
- Editable personal & academic information forms with validation
- Dynamic skill chips (add/remove)
- Certification cards
- Save Changes with success toast

Future Backend Integration:
GET /student/profile to load, PUT /student/profile to save.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getStudentProfile, updateStudentProfile } from '../../services/studentService'
import { useNotification } from '../../hooks/useNotification'
import { validateEmail, validatePhone, validateCGPA, validateRequired } from '../../utils/validators'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export default function StudentProfileForm() {
  const { notify } = useNotification()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { updateUser } = useAuth()

//   useEffect(() => {
//     // Backend Integration: replace with real GET /student/profile response.
//     getStudentProfile().then((res) => {
//       setProfile(res)
//       setLoading(false)
//     })
//   }, [])
useEffect(() => {
    const fetchProfile = async () => {
        try {
        const data = await getStudentProfile()
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
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

    const validate = () => {
    const newErrors = {}

    if (!validateRequired(profile.fullName))
        newErrors.fullName = 'Full name is required.'

    if (!validatePhone(profile.phoneNumber))
        newErrors.phoneNumber = 'Enter a valid 10-digit phone number.'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
    }

const handleSave = async () => {
  if (!validate()) return

  setSaving(true)

  try {
    await updateStudentProfile(profile)

    updateUser({
    fullName: profile.fullName,
    phoneNumber: profile.phoneNumber,
    })

    notify('Profile updated successfully.')

    navigate(ROUTES.STUDENT_PROFILE)
  } catch (error) {
    notify(error.message, 'error')
  } finally {
    setSaving(false)
  }
}

  if (loading || !profile) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="My Profile" breadcrumb={['Dashboard', 'Profile']} />
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
            onChange={(e) => handleChange('fullName', e.target.value)}
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
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
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

        {/* Academic Information */}

        <Card title="Academic Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <Input
            label="Roll Number"
            value={profile.rollNumber}
            disabled
            className="opacity-70"
            />

            <Input
            label="Department"
            value={profile.department}
            disabled
            className="opacity-70"
            />

            <Input
            label="Graduation Year"
            value={profile.graduationYear}
            disabled
            className="opacity-70"
            />

            <Input
            label="Current CGPA"
            value={profile.cgpa}
            disabled
            className="opacity-70"
            />

            <Input
            label="Current Backlogs"
            value={profile.currentBacklogs}
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
