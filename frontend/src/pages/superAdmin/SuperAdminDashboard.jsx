/*
==========================================
Component: SuperAdminDashboard

Purpose:
Gives the Super Admin a high-level summary of the whole system —
Placement Admin accounts, institution users, uptime, and active
sessions (SRS 2.3 Super Admin responsibilities: manage Placement Admin
accounts, configure system settings, monitor system activities).

Current Features:
- Statistic cards for system-wide metrics

Future Backend Integration:
GET /super-admin/dashboard.
==========================================
*/

import { useEffect, useState } from 'react'
import { ShieldCheck, Users, Activity, Server } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getSuperAdminDashboard } from '../../services/superAdminService'

export default function SuperAdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Backend Integration: replace with real GET /super-admin/dashboard response.
    getSuperAdminDashboard().then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Super Admin Dashboard"
        description="System-wide overview and administrative controls."
        breadcrumb={['Dashboard']}
      />

      {loading || !data ? (
        <SkeletonLoader rows={4} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatisticCard title="Placement Admins" value={data.stats.totalPlacementAdmins} icon={ShieldCheck} />
          <StatisticCard title="Institution Users" value={data.stats.totalInstitutionUsers} icon={Users} />
          <StatisticCard title="System Uptime" value={data.stats.systemUptime} icon={Server} />
          <StatisticCard title="Active Sessions" value={data.stats.activeSessions} icon={Activity} />
        </div>
      )}
    </div>
  )
}
