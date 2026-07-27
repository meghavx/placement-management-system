/*
==========================================
Component: RecruiterApplicants

Purpose:
Allows recruiters to review all student applications for their
placement drives (FR-4.8.1, FR-4.8.2).

Current Features:
- Statistic cards (applications, eligible, shortlisted, rejected)
- Search + department/status filters
- Applicants table with resume preview/download and shortlist/reject actions
- Student profile modal

Future Backend Integration:
GET /recruiter/applicants, GET /recruiter/student/{id}.
==========================================
*/

import { useEffect, useState } from 'react'
import { Eye, Download, CheckCircle2, XCircle, CalendarPlus } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SearchBar from '../../components/SearchBar'
import FilterBar from '../../components/FilterBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getApplicants, updateShortlistStatus } from '../../services/recruiterService'
import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import { downloadFile } from '../../utils/downloadFile'
import { formatDate } from '../../utils/formatDate'
import { DEPARTMENTS } from '../../constants/departments'

export default function RecruiterApplicants() {
  const { notify } = useNotification()
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState('')
  const [selected, setSelected] = useState(null)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(applicants, ['name'])
  const departmentFiltered = department ? filteredItems.filter((a) => a.department === department) : filteredItems

  useEffect(() => {
    // Backend Integration: replace with real GET /recruiter/applicants response.
    getApplicants().then((res) => {
      setApplicants(res)
      setLoading(false)
    })
  }, [])

  const stats = {
    applications: applicants.length,
    eligible: applicants.filter((a) => a.status !== 'Rejected').length,
    shortlisted: applicants.filter((a) => a.status === 'Shortlisted').length,
    rejected: applicants.filter((a) => a.status === 'Rejected').length,
  }

  const handleStatusChange = async (applicant, status) => {
    // Backend Integration: replace with real PUT /recruiter/shortlist call.
    await updateShortlistStatus(applicant.id, status)
    setApplicants((prev) => prev.map((a) => (a.id === applicant.id ? { ...a, status } : a)))
    notify(status === 'Shortlisted' ? 'Candidate Shortlisted' : 'Candidate Rejected')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Applicants"
        description="Review and act on students who applied to your drives."
        breadcrumb={['Dashboard', 'Applicants']}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatisticCard title="Applications" value={stats.applications} />
        <StatisticCard title="Eligible" value={stats.eligible} />
        <StatisticCard title="Shortlisted" value={stats.shortlisted} />
        <StatisticCard title="Rejected" value={stats.rejected} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by student name" className="sm:max-w-sm" />
      </div>

      <FilterBar
        filters={[{ name: 'department', label: 'Department', value: department, onChange: (e) => setDepartment(e.target.value), options: DEPARTMENTS }]}
        onReset={() => setDepartment('')}
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'name', header: 'Student Name' },
            { key: 'department', header: 'Department' },
            { key: 'cgpa', header: 'CGPA' },
            { key: 'skills', header: 'Skills', render: (r) => r.skills.join(', ') },
            { key: 'appliedDate', header: 'Applied Date', render: (r) => formatDate(r.appliedDate) },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
          ]}
          rows={departmentFiltered}
          emptyMessage="No applicants found."
          actions={(row) => (
            <div className="flex flex-wrap gap-1">
              <Button variant="ghost" size="sm" icon={Eye} onClick={() => setSelected(row)} />
              <Button variant="ghost" size="sm" icon={Download} onClick={() => downloadFile(row.resume)} />
              <Button variant="ghost" size="sm" icon={CheckCircle2} onClick={() => handleStatusChange(row, 'Shortlisted')} />
              <Button variant="ghost" size="sm" icon={XCircle} onClick={() => handleStatusChange(row, 'Rejected')} />
            </div>
          )}
        />
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            <p><span className="font-medium">Department:</span> {selected.department}</p>
            <p><span className="font-medium">CGPA:</span> {selected.cgpa}</p>
            <p><span className="font-medium">Skills:</span> {selected.skills.join(', ')}</p>
            <p><span className="font-medium">Resume:</span> {selected.resume}</p>
            <p><span className="font-medium">Applied Date:</span> {formatDate(selected.appliedDate)}</p>
            <p><span className="font-medium">Current Status:</span> <Badge label={selected.status} /></p>
            <div className="flex gap-2 pt-2">
              <Button size="sm" icon={CalendarPlus} onClick={() => notify('Interview flow available on the Interviews page')}>
                Schedule Interview
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
