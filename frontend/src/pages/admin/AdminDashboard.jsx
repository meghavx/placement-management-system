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

import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import SkeletonLoader from '../../components/SkeletonLoader'
import DashboardBarChart from '../../components/charts/DashboardBarChart'
import DashboardPieChart from '../../components/charts/DashboardPieChart'

import {
  getAdminDashboard,
  getAdminDrives,
  getAllApplications,
} from '../../services/adminService'

import { formatDate } from '../../utils/formatDate'
import { formatSalary } from '../../utils/formatSalary'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)

  const [dashboard, setDashboard] = useState(null)
  const [drives, setDrives] = useState([])

  const [students, setStudents] = useState([])
  const [recruiters, setRecruiters] = useState([])
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          dashboardData,
          driveData,
        ] = await Promise.all([
          getAdminDashboard(),
          getAdminDrives(),
        ])

        setDashboard(dashboardData)
        setDrives(driveData)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getAllApplications()
        setApplications(data)
      } catch (error) {
        console.error(error)
      }
    }

    loadApplications()
  }, [])
  

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Placement Admin Dashboard"
          breadcrumb={['Dashboard']}
        />

        <SkeletonLoader rows={10} />
      </div>
    )
  }

  const stats = dashboard || {
    totalStudents: 0,
    totalRecruiters: 0,
    totalCompanies: 0,
    totalPlacementDrives: 0,
    activePlacementDrives: 0,
    totalApplications: 0,
    selectedStudents: 0,
  }

  const driveStatusCount = {
    OPEN: 0,
    CLOSED: 0,
    COMPLETED: 0,
    CANCELLED: 0,
  }

  drives.forEach((drive) => {
    if (driveStatusCount[drive.status.toUpperCase()] !== undefined) {
      driveStatusCount[drive.status.toUpperCase()]++
    }
  })

  const driveStatusData = [
    {
      name: 'Open',
      value: driveStatusCount.OPEN,
    },
    {
      name: 'Closed',
      value: driveStatusCount.CLOSED,
    },
    {
      name: 'Completed',
      value: driveStatusCount.COMPLETED,
    },
    {
      name: 'Cancelled',
      value: driveStatusCount.CANCELLED,
    },
  ]

  const applicationStatusCount = {
    APPLIED: 0,
    SHORTLISTED: 0,
    INTERVIEW: 0,
    SELECTED: 0,
    REJECTED: 0,
  }

  applications.forEach((application) => {
    if (applicationStatusCount[application.status] !== undefined) {
      applicationStatusCount[application.status]++
    }
  })

  const applicationChartData = [
    {
      status: 'Applied',
      count: applicationStatusCount.APPLIED,
    },
    {
      status: 'Shortlisted',
      count: applicationStatusCount.SHORTLISTED,
    },
    {
      status: 'Interview',
      count: applicationStatusCount.INTERVIEW,
    },
    {
      status: 'Selected',
      count: applicationStatusCount.SELECTED,
    },
    {
      status: 'Rejected',
      count: applicationStatusCount.REJECTED,
    },
  ]
  return (
  <div className="flex flex-col gap-8">
    <PageHeader
      title="Placement Admin Dashboard"
      description="Complete overview of the campus placement ecosystem."
      breadcrumb={['Dashboard']}
    />

    {/* Statistics */}

    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      <StatisticCard
        title="Students"
        value={stats.totalStudents ?? 0}
      />

      <StatisticCard
        title="Recruiters"
        value={stats.totalRecruiters ?? 0}
      />

      <StatisticCard
        title="Companies"
        value={stats.totalCompanies ?? 0}
      />

      <StatisticCard
        title="Placement Drives"
        value={stats.totalPlacementDrives ?? 0}
      />
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatisticCard
        title="Active Drives"
        value={stats.activePlacementDrives ?? 0}
      />

      <StatisticCard
        title="Applications"
        value={stats.totalApplications ?? 0}
      />

      <StatisticCard
        title="Selected Students"
        value={stats.selectedStudents ?? 0}
      />
    </div>

    {/* Charts */}

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

      <DashboardBarChart
        title="Applications by Status"
        data={applicationChartData}
        xKey="status"
        dataKey="count"
      />

      <DashboardPieChart
        title="Placement Drive Status"
        data={driveStatusData}
        centerText={stats.totalPlacementDrives ?? 0}
        colors={[
          '#22c55e',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
        ]}
      />

    </div>
      



  </div>
)
}