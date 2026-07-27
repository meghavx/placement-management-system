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
import { getStudentApplications } from '../../services/studentService'
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
    // Backend Integration: replace with real GET /student/applications response.
    getStudentApplications().then((res) => {
      setApplications(res)
      setLoading(false)
    })
  }, [])

  const stats = {
    applied: applications.filter((a) => a.status === APPLICATION_STATUS.APPLIED).length,
    shortlisted: applications.filter((a) => a.status === APPLICATION_STATUS.SHORTLISTED).length,
    interview: applications.filter((a) => a.status === APPLICATION_STATUS.INTERVIEW_SCHEDULED).length,
    selected: applications.filter((a) => a.status === APPLICATION_STATUS.SELECTED).length,
    rejected: applications.filter((a) => a.status === APPLICATION_STATUS.REJECTED).length,
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
            { key: 'company', header: 'Company' },
            { key: 'role', header: 'Role' },
            { key: 'appliedDate', header: 'Applied Date', render: (r) => formatDate(r.appliedDate) },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
            { key: 'interviewDate', header: 'Interview Date', render: (r) => formatDate(r.interviewDate) },
            { key: 'updatedOn', header: 'Updated On', render: (r) => formatDate(r.updatedOn) },
          ]}
          rows={statusFiltered}
          emptyMessage="No applications match your search."
          actions={(row) => (
            <Button variant="outline" size="sm" onClick={() => setSelected(row)}>
              View Details
            </Button>
          )}
        />
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.company} — ${selected.role}` : ''}>
        {selected && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">Application Timeline</p>
            <ol className="flex flex-col gap-3">
              {TIMELINE_STEPS.map((step) => {
                const stepIndex = TIMELINE_STEPS.indexOf(step)
                const currentIndex = TIMELINE_STEPS.indexOf(selected.status)
                const reached = selected.status === APPLICATION_STATUS.REJECTED ? stepIndex === 0 : stepIndex <= currentIndex
                return (
                  <li key={step} className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${reached ? 'bg-primary-600' : 'bg-gray-300'}`} />
                    <span className={`text-sm ${reached ? 'text-gray-800' : 'text-gray-400'}`}>{step}</span>
                  </li>
                )
              })}
            </ol>
            {selected.status === APPLICATION_STATUS.REJECTED && (
              <Badge label="Rejected" />
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
