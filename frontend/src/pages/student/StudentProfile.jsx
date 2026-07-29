/*
==========================================
Component: StudentProfile

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
import { X, Plus } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Dropdown from '../../components/Dropdown'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getStudentProfile, updateStudentProfile } from '../../services/studentService'
import { useNotification } from '../../hooks/useNotification'
import { validateEmail, validatePhone, validateCGPA, validateRequired } from '../../utils/validators'
import { DEPARTMENTS } from '../../constants/departments'

export default function StudentProfile() {
  const { notify } = useNotification()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    // Backend Integration: replace with real GET /student/profile response.
    getStudentProfile().then((res) => {
      setProfile(res)
      setLoading(false)
    })
  }, [])

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (!newSkill.trim()) return
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
    setNewSkill('')
  }

  const removeSkill = (skill) => {
    setProfile((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  const validate = () => {
    const newErrors = {}
    if (!validateRequired(profile.fullName)) newErrors.fullName = 'Full name is required.'
    if (!validateEmail(profile.email)) newErrors.email = 'Enter a valid email address.'
    if (!validatePhone(profile.phone)) newErrors.phone = 'Enter a valid 10-digit phone number.'
    if (!validateCGPA(profile.cgpa)) newErrors.cgpa = 'CGPA must be between 0 and 10.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    // Backend Integration: replace with real PUT /student/profile call.
    await updateStudentProfile(profile)
    setSaving(false)
    notify('Profile Updated')
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
        title="My Profile"
        description="Keep your personal and academic details up to date."
        breadcrumb={['Dashboard', 'Profile']}
      />

      <Card title="Personal Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Full Name" name="fullName" value={profile.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required error={errors.fullName} />
          <Input label="Email" name="email" type="email" value={profile.email} onChange={(e) => handleChange('email', e.target.value)} required error={errors.email} />
          <Input label="Phone" name="phone" type="tel" value={profile.phone} onChange={(e) => handleChange('phone', e.target.value)} required error={errors.phone} />
          <Dropdown label="Gender" name="gender" value={profile.gender} onChange={(e) => handleChange('gender', e.target.value)} options={['Male', 'Female', 'Other']} />
          <Input label="Address" name="address" value={profile.address} onChange={(e) => handleChange('address', e.target.value)} />
          <Input label="City" name="city" value={profile.city} onChange={(e) => handleChange('city', e.target.value)} />
          <Input label="State" name="state" value={profile.state} onChange={(e) => handleChange('state', e.target.value)} />
          <Input label="PIN Code" name="pinCode" value={profile.pinCode} onChange={(e) => handleChange('pinCode', e.target.value)} />
          <Input label="Date of Birth" name="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
        </div>
      </Card>

      <Card title="Academic Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Dropdown label="Department" name="department" value={profile.department} onChange={(e) => handleChange('department', e.target.value)} options={DEPARTMENTS} required />
          <Input label="Branch" name="branch" value={profile.branch} onChange={(e) => handleChange('branch', e.target.value)} />
          <Input label="Batch" name="batch" value={profile.batch} onChange={(e) => handleChange('batch', e.target.value)} />
          <Input label="CGPA" name="cgpa" type="number" value={profile.cgpa} onChange={(e) => handleChange('cgpa', e.target.value)} required error={errors.cgpa} />
          <Input label="Enrollment Number" name="enrollmentNumber" value={profile.enrollmentNumber} onChange={(e) => handleChange('enrollmentNumber', e.target.value)} />
          <Input label="University Roll Number" name="universityRollNumber" value={profile.universityRollNumber} onChange={(e) => handleChange('universityRollNumber', e.target.value)} />
          <Input label="Graduation Year" name="graduationYear" type="number" value={profile.graduationYear} onChange={(e) => handleChange('graduationYear', e.target.value)} />
        </div>
      </Card>

      <Card title="Skills">
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span key={skill} className="flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
              {skill}
              <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Input name="newSkill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill" className="flex-1" />
          <Button variant="outline" icon={Plus} onClick={addSkill}>Add</Button>
        </div>
      </Card>

      <Card title="Certifications">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {profile.certifications.map((cert) => (
            <div key={cert.id} className="rounded-lg border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-800">{cert.title}</p>
              <p className="text-xs text-gray-500">{cert.organization}</p>
              <p className="mt-1 text-xs text-gray-400">Issued: {cert.issueDate}</p>
              <a href={cert.credentialLink} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-primary-600 hover:underline">
                View Credential
              </a>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} loading={saving}>Save Changes</Button>
      </div>
    </div>
  )
}
