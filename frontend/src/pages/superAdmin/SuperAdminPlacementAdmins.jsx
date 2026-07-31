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
import { Plus, Pencil } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import SkeletonLoader from '../../components/SkeletonLoader'
import ActionMenu from '../../components/ActionMenu'
import { getPlacementAdmins, createPlacementAdmin, updatePlacementAdmin, updatePlacementAdminStatus } from '../../services/superAdminService'
import { useNotification } from '../../hooks/useNotification'
import { validateEmail, validateRequired } from '../../utils/validators'
import { formatDate } from '../../utils/formatDate'

// const EMPTY_FORM = { name: '', email: '', department: '' }
const EMPTY_FORM = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
}

export default function SuperAdminPlacementAdmins() {
  const { notify } = useNotification()
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  // useEffect(() => {
  //   // Backend Integration: replace with real GET /super-admin/placement-admins response.
  //   getPlacementAdmins().then((res) => {
  //     setAdmins(res)
  //     setLoading(false)
  //   })
  // }, [])
  useEffect(() => {
    const fetchPlacementAdmins = async () => {
      try {
        const res = await getPlacementAdmins()
        setAdmins(res)
      } catch (error) {
        notify('Failed to load Placement Admin accounts', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchPlacementAdmins()
  }, [notify])

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleEdit = (admin) => {
    setIsEditMode(true)
    setEditingAdmin(admin)

    setForm({
      name: admin.name,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      password: '',
    })

    setErrors({})
    setAddOpen(true)
  }


  const handleStatusChange = async (admin, active) => {
    try {
      const updated = await updatePlacementAdminStatus(admin.id, active)

      setAdmins((prev) =>
        prev.map((item) =>
          item.id === updated.id ? updated : item
        )
      )

      notify(
        `Placement Admin ${
          active ? 'activated' : 'deactivated'
        }`
      )
    } catch (error) {
      notify('Failed to update status', 'error')
    }
  }


  // const validate = () => {
  //   const newErrors = {}
  //   if (!validateRequired(form.name)) newErrors.name = 'Name is required.'
  //   if (!validateEmail(form.email)) newErrors.email = 'Enter a valid email address.'
  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }
  const validate = () => {
    const newErrors = {}

    if (!validateRequired(form.name))
      newErrors.name = 'Name is required.'

    if (!validateEmail(form.email))
      newErrors.email = 'Enter a valid email address.'

    if (!validateRequired(form.phoneNumber))
      newErrors.phoneNumber = 'Phone number is required.'

    // if (!validateRequired(form.password))
    //   newErrors.password = 'Password is required.'
    if (!isEditMode && !validateRequired(form.password))
      newErrors.password = 'Password is required.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   if (!validate()) return
  //   setSaving(true)
  //   // Backend Integration: replace with real POST /super-admin/placement-admins call.
  //   // const created = await createPlacementAdmin({ ...form, status: 'Active', createdDate: new Date().toISOString().slice(0, 10) })
  //   const created = await createPlacementAdmin(form)
  //   setAdmins((prev) => [...prev, created])
  //   setSaving(false)
  //   setAddOpen(false)
  //   setForm(EMPTY_FORM)
  //   notify('Placement Admin Account Created')
  // }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return
    setSaving(true)
    try {
      if (isEditMode) {
        const updated = await updatePlacementAdmin(editingAdmin.id, form)

        setAdmins((prev) =>
          prev.map((admin) =>
            admin.id === updated.id ? updated : admin
          )
        )

        notify('Placement Admin updated')
      } 
      else {
        const created = await createPlacementAdmin(form)
        setAdmins((prev) => [...prev, created])
        notify('Placement Admin Account Created')
      }

      setAddOpen(false)
      setForm(EMPTY_FORM)
      setEditingAdmin(null)
      setIsEditMode(false)
      setErrors({})
    } 
    catch (error) {
      notify(
        error?.response?.data?.message || 'Operation failed',
        'error'
      )
    }
    finally {
        setSaving(false)
      }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Placement Admin Accounts"
        description="Manage Placement Admin accounts across the institution."
        breadcrumb={['Dashboard', 'Placement Admins']}
        primaryAction={
          <Button
            icon={Plus}
            onClick={() => {
              setIsEditMode(false)
              setEditingAdmin(null)
              setForm(EMPTY_FORM)
              setErrors({})
              setAddOpen(true)
            }}
          >
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
            { key: 'phoneNumber', header: 'Phone Number' },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
          ]}
          rows={admins}
          actions={(row) => (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                icon={Pencil}
                onClick={() => handleEdit(row)}
              >
              </Button>

              <ActionMenu
                items={[
                  {
                    label: 'Active',
                    active: row.status === 'Active',
                    onClick: () => handleStatusChange(row, true),
                  },
                  {
                    label: 'Inactive',
                    active: row.status === 'Inactive',
                    onClick: () => handleStatusChange(row, false),
                  },
                ]}
              />
            </div>
          )}
          emptyMessage="No Placement Admin accounts found."
        />
      )}

      <Modal
        open={addOpen}
        onClose={() => {
          setAddOpen(false)
          setForm(EMPTY_FORM)
          setEditingAdmin(null)
          setIsEditMode(false)
          setErrors({})
        }}
        title={isEditMode ? 'Update Placement Admin' : 'Add Placement Admin'}
        footer={
          <>
            <Button variant="outline" 
              onClick={() => {
                setAddOpen(false)
                setForm(EMPTY_FORM)
                setEditingAdmin(null)
                setIsEditMode(false)
                setErrors({})
              }}>
                Cancel
            </Button>
            <Button onClick={handleSubmit} loading={saving}>
              {isEditMode ? 'Update' : 'Create Account'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input 
            label="Full Name" 
            name="name" 
            value={form.name} 
            onChange={(e) => handleChange('name', e.target.value)} required error={errors.name} 
          />

          <Input 
            label="Email" 
            name="email" type="email" 
            value={form.email} 
            onChange={(e) => handleChange('email', e.target.value)} required error={errors.email} 
          />

          {/* <Input 
            label="Department / Cell" 
            name="department" 
            value={form.department} 
            onChange={(e) => handleChange('department', e.target.value)} 
          /> */}
          
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />

          {!isEditMode && (
            <Input
              label="Temporary Password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={errors.password}
            />
          )}

        </form>
      </Modal>
    </div>
  )
}
