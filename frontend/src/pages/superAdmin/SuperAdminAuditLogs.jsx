/*
==========================================
Component: SuperAdminAuditLogs

Purpose:
Allows the Super Admin to monitor system activities via audit logs
(SRS 2.3 "Monitor system activities", NFR-5.5.3 Administrative Audit Logs).

Current Features:
- Search
- Audit log table (user, action, entity type, timestamp)

Future Backend Integration:
GET /super-admin/audit-logs.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import SearchBar from '../../components/SearchBar'
import Table from '../../components/Table'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getAuditLogs } from '../../services/superAdminService'
import { useSearch } from '../../hooks/useSearch'

export default function SuperAdminAuditLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(logs, ['user', 'action', 'entityType'])

  useEffect(() => {
    // Backend Integration: replace with real GET /super-admin/audit-logs response.
    getAuditLogs().then((res) => {
      setLogs(res)
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Audit Logs"
        description="Track critical administrative activity across the system."
        breadcrumb={['Dashboard', 'Audit Logs']}
      />

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by user, action, or entity" className="sm:max-w-sm" />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'user', header: 'User' },
            { key: 'action', header: 'Action' },
            { key: 'entityType', header: 'Entity Type' },
            { key: 'timestamp', header: 'Timestamp' },
          ]}
          rows={filteredItems}
          emptyMessage="No audit log entries found."
        />
      )}
    </div>
  )
}
