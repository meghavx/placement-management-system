/*
==========================================
Component: AdminEligibility

Purpose:
Allows Placement Admins to configure and review eligibility criteria
for placement drives — CGPA, department, graduation year, and
company-specific requirements (FR-4.5.2, FR-4.6.x).

Current Features:
- Drive selector
- Eligibility form (min CGPA, departments, graduation year, backlogs,
  skills, certifications, additional requirements)
- Preview of eligible vs not-eligible student counts

Future Backend Integration:
GET /admin/eligibility, PUT /admin/eligibility/{id}.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Dropdown from '../../components/Dropdown'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getEligibilityCriteria, updateEligibilityCriteria } from '../../services/adminService'
import { useNotification } from '../../hooks/useNotification'
import { DEPARTMENTS } from '../../constants/departments'

export default function AdminEligibility() {
  const { notify } = useNotification()
  const [criteriaList, setCriteriaList] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDriveId, setSelectedDriveId] = useState('')
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Backend Integration: replace with real GET /admin/eligibility response.
    getEligibilityCriteria().then((res) => {
      setCriteriaList(res)
      setLoading(false)
      if (res.length > 0) {
        setSelectedDriveId(String(res[0].driveId))
        setForm(res[0])
      }
    })
  }, [])

  const handleSelectDrive = (driveId) => {
    setSelectedDriveId(driveId)
    setForm(criteriaList.find((c) => String(c.driveId) === driveId))
  }

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const toggleDepartment = (dept) => {
    setForm((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Backend Integration: replace with real PUT /admin/eligibility/{id} call.
    await updateEligibilityCriteria(form.driveId, form)
    setSaving(false)
    notify('Eligibility Criteria Updated')
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Eligibility Management" breadcrumb={['Dashboard', 'Eligibility']} />
        <SkeletonLoader rows={6} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Eligibility Management"
        description="Configure eligibility criteria for each placement drive."
        breadcrumb={['Dashboard', 'Eligibility']}
      />

      <Card title="Select Placement Drive">
        <Dropdown
          name="drive"
          value={selectedDriveId}
          onChange={(e) => handleSelectDrive(e.target.value)}
          options={criteriaList.map((c) => ({ label: c.drive, value: String(c.driveId) }))}
          placeholder="Choose a drive"
        />
      </Card>

      {form && (
        <>
          <Card title="Eligibility Criteria">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Minimum CGPA" name="minCgpa" type="number" value={form.minCgpa} onChange={(e) => handleChange('minCgpa', e.target.value)} />
              <Input label="Graduation Year" name="graduationYear" type="number" value={form.graduationYear} onChange={(e) => handleChange('graduationYear', e.target.value)} />
              <Input label="Maximum Backlogs" name="maxBacklogs" type="number" value={form.maxBacklogs} onChange={(e) => handleChange('maxBacklogs', e.target.value)} />
            </div>
            <div className="mt-4">
              <span className="mb-2 block text-sm font-medium text-gray-700">Eligible Departments</span>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {DEPARTMENTS.map((dept) => (
                  <Checkbox key={dept} name={dept} label={dept} checked={form.departments.includes(dept)} onChange={() => toggleDepartment(dept)} />
                ))}
              </div>
            </div>
            <Textarea
              label="Required Skills"
              name="skills"
              className="mt-4"
              value={form.skills.join(', ')}
              onChange={(e) => handleChange('skills', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
            />
          </Card>

          <Card title="Preview Eligible Students">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <p className="text-2xl font-semibold text-green-700">{form.eligibleStudentsCount}</p>
                <p className="text-xs text-green-600">Eligible Students</p>
              </div>
              <div className="rounded-lg bg-red-50 p-4 text-center">
                <p className="text-2xl font-semibold text-red-700">{form.notEligibleStudentsCount}</p>
                <p className="text-xs text-red-600">Not Eligible Students</p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} loading={saving}>Save Eligibility Criteria</Button>
          </div>
        </>
      )}
    </div>
  )
}
