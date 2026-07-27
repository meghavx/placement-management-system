/*
==========================================
Component: RecruiterShortlisted

Purpose:
Allows recruiters to manage shortlisted candidates before interviews
(FR-4.8.3, FR-4.8.4).

Current Features:
- Shortlisted candidates table
- Schedule Interview, Update Status, Reject, Select actions

Future Backend Integration:
GET /recruiter/shortlisted, PUT /recruiter/shortlist.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getShortlistedCandidates, updateShortlistStatus } from '../../services/recruiterService'
import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'

export default function RecruiterShortlisted() {
  const { notify } = useNotification()
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Backend Integration: replace with real GET /recruiter/shortlisted response.
    getShortlistedCandidates().then((res) => {
      setCandidates(res)
      setLoading(false)
    })
  }, [])

  const handleAction = async (candidate, status) => {
    // Backend Integration: replace with real PUT /recruiter/shortlist call.
    await updateShortlistStatus(candidate.id, status)
    setCandidates((prev) => prev.map((c) => (c.id === candidate.id ? { ...c, status } : c)))
    notify(`Candidate marked as ${status}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Shortlisted Candidates"
        description="Manage candidates who have progressed past the applicant stage."
        breadcrumb={['Dashboard', 'Shortlisted']}
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'student', header: 'Student' },
            { key: 'company', header: 'Company' },
            { key: 'role', header: 'Role' },
            { key: 'interviewRound', header: 'Interview Round' },
            { key: 'interviewDate', header: 'Interview Date', render: (r) => formatDate(r.interviewDate) },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
          ]}
          rows={candidates}
          emptyMessage="No candidates have been shortlisted yet."
          actions={(row) => (
            <div className="flex flex-wrap gap-1">
              <Button variant="outline" size="sm" onClick={() => notify('Redirect to Interview scheduling')}>
                Schedule
              </Button>
              <Button variant="success" size="sm" onClick={() => handleAction(row, 'Selected')}>
                Select
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleAction(row, 'Rejected')}>
                Reject
              </Button>
            </div>
          )}
        />
      )}
    </div>
  )
}
