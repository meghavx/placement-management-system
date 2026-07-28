/*
==========================================
Component: AdminDashboard

Purpose:
The most information-rich dashboard in the application, giving
Placement Admins a complete overview of the placement ecosystem
(spec Part 5).

Current Features:
- Eight statistic cards
- Reserved chart space (Monthly Trend, Department-wise, Applications by
  Company, Selection Rate) using dummy data
- Recent drives, recruiters, students tables
- Upcoming activities list

Future Backend Integration:
Replace mock getAdminDashboard() with GET /admin/dashboard.
==========================================
*/

import { useEffect, useState } from 'react'
import { Users, UserCheck, Building2, Briefcase, ClipboardList, Award, TrendingUp, IndianRupee } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getAdminDashboard } from '../../services/adminService'
import { formatDate } from '../../utils/formatDate'

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Backend Integration: replace with the real dashboard API response.
    getAdminDashboard().then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [])

  if (loading || !data) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Admin Dashboard" breadcrumb={['Dashboard']} />
        <SkeletonLoader rows={8} />
      </div>
    )
  }

  const maxDeptPlaced = Math.max(...data.charts.departmentWisePlacement.map((d) => d.placed))
  const maxMonthPlaced = Math.max(...data.charts.monthlyPlacementTrend.map((d) => d.placed))

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Placement Admin Dashboard"
        description="Complete visibility into the campus placement ecosystem."
        breadcrumb={['Dashboard']}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatisticCard title="Total Students" value={data.stats.totalStudents} icon={Users} />
        <StatisticCard title="Total Recruiters" value={data.stats.totalRecruiters} icon={UserCheck} />
        <StatisticCard title="Total Companies" value={data.stats.totalCompanies} icon={Building2} />
        <StatisticCard title="Active Drives" value={data.stats.activeDrives} icon={Briefcase} />
        <StatisticCard title="Applications Received" value={data.stats.applicationsReceived} icon={ClipboardList} />
        <StatisticCard title="Students Selected" value={data.stats.studentsSelected} icon={Award} />
        <StatisticCard title="Placement %" value={`${data.stats.placementPercentage}%`} icon={TrendingUp} />
        <StatisticCard title="Average Package" value={`₹${data.stats.averagePackage} LPA`} icon={IndianRupee} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Monthly Placement Trend">
          <div className="flex h-40 items-end gap-3">
            {data.charts.monthlyPlacementTrend.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-primary-500"
                  style={{ height: `${(m.placed / maxMonthPlaced) * 100}%` }}
                  title={`${m.placed} placed`}
                />
                <span className="text-xs text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Department-wise Placement">
          <div className="flex flex-col gap-3">
            {data.charts.departmentWisePlacement.map((d) => (
              <div key={d.department}>
                <div className="mb-1 flex justify-between text-xs text-gray-600">
                  <span>{d.department}</span>
                  <span>{d.placed}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-primary-500" style={{ width: `${(d.placed / maxDeptPlaced) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Recent Placement Drives">
        <Table
          columns={[
            { key: 'company', header: 'Company' },
            { key: 'role', header: 'Role' },
            { key: 'deadline', header: 'Deadline', render: (r) => formatDate(r.deadline) },
            { key: 'applicants', header: 'Applicants' },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
          ]}
          rows={data.recentDrives}
          emptyMessage="No recent drives."
        />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Recent Recruiters">
          <Table
            columns={[
              { key: 'company', header: 'Company' },
              { key: 'recruiter', header: 'Recruiter' },
              { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
              { key: 'createdDate', header: 'Created', render: (r) => formatDate(r.createdDate) },
            ]}
            rows={data.recentRecruiters}
            emptyMessage="No recent recruiters."
          />
        </Card>

        <Card title="Recent Students">
          <Table
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'department', header: 'Department' },
              { key: 'cgpa', header: 'CGPA' },
              { key: 'accountStatus', header: 'Status', render: (r) => <Badge label={r.accountStatus} /> },
            ]}
            rows={data.recentStudents}
            emptyMessage="No recent students."
          />
        </Card>
      </div>

      <Card title="Upcoming Placement Activities">
        <ul className="flex flex-col divide-y divide-gray-100">
          {data.upcomingActivities.map((a) => (
            <li key={a.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium text-gray-800">{a.drive}</p>
                <p className="text-xs text-gray-500">{a.activity}</p>
              </div>
              <span className="text-xs text-gray-400">{formatDate(a.deadline)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
