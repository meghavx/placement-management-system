/*
==========================================
Component: AdminCompanies

Purpose:
Provides Placement Admins with a centralized company directory, built
from recruiter/company associations per the spec's fallback guidance
(the SRS does not define a standalone Company CRUD module).

Current Features:
- Company cards (logo initial, industry, website, recruiters, open drives)
- Company table with the same information

Future Backend Integration:
GET /admin/companies.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Avatar from '../../components/Avatar'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getCompanies } from '../../services/companyService'

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Backend Integration: replace with real GET /admin/companies response.
    getCompanies().then((res) => {
      setCompanies(res)
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Company Management"
        description="Directory of all companies participating in campus placements."
        breadcrumb={['Dashboard', 'Companies']}
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c) => (
              <Card key={c.id}>
                <div className="flex items-center gap-3">
                  <Avatar name={c.company} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{c.company}</p>
                    <p className="text-xs text-gray-500">{c.industry}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-1 text-xs text-gray-500">
                  <span>Website: {c.website}</span>
                  <span>Recruiters: {c.recruiters}</span>
                  <span>Open Drives: {c.activeDrives}</span>
                </div>
                <div className="mt-3">
                  <Badge label={c.status} />
                </div>
              </Card>
            ))}
          </div>

          <Card title="All Companies">
            <Table
              columns={[
                { key: 'company', header: 'Company' },
                { key: 'industry', header: 'Industry' },
                { key: 'location', header: 'Location' },
                { key: 'recruiters', header: 'Recruiters' },
                { key: 'activeDrives', header: 'Active Drives' },
                { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
              ]}
              rows={companies}
              emptyMessage="No companies found."
            />
          </Card>
        </>
      )}
    </div>
  )
}
