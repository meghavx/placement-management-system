/*
==========================================
Component: AdminApplications

Purpose:
Provides Placement Admins with visibility into every student
application across all placement drives.

Current Features:
- Status statistic cards
- Search and status filter
- Applications table with View/Export actions

Future Backend Integration:
GET /admin/applications.
==========================================
*/

import { useEffect, useState } from 'react'
import { Eye, Download } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SearchBar from '../../components/SearchBar'
import FilterBar from '../../components/FilterBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getAllApplications } from '../../services/adminService'
import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'
import { downloadFile } from '../../utils/downloadFile'
import { APPLICATION_STATUS } from '../../constants/applicationStatus'

export default function AdminApplications() {
  const { notify } = useNotification()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [selected, setSelected] = useState(null)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(applications, ['student', 'company'])
  const statusFiltered = status ? filteredItems.filter((a) => a.status === status) : filteredItems

  useEffect(() => {
    // Backend Integration: replace with real GET /admin/applications response.
    getAllApplications().then((res) => {
      setApplications(res)
      setLoading(false)
    })
  }, [])

  const stats = {
    applications: applications.length,
    shortlisted: applications.filter((a) => a.status === APPLICATION_STATUS.SHORTLISTED).length,
    interview: applications.filter((a) => a.status === APPLICATION_STATUS.INTERVIEW_SCHEDULED).length,
    selected: applications.filter((a) => a.status === APPLICATION_STATUS.SELECTED).length,
    rejected: applications.filter((a) => a.status === APPLICATION_STATUS.REJECTED).length,
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Application Management"
        description="Monitor all student applications across every placement drive."
        breadcrumb={['Dashboard', 'Applications']}
        primaryAction={
          <Button variant="outline" icon={Download} onClick={() => { downloadFile('applications_export.csv'); notify('Export Started') }}>
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatisticCard title="Applications" value={stats.applications} />
        <StatisticCard title="Shortlisted" value={stats.shortlisted} />
        <StatisticCard title="Interview" value={stats.interview} />
        <StatisticCard title="Selected" value={stats.selected} />
        <StatisticCard title="Rejected" value={stats.rejected} />
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by student or company" className="sm:max-w-sm" />

      <FilterBar
        filters={[{ name: 'status', label: 'Status', value: status, onChange: (e) => setStatus(e.target.value), options: Object.values(APPLICATION_STATUS) }]}
        onReset={() => setStatus('')}
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'student', header: 'Student' },
            { key: 'company', header: 'Company' },
            { key: 'role', header: 'Role' },
            { key: 'appliedDate', header: 'Applied Date', render: (r) => formatDate(r.appliedDate) },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
            { key: 'interviewDate', header: 'Interview', render: (r) => formatDate(r.interviewDate) },
          ]}
          rows={statusFiltered}
          emptyMessage="No applications found."
          actions={(row) => (
            <Button variant="ghost" size="sm" icon={Eye} onClick={() => setSelected(row)} />
          )}
        />
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.student} — ${selected.company}` : ''}>
        {selected && (
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p><span className="font-medium">Role:</span> {selected.role}</p>
            <p><span className="font-medium">Applied Date:</span> {formatDate(selected.appliedDate)}</p>
            <p><span className="font-medium">Status:</span> <Badge label={selected.status} /></p>
            <p><span className="font-medium">Interview Date:</span> {formatDate(selected.interviewDate)}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
