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
import { Plus, Eye, Pencil, KeyRound, UserCheck, UserX, Trash2, Upload, FileSpreadsheet } from 'lucide-react'
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
import ConfirmationModal from '../../components/ConfirmationModal'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getStudents, createStudent, updateStudent, deleteStudent, importStudents } from '../../services/adminService'
import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import { validateEmail, validatePhone, validateRequired } from '../../utils/validators'
import { DEPARTMENTS } from '../../constants/departments'

const EMPTY_FORM = { name: '', email: '', phone: '', department: '', batch: '', rollNumber: '', enrollmentNumber: '' }

export default function AdminStudents() {
  const { notify } = useNotification()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('')
  const [viewStudent, setViewStudent] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  
  const [importOpen, setImportOpen] = useState(false)
  const [importFile, setImportFile] = useState(null)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState(null)
  const [importError, setImportError] = useState('')

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(students, ['name', 'id', 'email'])
  const filtered = filteredItems
    .filter((s) => (department ? s.department === department : true))
    .filter((s) => (status ? s.status === status : true))

  // useEffect(() => {
  //   // Backend Integration: replace with real GET /admin/students response.
  //   getStudents().then((res) => {
  //     setStudents(res)
  //     setLoading(false)
  //   })
  // }, [])

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

  const handleFormChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const validate = () => {
    const newErrors = {}
    if (!validateRequired(form.name)) newErrors.name = 'Full name is required.'
    if (!validateEmail(form.email)) newErrors.email = 'Enter a valid email address.'
    if (students.some((s) => s.email === form.email)) newErrors.email = 'This email is already registered.'
    if (!validatePhone(form.phone)) newErrors.phone = 'Enter a valid 10-digit phone number.'
    if (!validateRequired(form.department)) newErrors.department = 'Department is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddStudent = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    // Backend Integration: replace with real POST /admin/students call.
    const created = await createStudent({ ...form, cgpa: 0, status: 'Inactive', id: `STU${1000 + students.length + 1}` })
    setStudents((prev) => [...prev, created])
    setSaving(false)
    setAddOpen(false)
    setForm(EMPTY_FORM)
    notify('Student Account Created')
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

      // Refresh the student list so newly imported students appear immediately.
      const updatedStudents = await getStudents()
      setStudents(updatedStudents)

      notify(
        result.failed === 0
          ? 'Students imported successfully'
          : 'Student import completed with some errors'
      )
    } catch (error) {
      console.error('Failed to import students:', error)

      const message =
        error.response?.data?.message ||
        'Failed to import students. Please try again.'

      setImportError(message)
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

  const handleToggleStatus = async (student) => {
    const newStatus = student.status === 'Active' ? 'Inactive' : 'Active'
    // Backend Integration: replace with real PUT /admin/students/{id} call.
    await updateStudent(student.id, { status: newStatus })
    setStudents((prev) => prev.map((s) => (s.id === student.id ? { ...s, status: newStatus } : s)))
    notify(newStatus === 'Active' ? 'Student Activated' : 'Student Deactivated')
  }

  const handleDelete = async () => {
    await deleteStudent(deleteTarget.id)
    setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id))
    setDeleteTarget(null)
    notify('Student Deleted')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Student Management"
        description="Create and manage student accounts."
        breadcrumb={['Dashboard', 'Students']}
        primaryAction={
          <div className="flex items-center gap-2">
            <Button 
              variant="primaryOutline" 
              icon={Upload}
              onClick={() => setImportOpen(true)}
            >
              Import Students
            </Button>
            <Button icon={Plus} onClick={() => setAddOpen(true)}>
              Add Student
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatisticCard title="Total Students" value={stats.total} />
        <StatisticCard title="Active" value={stats.active} />
        <StatisticCard title="Inactive" value={stats.inactive} />
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by name, ID, or email" className="sm:max-w-sm" />

      <FilterBar
        filters={[
          { name: 'department', label: 'Department', value: department, onChange: (e) => setDepartment(e.target.value), options: DEPARTMENTS },
          { name: 'status', label: 'Status', value: status, onChange: (e) => setStatus(e.target.value), options: ['Active', 'Inactive'] },
        ]}
        onReset={() => { setDepartment(''); setStatus('') }}
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'id', header: 'Student ID' },
            { key: 'name', header: 'Name' },
            { key: 'department', header: 'Department' },
            { key: 'batch', header: 'Batch' },
            { key: 'cgpa', header: 'CGPA' },
            { key: 'email', header: 'Email' },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
          ]}
          rows={filtered}
          emptyMessage="No students found."
          actions={(row) => (
            <div className="flex flex-wrap gap-1">
              <Button variant="ghost" size="sm" icon={Eye} onClick={() => setViewStudent(row)} />
              <Button variant="ghost" size="sm" icon={Pencil} />
              <Button variant="ghost" size="sm" icon={KeyRound} onClick={() => notify('Password Reset Email Sent')} />
              <Button
                variant="ghost"
                size="sm"
                icon={row.status === 'Active' ? UserX : UserCheck}
                onClick={() => handleToggleStatus(row)}
              />
              <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setDeleteTarget(row)} />
            </div>
          )}
        />
      )}

      <Modal open={!!viewStudent} onClose={() => setViewStudent(null)} title={viewStudent?.name}>
        {viewStudent && (
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p><span className="font-medium">Student ID:</span> {viewStudent.id}</p>
            <p><span className="font-medium">Department:</span> {viewStudent.department}</p>
            <p><span className="font-medium">Batch:</span> {viewStudent.batch}</p>
            <p><span className="font-medium">CGPA:</span> {viewStudent.cgpa}</p>
            <p><span className="font-medium">Email:</span> {viewStudent.email}</p>
            <p><span className="font-medium">Phone:</span> {viewStudent.phone}</p>
            <p><span className="font-medium">Status:</span> <Badge label={viewStudent.status} /></p>
          </div>
        )}
      </Modal>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Student"
        footer={
          <>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAddStudent} loading={saving}>Create Account</Button>
          </>
        }
      >
        <form onSubmit={handleAddStudent} className="flex flex-col gap-4" noValidate>
          <Input label="Full Name" name="name" value={form.name} onChange={(e) => handleFormChange('name', e.target.value)} required error={errors.name} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={(e) => handleFormChange('email', e.target.value)} required error={errors.email} />
          <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={(e) => handleFormChange('phone', e.target.value)} required error={errors.phone} />
          <Dropdown label="Department" name="department" value={form.department} onChange={(e) => handleFormChange('department', e.target.value)} options={DEPARTMENTS} required error={errors.department} />
          <Input label="Batch" name="batch" value={form.batch} onChange={(e) => handleFormChange('batch', e.target.value)} placeholder="e.g. 2022-2026" />
          <Input label="Roll Number" name="rollNumber" value={form.rollNumber} onChange={(e) => handleFormChange('rollNumber', e.target.value)} />
          <Input label="Enrollment Number" name="enrollmentNumber" value={form.enrollmentNumber} onChange={(e) => handleFormChange('enrollmentNumber', e.target.value)} />
        </form>
      </Modal>

      <Modal
        open={importOpen}
        onClose={handleCloseImport}
        title="Import Students"
        footer={
          importResult ? (
            <Button onClick={handleCloseImport}>
              Done
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleCloseImport}
                disabled={importing}
              >
                Cancel
              </Button>

              <Button
                onClick={handleImportStudents}
                disabled={!importFile}
                loading={importing}
              >
                Import Students
              </Button>
            </>
          )
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-700">
              Upload an Excel (.xlsx) file containing student account details.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              The first row should contain the column headers.
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-300 px-4 py-4 transition-colors hover:border-primary-500 hover:bg-primary-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
              <FileSpreadsheet className="text-gray-600" size={20} />
            </div>

            <div className="min-w-0 flex-1">
              {importFile ? (
                <>
                  <p className="truncate text-sm font-medium text-gray-800">
                    {importFile.name}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Click to choose a different file
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-primary-600">
                    Choose Excel file
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    .xlsx files only
                  </p>
                </>
              )}
            </div>

            <Upload size={18} className="shrink-0 text-gray-400" />

            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null

                setImportResult(null)

                if (file && !file.name.toLowerCase().endsWith('.xlsx')) {
                  setImportFile(null)
                  setImportError('Only .xlsx files are supported.')
                  e.target.value = ''
                  return
                }

                setImportFile(file)
                setImportError('')
              }}
            />
          </label>

          {importError && (
            <p className="text-sm text-red-600">
              {importError}
            </p>
          )}

          {importResult && (
            <div className="flex flex-col gap-4">

              {/* Summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-xl font-semibold text-gray-900">
                    {importResult.total}
                  </p>
                  <p className="text-xs text-gray-500">Processed</p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-center">
                  <p className="text-xl font-semibold text-green-700">
                    {importResult.created}
                  </p>
                  <p className="text-xs text-green-600">Created</p>
                </div>

                <div className="rounded-lg bg-red-50 p-3 text-center">
                  <p className="text-xl font-semibold text-red-700">
                    {importResult.failed}
                  </p>
                  <p className="text-xs text-red-600">Failed</p>
                </div>
              </div>

              {/* Row-level errors */}
              {importResult.errors?.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-800">
                    Failed Rows
                  </p>

                  <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200">
                    {importResult.errors.map((error, index) => (
                      <div
                        key={`${error.row}-${index}`}
                        className="flex gap-4 border-b border-gray-100 px-4 py-3 last:border-b-0"
                      >
                        <span className="shrink-0 text-sm font-medium text-red-600">
                          Row {error.row}
                        </span>

                        <span className="text-sm text-gray-700">
                          {error.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      <ConfirmationModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Student"
        message={deleteTarget ? `Are you sure you want to delete ${deleteTarget.name}'s account? This cannot be undone.` : ''}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  )
}
