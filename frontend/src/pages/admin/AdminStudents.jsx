/*
==========================================
Component: AdminStudents

Purpose:
Allows Placement Admins to create, update, activate, deactivate, and
manage student accounts (FR-4.2.1 to FR-4.2.3).

Current Features:
- Statistic cards, search, department/status filters
- Student table with View/Edit/Activate/Deactivate/Reset/Delete actions
- Add Student modal form with validation (duplicate email/roll number,
  required fields)
- Student profile view modal

Future Backend Integration:
GET /admin/students, POST /admin/students, PUT /admin/students/{id}, DELETE /admin/students/{id}.
==========================================
*/

import { useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'
import {
  Plus,
  Eye,
  Pencil,
  UserCheck,
  UserX,
  Upload,
  FileSpreadsheet,
} from 'lucide-react'

import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SearchBar from '../../components/SearchBar'
import FilterBar from '../../components/FilterBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Dropdown from '../../components/Dropdown'
import SkeletonLoader from '../../components/SkeletonLoader'

import {
  getStudents,
  createStudent,
  updateStudent,
  importStudents,
} from '../../services/adminService'

import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from '../../utils/validators'
import { DEPARTMENTS } from '../../constants/departments'

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phoneNumber: '',
  rollNumber: '',
  department: '',
  graduationYear: '',
  cgpa: '',
  currentBacklogs: '',
}

export default function AdminStudents() {
  const { notify } = useNotification()

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('')

  const [viewStudent, setViewStudent] = useState(null)

  // Shared for Add + Edit
  const [studentModalOpen, setStudentModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  // Import
  const [importOpen, setImportOpen] = useState(false)
  const [importFile, setImportFile] = useState(null)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState(null)
  const [importError, setImportError] = useState('')

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    students,
    ['name', 'id', 'email']
  )

  const filtered = filteredItems
    .filter((s) => (department ? s.department === department : true))
    .filter((s) => (status ? s.status === status : true))

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents()
        setStudents(data)
      } catch (error) {
        console.error(error)
        notify('Failed to load students')
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === 'Active').length,
    inactive: students.filter((s) => s.status === 'Inactive').length,
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!validateRequired(form.fullName))
      newErrors.fullName = 'Full name is required.'

    if (!validateEmail(form.email))
      newErrors.email = 'Enter a valid email.'

    if (!validatePhone(form.phoneNumber))
      newErrors.phoneNumber = 'Enter a valid phone number.'

    if (!validateRequired(form.rollNumber))
      newErrors.rollNumber = 'Roll Number is required.'

    if (!validateRequired(form.department))
      newErrors.department = 'Department is required.'

    if (!validateRequired(form.graduationYear))
      newErrors.graduationYear = 'Graduation Year is required.'

    if (form.cgpa === '')
      newErrors.cgpa = 'CGPA is required.'

    if (form.currentBacklogs === '')
      newErrors.currentBacklogs = 'Current Backlogs is required.'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const openAddModal = () => {
    setEditingStudent(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setStudentModalOpen(true)
  }

  const openEditModal = (student) => {
    setEditingStudent(student)

    setForm({
      fullName: student.name,
      email: student.email,
      phoneNumber: student.phone,
      rollNumber: student.rollNumber,
      department: student.department,
      graduationYear:
        student.batch !== '-'
          ? Number(student.batch.split('-')[1])
          : '',
      cgpa: student.cgpa,
      currentBacklogs: student.backlogs,
    })

    setErrors({})
    setStudentModalOpen(true)
  }

  const handleSaveStudent = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setSaving(true)

    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, form)

        notify('Student updated successfully')
      } else {
        await createStudent(form)

        notify('Student created successfully')
      }

      const updated = await getStudents()
      setStudents(updated)

      setStudentModalOpen(false)
      setEditingStudent(null)
      setForm(EMPTY_FORM)
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = async (student) => {
    // PATCH integration later
    notify(
      student.status === 'Active'
        ? 'Deactivate endpoint pending integration'
        : 'Activate endpoint pending integration'
    )
  }

  const handleImportStudents = async () => {
    if (!importFile) {
      setImportError('Please select an Excel file.')
      return
    }

    if (!importFile.name.toLowerCase().endsWith('.xlsx')) {
      setImportError('Only .xlsx files are supported.')
      return
    }

    setImporting(true)
    setImportError('')
    setImportResult(null)

    try {
      const result = await importStudents(importFile)

      setImportResult(result)

      const updatedStudents = await getStudents()
      setStudents(updatedStudents)

      notify(
        result.failed === 0
          ? 'Students imported successfully'
          : 'Student import completed with some errors'
      )
    } catch (error) {
      console.error(error)

      setImportError(
        error.response?.data?.message ??
          'Failed to import students.'
      )
    } finally {
      setImporting(false)
    }
  }

  const handleCloseImport = () => {
    setImportOpen(false)
    setImportFile(null)
    setImportResult(null)
    setImportError('')
  }

    return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Student Management"
        description="Manage student accounts, academic information, and placement eligibility."
        breadcrumb={['Dashboard', 'Students']}
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatisticCard
          title="Total Students"
          value={stats.total}
        />

        <StatisticCard
          title="Active Students"
          value={stats.active}
        />

        <StatisticCard
          title="Inactive Students"
          value={stats.inactive}
        />
      </div>

      {/* Header Actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name, roll number or email"
          className="w-full lg:max-w-md"
        />

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            icon={FileSpreadsheet}
            onClick={() => setImportOpen(true)}
          >
            Import Students
          </Button>

          <Button
            icon={Plus}
            onClick={openAddModal}
          >
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={[
          {
            name: 'department',
            label: 'Department',
            value: department,
            onChange: (e) => setDepartment(e.target.value),
            options: DEPARTMENTS,
          },
          {
            name: 'status',
            label: 'Status',
            value: status,
            onChange: (e) => setStatus(e.target.value),
            options: ['Active', 'Inactive'],
          },
        ]}
        onReset={() => {
          setDepartment('')
          setStatus('')
        }}
      />

      {/* Students Table */}
      {loading ? (
        <SkeletonLoader rows={8} />
      ) : (
                <Table
          columns={[
            {
              key: 'id',
              header: 'Roll Number',
            },
            {
              key: 'name',
              header: 'Student Name',
            },
            {
              key: 'department',
              header: 'Department',
            },
            {
              key: 'batch',
              header: 'Batch',
            },
            {
              key: 'cgpa',
              header: 'CGPA',
            },
            {
              key: 'email',
              header: 'Email',
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge
                  label={row.status}
                  variant={
                    row.status === 'Active'
                      ? 'success'
                      : 'secondary'
                  }
                />
              ),
            },
          ]}
          rows={filtered}
          emptyMessage="No students found."
          actions={(row) => (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                icon={Eye}
                onClick={() => setViewStudent(row)}
              >
                View
              </Button>

              <Button
                size="sm"
                variant="outline"
                icon={Pencil}
                onClick={() => openEditModal(row)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant={
                  row.status === 'Active'
                    ? 'danger'
                    : 'success'
                }
                icon={
                  row.status === 'Active'
                    ? UserX
                    : UserCheck
                }
                onClick={() => handleToggleStatus(row)}
              >
                {row.status === 'Active'
                  ? 'Deactivate'
                  : 'Activate'}
              </Button>
            </div>
          )}
        />
      )}
      
      {/* View Student */}
      {viewStudent && (
        <Modal
          open={!!viewStudent}
          onClose={() => setViewStudent(null)}
          title="Student Details"
          size="lg"
        >
          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <Avatar
                name={viewStudent.name}
                size="lg"
              />

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {viewStudent.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {viewStudent.department}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Roll Number
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewStudent.rollNumber}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewStudent.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone Number
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewStudent.phone}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Batch
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewStudent.batch}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  CGPA
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewStudent.cgpa}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Current Backlogs
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewStudent.backlogs}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </p>

                <div className="mt-1">
                  <Badge label={viewStudent.status} />
                </div>
              </div>

            </div>
          </div>
        </Modal>
      )}

      {/* Add / Edit Student */}
      <Modal
        open={studentModalOpen}
        onClose={() => {
          setStudentModalOpen(false)
          setEditingStudent(null)
          setForm(EMPTY_FORM)
          setErrors({})
        }}
        title={
          editingStudent
            ? 'Edit Student'
            : 'Add Student'
        }
        size="xl"
      >
        <form
          onSubmit={handleSaveStudent}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Input
            label="Full Name"
            value={form.fullName}
            onChange={(e) =>
              handleFormChange('fullName', e.target.value)
            }
            error={errors.fullName}
            required
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              handleFormChange('email', e.target.value)
            }
            error={errors.email}
            required
          />

          <Input
            label="Phone Number"
            value={form.phoneNumber}
            onChange={(e) =>
              handleFormChange('phoneNumber', e.target.value)
            }
            error={errors.phoneNumber}
            required
          />

          <Input
            label="Roll Number"
            value={form.rollNumber}
            onChange={(e) =>
              handleFormChange('rollNumber', e.target.value)
            }
            error={errors.rollNumber}
            required
          />

          <Dropdown
            label="Department"
            value={form.department}
            onChange={(e) =>
              handleFormChange('department', e.target.value)
            }
            options={DEPARTMENTS}
            error={errors.department}
            required
          />

          <Input
            label="Graduation Year"
            type="number"
            value={form.graduationYear}
            onChange={(e) =>
              handleFormChange(
                'graduationYear',
                e.target.value
              )
            }
            error={errors.graduationYear}
            required
          />

          <Input
            label="CGPA"
            type="number"
            step="0.01"
            value={form.cgpa}
            onChange={(e) =>
              handleFormChange('cgpa', e.target.value)
            }
            error={errors.cgpa}
            required
          />

          <Input
            label="Current Backlogs"
            type="number"
            value={form.currentBacklogs}
            onChange={(e) =>
              handleFormChange(
                'currentBacklogs',
                e.target.value
              )
            }
            error={errors.currentBacklogs}
            required
          />

          <div className="col-span-full flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStudentModalOpen(false)
                setEditingStudent(null)
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={saving}
            >
              {editingStudent
                ? 'Save Changes'
                : 'Create Student'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Import Students */}
      <Modal
        open={importOpen}
        onClose={handleCloseImport}
        title="Import Students"
      >
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) =>
              setImportFile(e.target.files?.[0] ?? null)
            }
          />

          {importError && (
            <p className="text-sm text-red-600">
              {importError}
            </p>
          )}

          {importResult && (
            <div className="rounded-lg bg-gray-50 p-4 text-sm">
              <p>
                <strong>Total:</strong>{' '}
                {importResult.total}
              </p>
              <p>
                <strong>Imported:</strong>{' '}
                {importResult.imported}
              </p>
              <p>
                <strong>Failed:</strong>{' '}
                {importResult.failed}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleCloseImport}
            >
              Cancel
            </Button>

            <Button
              icon={Upload}
              loading={importing}
              onClick={handleImportStudents}
            >
              Import
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

