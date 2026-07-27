/*
==========================================
Component: RecruiterDrives

Purpose:
Allows recruiters to manage all placement drives they have created
(spec Part 4 — Placement Drives Page).

Current Features:
- Search, status/location filters
- Drive table with View/Edit/Delete/Publish/Close actions
- Delete confirmation modal
- Publish/Close via ConfirmationModal

Future Backend Integration:
GET /recruiter/drives, PUT /recruiter/drives/{id}, DELETE /recruiter/drives/{id}.
==========================================
*/

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import SearchBar from '../../components/SearchBar'
import FilterBar from '../../components/FilterBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ConfirmationModal from '../../components/ConfirmationModal'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getRecruiterDrives, deleteDrive, updateDrive } from '../../services/recruiterService'
import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'
import { formatSalary } from '../../utils/formatSalary'
import { DRIVE_STATUS } from '../../constants/driveStatus'
import { ROUTES } from '../../constants/routes'

export default function RecruiterDrives() {
  const navigate = useNavigate()
  const { notify } = useNotification()
  const [drives, setDrives] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [viewDrive, setViewDrive] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(drives, ['company', 'role'])
  const statusFiltered = status ? filteredItems.filter((d) => d.status === status) : filteredItems

  useEffect(() => {
    // Backend Integration: replace with real GET /recruiter/drives response.
    getRecruiterDrives().then((res) => {
      setDrives(res)
      setLoading(false)
    })
  }, [])

  const handleDelete = async () => {
    // Backend Integration: replace with real DELETE /recruiter/drives/{id} call.
    await deleteDrive(deleteTarget.id)
    setDrives((prev) => prev.filter((d) => d.id !== deleteTarget.id))
    setDeleteTarget(null)
    notify('Drive Deleted')
  }

  const handleStatusChange = async (drive, newStatus) => {
    // Backend Integration: replace with real PUT /recruiter/drives/{id} call.
    await updateDrive(drive.id, { status: newStatus })
    setDrives((prev) => prev.map((d) => (d.id === drive.id ? { ...d, status: newStatus } : d)))
    notify(`Drive ${newStatus}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Placement Drives"
        description="Manage all placement drives you have created."
        breadcrumb={['Dashboard', 'Placement Drives']}
        primaryAction={
          <Button icon={Plus} onClick={() => navigate(ROUTES.RECRUITER_CREATE_DRIVE)}>
            Create Drive
          </Button>
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by company or role" className="sm:max-w-sm" />
      </div>

      <FilterBar
        filters={[{ name: 'status', label: 'Status', value: status, onChange: (e) => setStatus(e.target.value), options: Object.values(DRIVE_STATUS) }]}
        onReset={() => setStatus('')}
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'id', header: 'Drive ID' },
            { key: 'company', header: 'Company' },
            { key: 'role', header: 'Role' },
            { key: 'package', header: 'Package', render: (r) => formatSalary(r.package) },
            { key: 'deadline', header: 'Deadline', render: (r) => formatDate(r.deadline) },
            { key: 'applications', header: 'Applications' },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
          ]}
          rows={statusFiltered}
          emptyMessage="You have not created any placement drives yet."
          actions={(row) => (
            <div className="flex flex-wrap gap-1">
              <Button variant="ghost" size="sm" icon={Eye} onClick={() => setViewDrive(row)} />
              <Button
                variant="ghost"
                size="sm"
                icon={Pencil}
                onClick={() => navigate(ROUTES.RECRUITER_EDIT_DRIVE.replace(':driveId', row.id))}
              />
              {row.status === DRIVE_STATUS.DRAFT && (
                <Button variant="outline" size="sm" onClick={() => handleStatusChange(row, DRIVE_STATUS.PUBLISHED)}>
                  Publish
                </Button>
              )}
              {row.status === DRIVE_STATUS.PUBLISHED && (
                <Button variant="outline" size="sm" onClick={() => handleStatusChange(row, DRIVE_STATUS.CLOSED)}>
                  Close
                </Button>
              )}
              <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setDeleteTarget(row)} />
            </div>
          )}
        />
      )}

      <Modal open={!!viewDrive} onClose={() => setViewDrive(null)} title={viewDrive?.company} size="lg">
        {viewDrive && (
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            <p><span className="font-medium">Role:</span> {viewDrive.role}</p>
            <p><span className="font-medium">Package:</span> {formatSalary(viewDrive.package)}</p>
            <p><span className="font-medium">Location:</span> {viewDrive.location}</p>
            <p><span className="font-medium">Eligibility:</span> Min CGPA {viewDrive.minCgpa}, {viewDrive.departments.join(', ')}</p>
            <p><span className="font-medium">Selection Process:</span> {viewDrive.selectionProcess.join(' → ')}</p>
            <p><span className="font-medium">Description:</span> {viewDrive.description}</p>
          </div>
        )}
      </Modal>

      <ConfirmationModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Placement Drive"
        message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.role}" at ${deleteTarget.company}? This cannot be undone.` : ''}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  )
}
