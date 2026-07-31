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
import {
  getRecruiterDriveById,
  getDriveEligibility,
  createDrive,
  updateDrive,
  createDriveEligibility,
  updateDriveEligibility,
} from '../../services/recruiterService'
import { useNotification } from '../../hooks/useNotification'
import { validateRequired } from '../../utils/validators'
import { DEPARTMENTS } from '../../constants/departments'
import { ROUTES } from '../../constants/routes'

const EMPTY_DRIVE = {
  companyName: '',
  jobRole: '',
  jobDescription: '',
  packageOffered: '',
  location: '',

  applicationDeadline: '',
  driveDate: '',

  eligibility: {
    minCgpa: '',
    department: '',
    maxBacklogs: '',
    graduationYear: '',
  },
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
    if (!isEdit) return

    const fetchData = async () => {
      try {
        const [drive, eligibility] = await Promise.all([
          getRecruiterDriveById(driveId),
          getDriveEligibility(driveId),
        ])

        setForm({
          ...drive,
          eligibility,
        })
      } catch (error) {
        console.error(error)
        notify('Failed to load drive.')
      }
    }
    fetchData()
  }, [driveId, isEdit])

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleEligibilityChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [field]: value,
      },
    }))
  }

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

    // Job Details
    if (!validateRequired(form.jobRole))
      newErrors.jobRole = 'Job role is required.'

    if (!validateRequired(form.packageOffered))
      newErrors.packageOffered = 'Package is required.'

    if (!validateRequired(form.location))
      newErrors.location = 'Location is required.'

    // Eligibility
    if (!validateRequired(form.eligibility.minCgpa))
      newErrors.minCgpa = 'Minimum CGPA is required.'

    if (!validateRequired(form.eligibility.department))
      newErrors.department = 'Department is required.'

    if (!validateRequired(form.eligibility.maxBacklogs))
      newErrors.maxBacklogs = 'Maximum backlogs is required.'

    if (!validateRequired(form.eligibility.graduationYear))
      newErrors.graduationYear = 'Graduation year is required.'

    // Selection Process (Enable when backend supports it)
    /*
    if (
      !form.selectionProcess.length ||
      form.selectionProcess.some((round) => !validateRequired(round))
    ) {
      newErrors.selectionProcess =
        'At least one valid selection round is required.'
    }
    */

    // Deadlines
    if (!validateRequired(form.applicationDeadline))
      newErrors.applicationDeadline = 'Application deadline is required.'

    if (!validateRequired(form.driveDate))
      newErrors.driveDate = 'Drive date is required.'

    if (
      form.applicationDeadline &&
      form.driveDate &&
      form.applicationDeadline > form.driveDate
    ) {
      newErrors.applicationDeadline =
        'Deadline must be before the drive date.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setSaving(true)

    try {
      // Payload for Drive API
      const drivePayload = {
        jobRole: form.jobRole,
        jobDescription: form.jobDescription,
        packageOffered: Number(form.packageOffered),
        location: form.location,
        applicationDeadline: form.applicationDeadline,
        driveDate: form.driveDate,
      }

      // Payload for Eligibility API
      const eligibilityPayload = {
        minCgpa: Number(form.eligibility.minCgpa),
        department: form.eligibility.department,
        maxBacklogs: Number(form.eligibility.maxBacklogs),
        graduationYear: Number(form.eligibility.graduationYear),
      }

      if (isEdit) {
        // Update drive
        await updateDrive(driveId, drivePayload)

        // Update eligibility
        await updateDriveEligibility(driveId, eligibilityPayload)

        notify('Drive updated successfully.')
      } else {
        // Create drive
        const createdDrive = await createDrive(drivePayload)

        // Create eligibility for the new drive
        await createDriveEligibility(
          createdDrive.id,
          eligibilityPayload
        )

        notify('Drive created successfully.')
      }

      navigate(ROUTES.RECRUITER_VIEW_DRIVES)
    } catch (error) {
      console.error(error)

      notify(
        isEdit
          ? 'Failed to update drive.'
          : 'Failed to create drive.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <PageHeader
        title={isEdit ? 'Edit Placement Drive' : 'Create Placement Drive'}
        description="Fill in every section to publish a new opportunity for students."
        breadcrumb={['Dashboard', 'Placement Drives', isEdit ? 'Edit' : 'Create']}
      />

      <Card title="Job Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Job Role"
            name="jobRole"
            value={form.jobRole}
            onChange={(e) => handleChange('jobRole', e.target.value)}
            required
            error={errors.jobRole}
          />

          <Input
            label="Package Offered"
            name="packageOffered"
            type="number"
            value={form.packageOffered}
            onChange={(e) => handleChange('packageOffered', e.target.value)}
            required
            error={errors.packageOffered}
          />
        </div>

        <Input
          className="mt-4"
          label="Location"
          name="location"
          value={form.location}
          onChange={(e) => handleChange('location', e.target.value)}
          required
          error={errors.location}
        />

        <Textarea
          className="mt-4"
          label="Job Description"
          name="jobDescription"
          value={form.jobDescription}
          onChange={(e) => handleChange('jobDescription', e.target.value)}
        />
      </Card>

      <Card title="Eligibility">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <Input
            label="Minimum CGPA"
            type="number"
            value={form.eligibility.minCgpa}
            onChange={(e) =>
              handleEligibilityChange('minCgpa', e.target.value)
            }
            required
            error={errors.minCgpa}
          />

          <Input
            label="Graduation Year"
            type="number"
            value={form.eligibility.graduationYear}
            onChange={(e) =>
              handleEligibilityChange('graduationYear', e.target.value)
            }
            required
            error={errors.graduationYear}
          />

          <Input
            label="Maximum Backlogs"
            type="number"
            value={form.eligibility.maxBacklogs}
            onChange={(e) =>
              handleEligibilityChange('maxBacklogs', e.target.value)
            }
            required
            error={errors.maxBacklogs}
          />

          <Dropdown
            label="Department"
            value={form.eligibility.department}
            onChange={(e) =>
              handleEligibilityChange('department', e.target.value)
            }
            options={DEPARTMENTS}
            required
            error={errors.department}
          />
        </div>
      </Card>

      {/* <Card title="Selection Process (Future)">
        <div className="flex flex-col gap-3">
          {form.selectionProcess?.map((round, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                className="flex-1"
                label={index === 0 ? 'Round' : ''}
                placeholder={`Round ${index + 1}`}
                value={round}
                onChange={(e) => updateRound(index, e.target.value)}
                required
                error={errors.selectionProcess}
              />

              {form.selectionProcess.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  icon={X}
                  onClick={() => removeRound(index)}
                />
              )}
            </div>
          ))}

          <div>
            <Button
              type="button"
              variant="outline"
              icon={Plus}
              onClick={addRound}
            >
              Add Round
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            Selection process is currently stored only in the frontend.
            Backend support will be added in a future release.
          </p>
        </div>
      </Card> */}

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
