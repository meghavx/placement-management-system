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

import { useEffect, useState } from 'react'
import { Plus, Eye, Pencil, KeyRound, UserCheck, UserX, Trash2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SearchBar from '../../components/SearchBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import ConfirmationModal from '../../components/ConfirmationModal'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getRecruiters, createRecruiter, updateRecruiter, deleteRecruiter } from '../../services/adminService'
import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import { validateEmail, validatePhone, validateRequired } from '../../utils/validators'
import { formatDate } from '../../utils/formatDate'

const EMPTY_FORM = { company: '', recruiter: '', email: '', phone: '', website: '', industry: '', address: '' }

export default function AdminRecruiters() {
  const { notify } = useNotification()
  const [recruiters, setRecruiters] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewRecruiter, setViewRecruiter] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(recruiters, ['recruiter', 'company', 'email'])

  // useEffect(() => {
  //   // Backend Integration: replace with real GET /admin/recruiters response.
  //   getRecruiters().then((res) => {
  //     setRecruiters(res)
  //     setLoading(false)
  //   })
  // }, [])

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const data = await getRecruiters()
        setRecruiters(data)
      } catch (error) {
        console.error(error)
        notify('Failed to load recruiters')
      } finally {
        setLoading(false)
      }
    }

    fetchRecruiters()
  }, [])

  const stats = {
    recruiters: recruiters.length,
    companies: new Set(recruiters.map((r) => r.company)).size,
    active: recruiters.filter((r) => r.status === 'Active').length,
    inactive: recruiters.filter((r) => r.status === 'Inactive').length,
  }

  const handleFormChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const validate = () => {
    const newErrors = {}
    if (!validateRequired(form.company)) newErrors.company = 'Company name is required.'
    if (!validateRequired(form.recruiter)) newErrors.recruiter = 'Recruiter name is required.'
    if (!validateEmail(form.email)) newErrors.email = 'Enter a valid email address.'
    if (!validatePhone(form.phone)) newErrors.phone = 'Enter a valid 10-digit phone number.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    // Backend Integration: replace with real POST /admin/recruiters call.
    const created = await createRecruiter({ ...form, status: 'Active', createdDate: new Date().toISOString().slice(0, 10), id: `REC${200 + recruiters.length + 1}` })
    setRecruiters((prev) => [...prev, created])
    setSaving(false)
    setAddOpen(false)
    setForm(EMPTY_FORM)
    notify('Recruiter Account Created')
  }

  const handleToggleStatus = async (recruiter) => {
    const newStatus = recruiter.status === 'Active' ? 'Inactive' : 'Active'
    await updateRecruiter(recruiter.id, { status: newStatus })
    setRecruiters((prev) => prev.map((r) => (r.id === recruiter.id ? { ...r, status: newStatus } : r)))
    notify(newStatus === 'Active' ? 'Recruiter Activated' : 'Recruiter Deactivated')
  }

  const handleDelete = async () => {
    await deleteRecruiter(deleteTarget.id)
    setRecruiters((prev) => prev.filter((r) => r.id !== deleteTarget.id))
    setDeleteTarget(null)
    notify('Recruiter Deleted')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Recruiter Management"
        description="Manage recruiter accounts and company associations."
        breadcrumb={['Dashboard', 'Recruiters']}
        primaryAction={
          <Button icon={Plus} onClick={() => setAddOpen(true)}>
            Add Recruiter
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatisticCard title="Recruiters" value={stats.recruiters} />
        <StatisticCard title="Companies" value={stats.companies} />
        <StatisticCard title="Active" value={stats.active} />
        <StatisticCard title="Inactive" value={stats.inactive} />
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by recruiter, company, or email" className="sm:max-w-sm" />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'recruiter', header: 'Recruiter' },
            { key: 'company', header: 'Company' },
            { key: 'email', header: 'Email' },
            { key: 'phone', header: 'Phone' },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
            {
              key: 'createdDate',
              header: 'Created',
              render: (r) => (r.createdDate ? formatDate(r.createdDate) : '-'),
            },
          ]}
          rows={filteredItems}
          emptyMessage="No recruiters found."
          actions={(row) => (
            <div className="flex flex-wrap gap-1">
              <Button variant="ghost" size="sm" icon={Eye} onClick={() => setViewRecruiter(row)} />
              <Button variant="ghost" size="sm" icon={Pencil} />
              <Button variant="ghost" size="sm" icon={KeyRound} onClick={() => notify('Password Reset Email Sent')} />
              <Button variant="ghost" size="sm" icon={row.status === 'Active' ? UserX : UserCheck} onClick={() => handleToggleStatus(row)} />
              <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setDeleteTarget(row)} />
            </div>
          )}
        />
      )}

      <Modal open={!!viewRecruiter} onClose={() => setViewRecruiter(null)} title={viewRecruiter?.recruiter}>
        {viewRecruiter && (
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p><span className="font-medium">Company:</span> {viewRecruiter.company}</p>
            <p><span className="font-medium">Email:</span> {viewRecruiter.email}</p>
            <p><span className="font-medium">Phone:</span> {viewRecruiter.phone}</p>
            <p><span className="font-medium">Status:</span> <Badge label={viewRecruiter.status} /></p>
            <p><span className="font-medium">Created:</span> {formatDate(viewRecruiter.createdDate)}</p>
          </div>
        )}
      </Modal>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Recruiter"
        footer={
          <>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} loading={saving}>Create Account</Button>
          </>
        }
      >
        <form onSubmit={handleAdd} className="flex flex-col gap-4" noValidate>
          <Input label="Company" name="company" value={form.company} onChange={(e) => handleFormChange('company', e.target.value)} required error={errors.company} />
          <Input label="Recruiter Name" name="recruiter" value={form.recruiter} onChange={(e) => handleFormChange('recruiter', e.target.value)} required error={errors.recruiter} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={(e) => handleFormChange('email', e.target.value)} required error={errors.email} />
          <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={(e) => handleFormChange('phone', e.target.value)} required error={errors.phone} />
          <Input label="Website" name="website" value={form.website} onChange={(e) => handleFormChange('website', e.target.value)} />
          <Input label="Industry" name="industry" value={form.industry} onChange={(e) => handleFormChange('industry', e.target.value)} />
          <Input label="Address" name="address" value={form.address} onChange={(e) => handleFormChange('address', e.target.value)} />
        </form>
      </Modal>

      <ConfirmationModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Recruiter"
        message={deleteTarget ? `Are you sure you want to delete ${deleteTarget.recruiter}'s account? This cannot be undone.` : ''}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  )
}
