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
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import EmptyState from '../../components/EmptyState'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getStudentDashboard } from '../../services/studentService'
import { formatSalary } from '../../utils/formatSalary'
import { formatDate } from '../../utils/formatDate'

export default function StudentDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Backend Integration: replace with the real dashboard API response.
    getStudentDashboard().then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [])

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatisticCard title="Eligible Drives" value={data.stats.eligibleDrives} icon={Briefcase} />
            <StatisticCard title="Applications Submitted" value={data.stats.applicationsSubmitted} icon={ClipboardList} />
            <StatisticCard title="Interviews Scheduled" value={data.stats.interviewsScheduled} icon={CalendarCheck} />
            <StatisticCard title="Offers Received" value={data.stats.offersReceived} icon={Award} />
          </div>

          <Card title="Upcoming Placement Drives">
            {data.upcomingDrives.length === 0 ? (
              <EmptyState title="No upcoming drives" description="Check back later for new opportunities." />
            ) : (
              <Table
                columns={[
                  { key: 'company', header: 'Company' },
                  { key: 'role', header: 'Role' },
                  { key: 'package', header: 'Package', render: (r) => formatSalary(r.package) },
                  { key: 'deadline', header: 'Deadline', render: (r) => formatDate(r.deadline) },
                  { key: 'eligibilityStatus', header: 'Eligibility', render: (r) => <Badge label={r.eligibilityStatus} /> },
                ]}
                rows={data.upcomingDrives}
                emptyMessage="No upcoming drives found."
              />
            )}
          </Card>

          <Card title="Recent Applications">
            <Table
              columns={[
                { key: 'company', header: 'Company' },
                { key: 'role', header: 'Role' },
                { key: 'appliedDate', header: 'Applied Date', render: (r) => formatDate(r.appliedDate) },
                { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
                { key: 'updatedOn', header: 'Updated On', render: (r) => formatDate(r.updatedOn) },
              ]}
              rows={data.recentApplications}
              emptyMessage="You have not applied to any drives yet."
            />
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card title="Notifications">
              {data.notifications.length === 0 ? (
                <EmptyState title="No notifications" description="You're all caught up." />
              ) : (
                <ul className="flex flex-col divide-y divide-gray-100">
                  {data.notifications.slice(0, 5).map((n) => (
                    <li key={n.id} className="flex items-start justify-between gap-3 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{n.title}</p>
                        <p className="text-xs text-gray-500">{n.description}</p>
                      </div>
                      <span className="whitespace-nowrap text-xs text-gray-400">{n.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card title="Upcoming Interviews">
              {data.upcomingInterviews.length === 0 ? (
                <EmptyState title="No interviews scheduled" description="Interview details will appear here." />
              ) : (
                <ul className="flex flex-col divide-y divide-gray-100">
                  {data.upcomingInterviews.map((i) => (
                    <li key={i.id} className="flex items-center justify-between py-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-800">{i.company}</p>
                        <p className="text-xs text-gray-500">{formatDate(i.date)} · {i.time} · {i.mode}</p>
                      </div>
                      <Badge label={i.status} color="purple" />
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
