/*
==========================================
Component: SuperAdminReports

Purpose:
Gives the Super Admin institution-wide reporting, reusing the same
report data as the Placement Admin Reports page since the SRS does not
define a separate Super Admin analytics data source.

Current Features:
- Statistic cards summarizing placement performance institution-wide

Future Backend Integration:
GET /super-admin/reports.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getReports } from '../../services/adminService'

export default function SuperAdminReports() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Backend Integration: replace with real GET /super-admin/reports response.
    getReports().then((res) => {
      setReport(res)
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Institution Reports"
        description="Institution-wide placement performance summary."
        breadcrumb={['Dashboard', 'Reports']}
      />

      {loading || !report ? (
        <SkeletonLoader rows={4} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatisticCard title="Placement %" value={`${report.stats.placementPercentage}%`} />
          <StatisticCard title="Highest Package" value={`₹${report.stats.highestPackage} LPA`} />
          <StatisticCard title="Students Placed" value={report.stats.studentsPlaced} />
          <StatisticCard title="Companies Visited" value={report.stats.companiesVisited} />
        </div>
      )}
    </div>
  )
}
