/*
==========================================
Component: SuperAdminPlacementAdmins

Purpose:
Allows the Super Admin to manage Placement Admin accounts (SRS 2.3:
"Manage Placement Admin accounts").

Current Features:
- Placement Admin accounts table
- Add Placement Admin modal form

Future Backend Integration:
GET /super-admin/placement-admins, POST /super-admin/placement-admins,
PUT /super-admin/placement-admins/{id}.
==========================================
*/

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getPlacementAdmins, createPlacementAdmin } from '../../services/superAdminService'
import { useNotification } from '../../hooks/useNotification'
import { validateEmail, validateRequired } from '../../utils/validators'
import { formatDate } from '../../utils/formatDate'

const EMPTY_FORM = { name: '', email: '', department: '' }

export default function SuperAdminPlacementAdmins() {
  const { notify } = useNotification()
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Backend Integration: replace with real GET /super-admin/placement-admins response.
    getPlacementAdmins().then((res) => {
      setAdmins(res)
      setLoading(false)
    })
  }, [])

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const validate = () => {
    const newErrors = {}
    if (!validateRequired(form.name)) newErrors.name = 'Name is required.'
    if (!validateEmail(form.email)) newErrors.email = 'Enter a valid email address.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    // Backend Integration: replace with real POST /super-admin/placement-admins call.
    const created = await createPlacementAdmin({ ...form, status: 'Active', createdDate: new Date().toISOString().slice(0, 10) })
    setAdmins((prev) => [...prev, created])
    setSaving(false)
    setAddOpen(false)
    setForm(EMPTY_FORM)
    notify('Placement Admin Account Created')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Placement Admin Accounts"
        description="Manage Placement Admin accounts across the institution."
        breadcrumb={['Dashboard', 'Placement Admins']}
        primaryAction={
          <Button icon={Plus} onClick={() => setAddOpen(true)}>
            Add Placement Admin
          </Button>
        }
      />

      {loading ? (
        <SkeletonLoader rows={5} />
      ) : (
        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'department', header: 'Department' },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
            { key: 'createdDate', header: 'Created', render: (r) => formatDate(r.createdDate) },
          ]}
          rows={admins}
          emptyMessage="No Placement Admin accounts found."
        />
      )}

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Placement Admin"
        footer={
          <>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} loading={saving}>Create Account</Button>
          </>
        }
      >
        <form onSubmit={handleAdd} className="flex flex-col gap-4" noValidate>
          <Input label="Full Name" name="name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} required error={errors.name} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required error={errors.email} />
          <Input label="Department / Cell" name="department" value={form.department} onChange={(e) => handleChange('department', e.target.value)} />
        </form>
      </Modal>
    </div>
  )
}
