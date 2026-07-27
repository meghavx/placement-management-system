/*
==========================================
Component: RecruiterResults

Purpose:
Allows recruiters to publish final recruitment outcomes (FR-4.8.5).

Current Features:
- Search
- Results table with Publish/Edit actions
- Confirmation modal ("Are you sure you want to publish this result?")

Future Backend Integration:
GET /recruiter/results, PUT /recruiter/results.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import SearchBar from '../../components/SearchBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import ConfirmationModal from '../../components/ConfirmationModal'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getResults, publishResult } from '../../services/recruiterService'
import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'

export default function RecruiterResults() {
  const { notify } = useNotification()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(null) // { row, result }
  const [publishing, setPublishing] = useState(false)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(results, ['student', 'company'])

  useEffect(() => {
    // Backend Integration: replace with real GET /recruiter/results response.
    getResults().then((res) => {
      setResults(res)
      setLoading(false)
    })
  }, [])

  const handlePublish = async () => {
    setPublishing(true)
    // Backend Integration: replace with real PUT /recruiter/results call.
    await publishResult(pending.row.id, pending.result)
    setResults((prev) =>
      prev.map((r) =>
        r.id === pending.row.id
          ? { ...r, finalResult: pending.result, publishedDate: new Date().toISOString().slice(0, 10) }
          : r,
      ),
    )
    setPublishing(false)
    setPending(null)
    notify('Result Published')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Recruitment Results"
        description="Publish final Selected/Rejected outcomes for interviewed candidates."
        breadcrumb={['Dashboard', 'Results']}
      />

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by student or company" className="sm:max-w-sm" />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'student', header: 'Student' },
            { key: 'company', header: 'Company' },
            { key: 'role', header: 'Role' },
            { key: 'interviewStatus', header: 'Interview Status' },
            { key: 'finalResult', header: 'Final Result', render: (r) => (r.finalResult ? <Badge label={r.finalResult} /> : <span className="text-xs text-gray-400">Not published</span>) },
            { key: 'publishedDate', header: 'Published Date', render: (r) => formatDate(r.publishedDate) },
          ]}
          rows={filteredItems}
          emptyMessage="No results to display."
          actions={(row) =>
            row.finalResult ? (
              <span className="text-xs text-gray-400">Published</span>
            ) : (
              <div className="flex gap-1">
                <Button variant="success" size="sm" onClick={() => setPending({ row, result: 'Selected' })}>
                  Select
                </Button>
                <Button variant="danger" size="sm" onClick={() => setPending({ row, result: 'Rejected' })}>
                  Reject
                </Button>
              </div>
            )
          }
        />
      )}

      <ConfirmationModal
        open={!!pending}
        onClose={() => setPending(null)}
        onConfirm={handlePublish}
        title="Publish Result"
        message={pending ? `Are you sure you want to publish this result as "${pending.result}" for ${pending.row.student}?` : ''}
        confirmLabel="Publish"
        loading={publishing}
      />
    </div>
  )
}
