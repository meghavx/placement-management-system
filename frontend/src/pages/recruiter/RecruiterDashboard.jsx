/*
==========================================
Component: RecruiterDashboard

Purpose:
Provides recruiters with a summary of ongoing recruitment activities:
stats, recent drives, latest applicants, upcoming interviews, and
notifications (spec Part 4).

Current Features:
- Statistic cards (active drives, applications, shortlisted, offers)
- Recent placement drives table
- Latest applicants table
- Upcoming interviews list
- Notifications preview

Future Backend Integration:
Replace mock getRecruiterDashboard() with GET /recruiter/dashboard.
==========================================
*/

import { useEffect, useState } from 'react'
import { Briefcase, ClipboardList, ListChecks, Award } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getRecruiterDashboard } from '../../services/recruiterService'
import { formatDate } from '../../utils/formatDate'

export default function RecruiterDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Backend Integration: replace with the real dashboard API response.
    getRecruiterDashboard().then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Recruiter Dashboard"
        description="A quick summary of your recruitment activities."
        breadcrumb={['Dashboard']}
      />

      {loading || !data ? (
        <SkeletonLoader rows={6} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatisticCard title="Active Drives" value={data.stats.activeDrives} icon={Briefcase} />
            <StatisticCard title="Applications Received" value={data.stats.applicationsReceived} icon={ClipboardList} />
            <StatisticCard title="Candidates Shortlisted" value={data.stats.candidatesShortlisted} icon={ListChecks} />
            <StatisticCard title="Offers Published" value={data.stats.offersPublished} icon={Award} />
          </div>

          <Card title="Recent Placement Drives">
            <Table
              columns={[
                { key: 'company', header: 'Company' },
                { key: 'role', header: 'Role' },
                { key: 'applications', header: 'Applications' },
                { key: 'deadline', header: 'Deadline', render: (r) => formatDate(r.deadline) },
                { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
              ]}
              rows={data.recentDrives}
              emptyMessage="You have not created any placement drives yet."
            />
          </Card>

          <Card title="Latest Applicants">
            <Table
              columns={[
                { key: 'name', header: 'Student Name' },
                { key: 'drive', header: 'Drive' },
                { key: 'department', header: 'Department' },
                { key: 'cgpa', header: 'CGPA' },
                { key: 'appliedDate', header: 'Applied Date', render: (r) => formatDate(r.appliedDate) },
                { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
              ]}
              rows={data.latestApplicants}
              emptyMessage="No applicants yet."
            />
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card title="Upcoming Interviews">
              <ul className="flex flex-col divide-y divide-gray-100">
                {data.upcomingInterviews.map((i) => (
                  <li key={i.id} className="flex items-center justify-between py-3 text-sm">
                    <div>
                      <p className="font-medium text-gray-800">{i.studentName}</p>
                      <p className="text-xs text-gray-500">{i.role} · {formatDate(i.date)} · {i.time}</p>
                    </div>
                    <Badge label={i.mode} color="purple" />
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Notifications">
              <ul className="flex flex-col divide-y divide-gray-100">
                {data.notifications.map((n) => (
                  <li key={n.id} className="flex items-center justify-between py-3 text-sm">
                    <p className="font-medium text-gray-800">{n.title}</p>
                    <span className="text-xs text-gray-400">{n.time}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
