/*
==========================================
Component: RecruiterDriveForm

Purpose:
Allows recruiters to create or edit a placement drive (spec Part 4 —
Create/Edit Placement Drive page), covering company info, job details,
eligibility, selection process, compensation, and deadlines.

Current Features:
- Full form matching every section in the spec
- Dynamic add/remove selection-process rounds
- Validation for required fields, package, and deadlines
- Works for both Create and Edit (reads :driveId from the route)

Future Backend Integration:
POST /recruiter/drives (create) or PUT /recruiter/drives/{id} (edit).
==========================================
*/

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Dropdown from '../../components/Dropdown'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import { getRecruiterDrives, createDrive, updateDrive } from '../../services/recruiterService'
import { useNotification } from '../../hooks/useNotification'
import { validateRequired } from '../../utils/validators'
import { DEPARTMENTS } from '../../constants/departments'
import { ROUTES } from '../../constants/routes'

const EMPTY_DRIVE = {
  company: '',
  website: '',
  location: '',
  industry: '',
  role: '',
  description: '',
  employmentType: 'Full-Time',
  package: '',
  bondInformation: '',
  minCgpa: '',
  departments: [],
  graduationYear: '',
  skills: '',
  certifications: '',
  additionalRequirements: '',
  selectionProcess: ['Online Test'],
  applicationDeadline: '',
  driveDate: '',
  status: 'Draft',
}

export default function RecruiterDriveForm() {
  const { driveId } = useParams()
  const navigate = useNavigate()
  const { notify } = useNotification()
  const isEdit = !!driveId

  const [form, setForm] = useState(EMPTY_DRIVE)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEdit) {
      // Backend Integration: replace with real GET /recruiter/drives/{id} call.
      getRecruiterDrives().then((drives) => {
        const existing = drives.find((d) => String(d.id) === driveId)
        if (existing) {
          setForm({
            ...EMPTY_DRIVE,
            ...existing,
            applicationDeadline: existing.deadline,
          })
        }
      })
    }
  }, [driveId, isEdit])

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const toggleDepartment = (dept) => {
    setForm((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }))
  }

  const updateRound = (index, value) => {
    setForm((prev) => ({
      ...prev,
      selectionProcess: prev.selectionProcess.map((r, i) => (i === index ? value : r)),
    }))
  }

  const addRound = () => setForm((prev) => ({ ...prev, selectionProcess: [...prev.selectionProcess, ''] }))
  const removeRound = (index) =>
    setForm((prev) => ({ ...prev, selectionProcess: prev.selectionProcess.filter((_, i) => i !== index) }))

  const validate = () => {
    const newErrors = {}
    if (!validateRequired(form.company)) newErrors.company = 'Company name is required.'
    if (!validateRequired(form.role)) newErrors.role = 'Job role is required.'
    if (!validateRequired(form.package)) newErrors.package = 'Package is required.'
    if (!validateRequired(form.applicationDeadline)) newErrors.applicationDeadline = 'Application deadline is required.'
    if (!validateRequired(form.driveDate)) newErrors.driveDate = 'Drive date is required.'
    if (form.applicationDeadline && form.driveDate && form.applicationDeadline > form.driveDate) {
      newErrors.applicationDeadline = 'Deadline must be before the drive date.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    if (isEdit) {
      // Backend Integration: replace with real PUT /recruiter/drives/{id} call.
      await updateDrive(driveId, form)
      notify('Drive Updated')
    } else {
      // Backend Integration: replace with real POST /recruiter/drives call.
      await createDrive(form)
      notify('Drive Created')
    }
    setSaving(false)
    navigate(ROUTES.RECRUITER_VIEW_DRIVES)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <PageHeader
        title={isEdit ? 'Edit Placement Drive' : 'Create Placement Drive'}
        description="Fill in every section to publish a new opportunity for students."
        breadcrumb={['Dashboard', 'Placement Drives', isEdit ? 'Edit' : 'Create']}
      />

      <Card title="Company Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Company Name" name="company" value={form.company} onChange={(e) => handleChange('company', e.target.value)} required error={errors.company} />
          <Input label="Website" name="website" value={form.website} onChange={(e) => handleChange('website', e.target.value)} />
          <Input label="Location" name="location" value={form.location} onChange={(e) => handleChange('location', e.target.value)} />
          <Input label="Industry" name="industry" value={form.industry} onChange={(e) => handleChange('industry', e.target.value)} />
        </div>
      </Card>

      <Card title="Job Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Role" name="role" value={form.role} onChange={(e) => handleChange('role', e.target.value)} required error={errors.role} />
          <Dropdown label="Employment Type" name="employmentType" value={form.employmentType} onChange={(e) => handleChange('employmentType', e.target.value)} options={['Full-Time', 'Internship', 'Internship + Full-Time']} />
          <Input label="Package (LPA)" name="package" type="number" value={form.package} onChange={(e) => handleChange('package', e.target.value)} required error={errors.package} />
          <Input label="Bond Information" name="bondInformation" value={form.bondInformation} onChange={(e) => handleChange('bondInformation', e.target.value)} />
        </div>
        <Textarea label="Job Description" name="description" value={form.description} onChange={(e) => handleChange('description', e.target.value)} className="mt-4" />
      </Card>

      <Card title="Eligibility">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Minimum CGPA" name="minCgpa" type="number" value={form.minCgpa} onChange={(e) => handleChange('minCgpa', e.target.value)} />
          <Input label="Graduation Year" name="graduationYear" type="number" value={form.graduationYear} onChange={(e) => handleChange('graduationYear', e.target.value)} />
          <Input label="Required Skills (comma separated)" name="skills" value={form.skills} onChange={(e) => handleChange('skills', e.target.value)} />
          <Input label="Certifications (optional)" name="certifications" value={form.certifications} onChange={(e) => handleChange('certifications', e.target.value)} />
        </div>
        <div className="mt-4">
          <span className="mb-2 block text-sm font-medium text-gray-700">Eligible Departments</span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {DEPARTMENTS.map((dept) => (
              <Checkbox key={dept} name={dept} label={dept} checked={form.departments.includes(dept)} onChange={() => toggleDepartment(dept)} />
            ))}
          </div>
        </div>
        <Textarea label="Additional Requirements" name="additionalRequirements" value={form.additionalRequirements} onChange={(e) => handleChange('additionalRequirements', e.target.value)} className="mt-4" />
      </Card>

      <Card title="Selection Process">
        <div className="flex flex-col gap-3">
          {form.selectionProcess.map((round, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input name={`round-${index}`} value={round} onChange={(e) => updateRound(index, e.target.value)} placeholder="e.g. Technical Interview" className="flex-1" />
              <button type="button" onClick={() => removeRound(index)} aria-label="Remove round" className="text-gray-400 hover:text-red-500">
                <X size={18} />
              </button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" icon={Plus} onClick={addRound} className="self-start">
            Add Round
          </Button>
        </div>
      </Card>

      <Card title="Deadlines">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Application Deadline" name="applicationDeadline" type="date" value={form.applicationDeadline} onChange={(e) => handleChange('applicationDeadline', e.target.value)} required error={errors.applicationDeadline} />
          <Input label="Drive Date" name="driveDate" type="date" value={form.driveDate} onChange={(e) => handleChange('driveDate', e.target.value)} required error={errors.driveDate} />
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate(ROUTES.RECRUITER_VIEW_DRIVES)}>
          Cancel
        </Button>
        <Button type="submit" loading={saving}>
          {isEdit ? 'Save Changes' : 'Create Drive'}
        </Button>
      </div>
    </form>
  )
}
