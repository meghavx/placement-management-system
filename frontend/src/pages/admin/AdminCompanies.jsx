/*
==========================================
Component: AdminCompanies

Purpose:
Provides Placement Admins with a centralized company directory, built
from recruiter/company associations per the spec's fallback guidance
(the SRS does not define a standalone Company CRUD module).

Current Features:
- Company cards (logo initial, industry, website, recruiters, open drives)
- Company table with the same information

Future Backend Integration:
GET /admin/companies.
==========================================
*/

import { useEffect, useMemo, useState } from 'react'
import {
  Plus,
  Pencil,
  Eye,
  Power,
} from 'lucide-react'

import Avatar from '../../components/Avatar'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import SkeletonLoader from '../../components/SkeletonLoader'

import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'

import {
  getCompanies,
} from '../../services/companyService'

const EMPTY_FORM = {
  companyName: '',
  industry: '',
  website: '',
  location: '',
  description: '',
}

export default function AdminCompanies() {
  const { notify } = useNotification()

  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  const [viewCompany, setViewCompany] = useState(null)

  const [companyModalOpen, setCompanyModalOpen] =
    useState(false)

  const [editingCompany, setEditingCompany] =
    useState(null)

  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState(EMPTY_FORM)

  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadCompanies()
  }, [])

  async function loadCompanies() {
    try {
      setLoading(true)

      const data = await getCompanies()

      setCompanies(data)
    } catch (error) {
      notify('Failed to load companies', 'error')
    } finally {
      setLoading(false)
    }
  }

  const {
    searchTerm,
    setSearchTerm,
    filteredItems,
  } = useSearch(companies, [
    'company',
    'industry',
    'location',
  ])

  const stats = useMemo(() => {
    return {
      total: companies.length,
      active: companies.filter(
        (c) => c.status === 'Active'
      ).length,
      inactive: companies.filter(
        (c) => c.status === 'Inactive'
      ).length,
    }
  }, [companies])

  function resetForm() {
    setEditingCompany(null)
    setForm(EMPTY_FORM)
    setErrors({})
  }

  function handleAddCompany() {
    resetForm()
    setCompanyModalOpen(true)
  }

  function handleEditCompany(company) {
    setEditingCompany(company)

    setForm({
      companyName: company.company,
      industry: company.industry,
      website: company.website,
      location: company.location,
      description: company.description,
    })

    setErrors({})
    setCompanyModalOpen(true)
  }

  function handleFormChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  function validateForm() {
    const newErrors = {}

    if (!form.companyName.trim())
      newErrors.companyName = 'Required'

    if (!form.industry.trim())
      newErrors.industry = 'Required'

    if (!form.website.trim())
      newErrors.website = 'Required'

    if (!form.location.trim())
      newErrors.location = 'Required'

    if (!form.description.trim())
      newErrors.description = 'Required'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  async function handleSaveCompany(e) {
    e.preventDefault()

    if (!validateForm()) return

    setSaving(true)

    try {
      // Backend integration later:
      // POST /companies
      // PUT /companies/{id}

      notify(
        editingCompany
          ? 'Company updated successfully.'
          : 'Company created successfully.'
      )

      setCompanyModalOpen(false)

      resetForm()
    } finally {
      setSaving(false)
    }
  }

  async function handleToggleStatus(company) {
    // Backend integration later:
    // PATCH /companies/{id}/status

    notify(
      `${company.company} status updated.`
    )
  }

  const columns = [
    { key: 'company', header: 'Company' },
    { key: 'industry', header: 'Industry' },
    { key: 'location', header: 'Location' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <Badge label={row.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={Eye}
            onClick={() => setViewCompany(row)}
          >
            View
          </Button>

          <Button
            size="sm"
            variant="outline"
            icon={Pencil}
            onClick={() => handleEditCompany(row)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant={row.status === 'Active' ? 'danger' : 'success'}
            icon={Power}
            onClick={() => handleToggleStatus(row)}
          >
            {row.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      ),
    },
  ]

  return (
  <div className="flex flex-col gap-6">
    <PageHeader
      title="Company Management"
      description="Create and manage company records."
      breadcrumb={['Dashboard', 'Companies']}
    />

    {loading ? (
      <SkeletonLoader rows={6} />
    ) : (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatisticCard
            title="Total Companies"
            value={stats.total}
          />

          <StatisticCard
            title="Active"
            value={stats.active}
          />

          <StatisticCard
            title="Inactive"
            value={stats.inactive}
          />
        </div>

        {/* Header Actions */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by company name"
            className="w-full lg:max-w-md"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              icon={Plus}
              onClick={handleAddCompany}
            >
              Add Company
            </Button>
          </div>
        </div>

        <Card title="All Companies">
          <Table
            columns={columns}
            rows={filteredItems}
            emptyMessage="No companies found."
          />
        </Card>

        {/* View Company */}
        {viewCompany && (
          <Modal
            open={!!viewCompany}
            onClose={() => setViewCompany(null)}
            title="Company Details"
            size="lg"
          >
            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <Avatar
                  name={viewCompany.company}
                  size="lg"
                />

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {viewCompany.company}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {viewCompany.industry}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-5">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Website
                  </p>
                  <p className="mt-1 text-sm text-gray-800">
                    {viewCompany.website || '-'}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-gray-800">
                    {viewCompany.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </p>

                  <div className="mt-1">
                    <Badge label={viewCompany.status} />
                  </div>
                </div>

              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Description
                </p>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  {viewCompany.description || 'No description available.'}
                </div>
              </div>

            </div>
          </Modal>
        )}

        {/* Add / Edit Company */}
        <Modal
          open={companyModalOpen}
          onClose={() => {
            setCompanyModalOpen(false)
            resetForm()
          }}
          title={
            editingCompany
              ? 'Edit Company'
              : 'Add Company'
          }
          size="lg"
        >
          <form
            onSubmit={handleSaveCompany}
            className="flex flex-col gap-4"
          >
            <Input
              label="Company Name"
              value={form.companyName}
              onChange={(e) =>
                handleFormChange(
                  'companyName',
                  e.target.value
                )
              }
              error={errors.companyName}
              required
            />

            <Input
              label="Industry"
              value={form.industry}
              onChange={(e) =>
                handleFormChange(
                  'industry',
                  e.target.value
                )
              }
              error={errors.industry}
              required
            />

            <Input
              label="Website"
              value={form.website}
              onChange={(e) =>
                handleFormChange(
                  'website',
                  e.target.value
                )
              }
              error={errors.website}
              required
            />

            <Input
              label="Location"
              value={form.location}
              onChange={(e) =>
                handleFormChange(
                  'location',
                  e.target.value
                )
              }
              error={errors.location}
              required
            />

            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) =>
                handleFormChange(
                  'description',
                  e.target.value
                )
              }
              error={errors.description}
              rows={5}
              required
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCompanyModalOpen(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                loading={saving}
              >
                {editingCompany
                  ? 'Save Changes'
                  : 'Create Company'}
              </Button>
            </div>
          </form>
        </Modal>
      </>
    )}
  </div>
)
}
