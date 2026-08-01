/*
==========================================
Component: StudentApplications

Purpose:
Allows students to track submitted applications and their current
status (FR-4.7.3 to FR-4.7.8).

Current Features:
- Status statistic cards
- Search and status filter
- Applications table with color-coded status badges
- Application timeline modal

Future Backend Integration:
GET /student/applications, GET /student/application/{id}.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SearchBar from '../../components/SearchBar'
import FilterBar from '../../components/FilterBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getStudentApplications, getStudentApplicationById } from '../../services/studentService'
import { useSearch } from '../../hooks/useSearch'
import { formatDate } from '../../utils/formatDate'
import { APPLICATION_STATUS } from '../../constants/applicationStatus'

const TIMELINE_STEPS = [
  APPLICATION_STATUS.APPLIED,
  APPLICATION_STATUS.SHORTLISTED,
  APPLICATION_STATUS.INTERVIEW_SCHEDULED,
  APPLICATION_STATUS.SELECTED,
]

export default function StudentApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [selected, setSelected] = useState(null)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(applications, ['company', 'role'])
  const statusFiltered = status ? filteredItems.filter((a) => a.status === status) : filteredItems

  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await getStudentApplications()
        setApplications(data)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const stats = {
    applied: applications.filter((a) => a.status === APPLICATION_STATUS.APPLIED).length,
    shortlisted: applications.filter((a) => a.status === APPLICATION_STATUS.SHORTLISTED).length,
    interview: applications.filter((a) => a.status === APPLICATION_STATUS.INTERVIEW_SCHEDULED).length,
    selected: applications.filter((a) => a.status === APPLICATION_STATUS.SELECTED).length,
    rejected: applications.filter((a) => a.status === APPLICATION_STATUS.REJECTED).length,
  }

  const handleViewDetails = async (applicationId) => {
    try {
      const application = await getStudentApplicationById(applicationId)
      setSelected(application)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="My Applications"
        description="Track the status of every placement drive you've applied to."
        breadcrumb={['Dashboard', 'Applications']}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatisticCard title="Applied" value={stats.applied} />
        <StatisticCard title="Shortlisted" value={stats.shortlisted} />
        <StatisticCard title="Interview" value={stats.interview} />
        <StatisticCard title="Selected" value={stats.selected} />
        <StatisticCard title="Rejected" value={stats.rejected} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by company or role" className="sm:max-w-sm" />
      </div>

      <FilterBar
        filters={[{ name: 'status', label: 'Status', value: status, onChange: (e) => setStatus(e.target.value), options: Object.values(APPLICATION_STATUS) }]}
        onReset={() => setStatus('')}
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            {
              key: 'companyName',
              header: 'Company',
            },
            {
              key: 'jobRole',
              header: 'Role',
            },
            {
              key: 'driveDate',
              header: 'Drive Date',
              render: (r) => formatDate(r.driveDate),
            },
            {
              key: 'appliedAt',
              header: 'Applied On',
              render: (r) => formatDate(r.appliedAt),
            },
            {
              key: 'status',
              header: 'Status',
              render: (r) => <Badge label={r.status} />,
            },
          ]}
          rows={statusFiltered}
          emptyMessage="No applications match your search."
          actions={(row) => (
            <Button variant="outline" size="sm" onClick={() => handleViewDetails(row.id)}>
              View Details
            </Button>
          )}
        />
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.company} — ${selected.role}` : ''}>
        {selected && (
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-gray-500">Company</p>
              <p className="font-medium">{selected.companyName}</p>
            </div>

            <div>
              <p className="text-gray-500">Role</p>
              <p className="font-medium">{selected.jobRole}</p>
            </div>

            <div>
              <p className="text-gray-500">Package</p>
              <p className="font-medium">
                {selected.packageOffered?.toLocaleString('en-IN')}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Drive Date</p>
              <p className="font-medium">
                {formatDate(selected.driveDate)}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <Badge label={selected.status} />
            </div>

            <div>
              <p className="text-gray-500">Applied On</p>
              <p className="font-medium">
                {formatDate(selected.appliedAt)}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Last Updated</p>
              <p className="font-medium">
                {formatDate(selected.updatedAt)}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Roll Number</p>
              <p className="font-medium">
                {selected.rollNumber}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
