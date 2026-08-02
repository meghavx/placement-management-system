/*
==========================================
Component: AdminApplications

Purpose:
Provides Placement Admins with visibility into every student
application across all placement drives.

Current Features:
- Status statistic cards
- Search and status filter
- Applications table with View/Export actions

Future Backend Integration:
GET /admin/applications.
==========================================
*/

import { useEffect, useMemo, useState } from 'react'
import { Eye } from 'lucide-react'

import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import SearchBar from '../../components/SearchBar'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Card from '../../components/Card'
import SkeletonLoader from '../../components/SkeletonLoader'
import Avatar from '../../components/Avatar'

import {
  getPlacementDrives,
  getDriveApplications,
  getApplicationById,
} from '../../services/adminService'

import { useNotification } from '../../hooks/useNotification'

import { formatDate } from '../../utils/formatDate'
import { formatSalary } from '../../utils/formatSalary'

export default function AdminApplications() {
  const { notify } = useNotification()

  const [loading, setLoading] = useState(true)

  const [drives, setDrives] = useState([])
  const [selectedDrive, setSelectedDrive] = useState('')

  const [applications, setApplications] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

  const [viewApplication, setViewApplication] = useState(null)

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const data = await getPlacementDrives()
        setDrives(data)
      } catch (error) {
        console.error(error)
        notify('Failed to load placement drives')
      } finally {
        setLoading(false)
      }
    }

    fetchDrives()
  }, [])

  useEffect(() => {
    if (!selectedDrive) {
      setApplications([])
      return
    }

    const fetchApplications = async () => {
      try {
        const data = await getDriveApplications(selectedDrive)
        setApplications(data)
      } catch (error) {
        console.error(error)
        notify('Failed to load applications')
      }
    }

    fetchApplications()
  }, [selectedDrive])

  const filteredApplications = useMemo(() => {
    return applications.filter((app) =>
      `${app.studentName} ${app.rollNumber} ${app.companyName} ${app.jobRole}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  }, [applications, searchTerm])

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === 'APPLIED').length,
    shortlisted: applications.filter((a) => a.status === 'SHORTLISTED').length,
    rejected: applications.filter((a) => a.status === 'REJECTED').length,
  }

  const handleView = async (applicationId) => {
    try {
      const data = await getApplicationById(applicationId)
      setViewApplication(data)
    } catch (error) {
      console.error(error)
      notify('Failed to load application details')
    }
  }

  return (
    <div className="flex flex-col gap-6">
  <PageHeader
    title="Application Management"
    description="View all applications submitted for placement drives."
    breadcrumb={['Dashboard', 'Applications']}
  />

  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <StatisticCard
      title="Total Applications"
      value={stats.total}
    />

    <StatisticCard
      title="Applied"
      value={stats.applied}
    />

    <StatisticCard
      title="Shortlisted"
      value={stats.shortlisted}
    />

    <StatisticCard
      title="Rejected"
      value={stats.rejected}
    />
  </div>

  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

    <div className="w-full md:w-80">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Placement Drive
      </label>

      <select
        value={selectedDrive}
        onChange={(e) => setSelectedDrive(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
      >
        <option value="">
          Select Placement Drive
        </option>

        {drives.map((drive) => (
          <option
            key={drive.id}
            value={drive.id}
          >
            {drive.companyName} — {drive.jobRole}
          </option>
        ))}
      </select>
    </div>

    <SearchBar
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="Search by student, roll number or company"
      className="w-full md:max-w-sm"
    />
  </div>
        {loading ? (
        <SkeletonLoader rows={6} />
      ) : !selectedDrive ? (
        <Card>
          <div className="py-12 text-center text-gray-500">
            Select a placement drive to view applications.
          </div>
        </Card>
      ) : (
        <Card title="Applications">
          <Table
            columns={[
              {
                key: 'rollNumber',
                header: 'Roll Number',
              },
              {
                key: 'studentName',
                header: 'Student Name',
              },
              {
                key: 'companyName',
                header: 'Company',
              },
              {
                key: 'jobRole',
                header: 'Job Role',
              },
              {
                key: 'appliedAt',
                header: 'Applied At',
                render: (row) =>
                  row.appliedAt ? formatDate(row.appliedAt) : '-',
              },
              {
                key: 'status',
                header: 'Status',
                render: (row) => (
                  <Badge label={row.status} />
                ),
              },
            ]}
            rows={filteredApplications}
            emptyMessage="No applications found for this placement drive."
            actions={(row) => (
              <Button
                size="sm"
                variant="outline"
                icon={Eye}
                onClick={() => handleView(row.id)}
              >
                View
              </Button>
            )}
          />
        </Card>
      )}
            {viewApplication && (
        <Modal
          open={!!viewApplication}
          onClose={() => setViewApplication(null)}
          title="Application Details"
          size="lg"
        >
          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <Avatar
                name={viewApplication.studentName}
                size="lg"
              />

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {viewApplication.studentName || '-'}
                </h2>

                <p className="text-sm text-gray-500">
                  {viewApplication.rollNumber || '-'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Company
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {viewApplication.companyName || '-'}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Job Role
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {viewApplication.jobRole || '-'}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Package Offered
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {viewApplication.packageOffered
                    ? formatSalary(viewApplication.packageOffered)
                    : '-'}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Drive Date
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {viewApplication.driveDate
                    ? formatDate(viewApplication.driveDate)
                    : '-'}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Applied At
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {viewApplication.appliedAt
                    ? formatDate(viewApplication.appliedAt)
                    : '-'}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </p>

                <div className="mt-1">
                  <Badge label={viewApplication.status || '-'} />
                </div>
              </div>

            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Resume
              </p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                {viewApplication.resumeUrl
                  ? (
                    <a
                      href={viewApplication.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      View Resume
                    </a>
                  )
                  : 'Resume not available.'}
              </div>
            </div>

          </div>
        </Modal>
      )}

    </div>
  )
}