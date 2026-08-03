/*
==========================================
Component: AdminRecruiters

Purpose:
Allows Placement Admins to manage recruiter accounts and company
information (FR-4.4.1 to FR-4.4.3).

Current Features:
- Statistic cards, search
- Recruiter table with View/Edit/Activate/Deactivate/Reset/Delete actions
- Add Recruiter modal form

Future Backend Integration:
GET /admin/recruiters, POST /admin/recruiters, PUT /admin/recruiters/{id}, DELETE /admin/recruiters/{id}.
==========================================
*/

import { useEffect, useMemo, useState } from 'react'
import {
  Plus,
  Eye,
  Pencil,
  UserCheck,
  UserX,
} from 'lucide-react'

import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SearchBar from '../../components/SearchBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Dropdown from '../../components/Dropdown'
import Avatar from '../../components/Avatar'
import SkeletonLoader from '../../components/SkeletonLoader'

import {
  getRecruiters,
  createRecruiter,
  updateRecruiter,
  updateRecruiterStatus,
} from '../../services/adminService'

import { getCompanies } from '../../services/companyService'

import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from '../../utils/validators'

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  companyId: '',
  designation: '',
}

export default function AdminRecruiters() {
  const { notify } = useNotification()

  const [loading, setLoading] = useState(true)

  const [recruiters, setRecruiters] = useState([])
  const [statusRecruiter, setStatusRecruiter] = useState(null)
  
  const [companies, setCompanies] = useState([])

  const [viewRecruiter, setViewRecruiter] = useState(null)

  const [formOpen, setFormOpen] = useState(false)
  const [editingRecruiter, setEditingRecruiter] = useState(null)

  const [form, setForm] = useState(EMPTY_FORM)

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const {
    searchTerm,
    setSearchTerm,
    filteredItems,
  } = useSearch(recruiters, [
    'recruiter',
    'company',
    'email',
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recruiterData, companyData] = await Promise.all([
          getRecruiters(),
          getCompanies(),
        ])

        setRecruiters(recruiterData)
        setCompanies(companyData)
      } catch (error) {
        console.error(error)
        notify('Failed to load recruiters.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const stats = useMemo(() => ({
    total: recruiters.length,
    active: recruiters.filter((r) => r.status === 'Active').length,
    inactive: recruiters.filter((r) => r.status === 'Inactive').length,
  }), [recruiters])

  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.company,
  }))

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!validateRequired(form.fullName))
      newErrors.fullName = 'Recruiter name is required.'

    if (!validateEmail(form.email))
      newErrors.email = 'Enter a valid email.'

    if (!validatePhone(form.phone))
      newErrors.phone = 'Enter a valid phone number.'

    if (!validateRequired(form.companyId))
      newErrors.companyId = 'Select a company.'

    if (!validateRequired(form.designation))
      newErrors.designation = 'Designation is required.'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleAdd = () => {
    setEditingRecruiter(null)
    setErrors({})
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }

  const handleEdit = (row) => {
    setEditingRecruiter(row)

    setForm({
      fullName: row.recruiter,
      email: row.email,
      phone: row.phone,
      designation: row.designation,
      companyId: row.companyId,
    })

    setErrors({})
    setFormOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setSaving(true)

    try {
      if (editingRecruiter) {
        await updateRecruiter(editingRecruiter.id, form)

        notify('Recruiter updated successfully.')
      } else {
        await createRecruiter(form)

        notify('Recruiter created successfully.')
      }

      const updated = await getRecruiters()
      setRecruiters(updated)

      setFormOpen(false)
      setEditingRecruiter(null)
      setForm(EMPTY_FORM)
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = (row) => {
    setStatusRecruiter(row)
  }

  const confirmToggleStatus = async () => {
    if (!statusRecruiter) return

    try {
      await updateRecruiterStatus(
        statusRecruiter.id,
        !statusRecruiter.active
      )

      notify(
        `Recruiter ${
          statusRecruiter.active
            ? 'deactivated'
            : 'activated'
        } successfully.`
      )

      const updated = await getRecruiters()
      setRecruiters(updated)

      setStatusRecruiter(null)

    } catch (error) {
      notify(
        error.message ||
        'Failed to update recruiter status.'
      )
    }
  }

  const handleView = (row) => {
    setViewRecruiter(row)
  }

  return (
  <div className="flex flex-col gap-6">

    <PageHeader
      title="Recruiter Management"
      description="Manage recruiter accounts and company associations."
      breadcrumb={['Dashboard', 'Recruiters']}
    />

    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatisticCard
        title="Total Recruiters"
        value={stats.total}
      />

      <StatisticCard
        title="Active Recruiters"
        value={stats.active}
      />

      <StatisticCard
        title="Inactive Recruiters"
        value={stats.inactive}
      />
    </div>

    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by recruiter name or email"
        className="md:max-w-md"
      />

      <Button
        icon={Plus}
        onClick={handleAdd}
      >
        Add Recruiter
      </Button>

    </div>

    {loading ? (
      <SkeletonLoader rows={6} />
    ) : (
      <Table
        columns={[
          {
            key: 'userId',
            header: 'User ID',
          },
          {
            key: 'recruiter',
            header: 'Recruiter Name',
          },
          {
            key: 'company',
            header: 'Company',
          },
          {
            key: 'email',
            header: 'Email',
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <Badge label={row.status} />
            ),
          },
        ]}
        rows={filteredItems}
        emptyMessage="No recruiters found."
        actions={(row) => (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              icon={Eye}
              onClick={() => handleView(row)}
            >
              View
            </Button>

            <Button
              size="sm"
              variant="outline"
              icon={Pencil}
              onClick={() => handleEdit(row)}
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
    {/* View Recruiter */}
      {viewRecruiter && (
        <Modal
          open={!!viewRecruiter}
          onClose={() => setViewRecruiter(null)}
          title="Recruiter Details"
          size="lg"
        >
          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <Avatar
                name={viewRecruiter.recruiter}
                size="lg"
              />

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {viewRecruiter.recruiter}
                </h2>

                <p className="text-sm text-gray-500">
                  {viewRecruiter.designation}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  User ID
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewRecruiter.userId}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Company
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewRecruiter.company}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewRecruiter.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone Number
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewRecruiter.phone}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Designation
                </p>
                <p className="mt-1 text-sm text-gray-800">
                  {viewRecruiter.designation}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </p>

                <div className="mt-1">
                  <Badge label={viewRecruiter.status} />
                </div>
              </div>

            </div>
          </div>
        </Modal>
      )}

      {/* Add / Edit Recruiter */}
      <Modal
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditingRecruiter(null)
          setForm(EMPTY_FORM)
          setErrors({})
        }}
        title={
          editingRecruiter
            ? 'Edit Recruiter'
            : 'Add Recruiter'
        }
        size="lg"
      >
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-4"
        >
          <Input
            label="Recruiter Name"
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
            value={form.phone}
            onChange={(e) =>
              handleFormChange('phone', e.target.value)
            }
            error={errors.phone}
            required
          />

          <Dropdown
            label="Company"
            value={form.companyId}
            onChange={(e) =>
              handleFormChange('companyId', e.target.value)
            }
            options={companyOptions}
            error={errors.companyId}
            required
          />

          <Input
            label="Designation"
            value={form.designation}
            onChange={(e) =>
              handleFormChange('designation', e.target.value)
            }
            error={errors.designation}
            required
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormOpen(false)
                setEditingRecruiter(null)
                setForm(EMPTY_FORM)
                setErrors({})
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={saving}
            >
              {editingRecruiter
                ? 'Save Changes'
                : 'Create Recruiter'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={!!statusRecruiter}
        onClose={() => setStatusRecruiter(null)}
        title={
          statusRecruiter?.active
            ? 'Deactivate Recruiter'
            : 'Activate Recruiter'
        }
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setStatusRecruiter(null)}
            >
              Cancel
            </Button>

            <Button
              variant={
                statusRecruiter?.active
                  ? 'danger'
                  : 'success'
              }
              onClick={confirmToggleStatus}
            >
              {statusRecruiter?.active
                ? 'Deactivate'
                : 'Activate'}
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to{' '}
          <strong>
            {statusRecruiter?.active
              ? 'deactivate'
              : 'activate'}
          </strong>{' '}
          recruiter{' '}
          <strong>
            {statusRecruiter?.recruiter}
          </strong>
          ?
        </p>
      </Modal>
    </div>
  )
}
