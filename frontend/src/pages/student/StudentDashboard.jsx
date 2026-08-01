/*
==========================================
Component: StudentDashboard

Purpose:
Displays the student's placement overview: stats, upcoming drives,
recent applications, notifications, and upcoming interviews.

Current Features:
- Statistic cards (eligible drives, applications, interviews, offers)
- Upcoming drives table
- Recent applications table
- Notifications preview (latest 5)
- Upcoming interviews list
- Loading and empty states

Future Backend Integration:
Replace mock getStudentDashboard() with GET /student/dashboard.
==========================================
*/

import { useEffect, useState } from 'react'
import { Briefcase, ClipboardList, CalendarCheck, Award } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import Card from '../../components/Card'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getStudentDashboard } from '../../services/studentService'
import DashboardBarChart from '../../components/charts/DashboardBarChart'
import DashboardPieChart from '../../components/charts/DashboardPieChart'

export default function StudentDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const dashboard = await getStudentDashboard()
        setData(dashboard)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const chartData = data
    ? [
        {
          name: 'Drives',
          value: data.availableDrives,
        },
        {
          name: 'Applied',
          value: data.appliedCount,
        },
        {
          name: 'Shortlisted',
          value: data.shortlistedCount,
        },
        {
          name: 'Interview',
          value: data.interviewScheduledCount,
        },
        {
          name: 'Selected',
          value: data.selectedCount,
        },
        {
          name: 'Rejected',
          value: data.rejectedCount,
        },
      ]
    : []

  const pieData = data
    ? [
        {
          name: 'Selected',
          value: data.selectedCount,
        },
        {
          name: 'Remaining',
          value: Math.max(
            data.appliedCount - data.selectedCount,
            0
          ),
        },
      ]
    : []

  const successRate = data
    ? data.appliedCount === 0
      ? 0
      : (
          (data.selectedCount / data.appliedCount) *
          100
        ).toFixed(1)
    : 0

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Student Dashboard"
        description="Your placement activity at a glance."
        breadcrumb={['Dashboard']}
      />

      {loading || !data ? (
        <SkeletonLoader rows={6} />
      ) : (
        <>

          {/* Statistics */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatisticCard
              title="Available Drives"
              value={data.availableDrives}
              icon={Briefcase}
            />

            <StatisticCard
              title="Applications"
              value={data.totalApplications}
              icon={ClipboardList}
            />

            <StatisticCard
              title="Interviews"
              value={data.interviewScheduledCount}
              icon={CalendarCheck}
            />

            <StatisticCard
              title="Selected"
              value={data.selectedCount}
              icon={Award}
            />

          </div>

          {/* Charts */}

          <div className="mt-2 grid grid-cols-1 gap-6 xl:grid-cols-3">

            <div className="xl:col-span-2">

              <DashboardBarChart
                title="Placement Progress"
                data={chartData}
                xKey="name"
                dataKey="value"
                color="#22c55e"
              />

            </div>

            <DashboardPieChart
              title="Placement Success"
              data={pieData}
              centerText={`${successRate}%`}
              colors={[
                '#22c55e',
                '#d1d5db',
              ]}
            />

          </div>

        </>
      )}
    </div>
  )
}
