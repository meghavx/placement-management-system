/*
==========================================
Component: AdminDrives

Purpose:
Allows Placement Admins to oversee all placement drives across every
recruiter (creation, eligibility configuration, scheduling, and
publication — FR-4.5.1 to FR-4.5.4).

Current Features:
- Status statistic cards
- Search and status filter
- Drive table with View/Edit/Publish/Close/Delete actions
- Drive details modal

Future Backend Integration:
GET /admin/drives, POST /admin/drives, PUT /admin/drives/{id}.
==========================================
*/

import { useEffect, useState } from 'react'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SearchBar from '../../components/SearchBar'
import FilterBar from '../../components/FilterBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getAdminDrives, updateAdminDrive } from '../../services/adminService'
import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'
import { formatSalary } from '../../utils/formatSalary'
import { DRIVE_STATUS } from '../../constants/driveStatus'

export default function AdminDrives() {
  const { notify } = useNotification()
  const [drives, setDrives] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [viewDrive, setViewDrive] = useState(null)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(drives, ['company', 'role'])
  const statusFiltered = status ? filteredItems.filter((d) => d.status === status) : filteredItems

  useEffect(() => {
    // Backend Integration: replace with real GET /admin/drives response.
    getAdminDrives().then((res) => {
      setDrives(res)
      setLoading(false)
    })
  }, [])

  const stats = {
    draft: drives.filter((d) => d.status === DRIVE_STATUS.DRAFT).length,
    published: drives.filter((d) => d.status === DRIVE_STATUS.PUBLISHED).length,
    closed: drives.filter((d) => d.status === DRIVE_STATUS.CLOSED).length,
    expired: drives.filter((d) => d.status === DRIVE_STATUS.EXPIRED).length,
  }

  const handleStatusChange = async (drive, newStatus) => {
    await updateAdminDrive(drive.id, { status: newStatus })
    setDrives((prev) => prev.map((d) => (d.id === drive.id ? { ...d, status: newStatus } : d)))
    notify(`Drive ${newStatus}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Placement Drive Management"
        description="Oversee every placement drive created across all recruiters."
        breadcrumb={['Dashboard', 'Placement Drives']}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatisticCard title="Draft" value={stats.draft} />
        <StatisticCard title="Published" value={stats.published} />
        <StatisticCard title="Closed" value={stats.closed} />
        <StatisticCard title="Expired" value={stats.expired} />
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by company or role" className="sm:max-w-sm" />

      <FilterBar
        filters={[{ name: 'status', label: 'Status', value: status, onChange: (e) => setStatus(e.target.value), options: Object.values(DRIVE_STATUS) }]}
        onReset={() => setStatus('')}
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'drive', header: 'Drive' },
            { key: 'company', header: 'Company' },
            { key: 'role', header: 'Role' },
            { key: 'package', header: 'Package', render: (r) => formatSalary(r.package) },
            { key: 'applicants', header: 'Applicants' },
            { key: 'deadline', header: 'Deadline', render: (r) => formatDate(r.deadline) },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
          ]}
          rows={statusFiltered}
          emptyMessage="No placement drives found."
          actions={(row) => (
            <div className="flex flex-wrap gap-1">
              <Button variant="ghost" size="sm" icon={Eye} onClick={() => setViewDrive(row)} />
              <Button variant="ghost" size="sm" icon={Pencil} />
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
              <Button variant="ghost" size="sm" icon={Trash2} />
            </div>
          )}
        />
      )}

      <Modal open={!!viewDrive} onClose={() => setViewDrive(null)} title={viewDrive?.drive}>
        {viewDrive && (
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p><span className="font-medium">Company:</span> {viewDrive.company}</p>
            <p><span className="font-medium">Role:</span> {viewDrive.role}</p>
            <p><span className="font-medium">Package:</span> {formatSalary(viewDrive.package)}</p>
            <p><span className="font-medium">Applicants:</span> {viewDrive.applicants}</p>
            <p><span className="font-medium">Deadline:</span> {formatDate(viewDrive.deadline)}</p>
            <p><span className="font-medium">Status:</span> <Badge label={viewDrive.status} /></p>
          </div>
        )}
      </Modal>
    </div>
  )
}
