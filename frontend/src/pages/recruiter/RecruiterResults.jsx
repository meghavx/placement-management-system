/*
==========================================
Component: RecruiterResults

Purpose:
Allows recruiters to publish final recruitment outcomes (FR-4.8.5).

Current Features:
- Search
- Results table with Publish/Edit actions
- Confirmation modal ("Are you sure you want to publish this result?")

Future Backend Integration:
GET /recruiter/results, PUT /recruiter/results.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Dropdown from '../../components/Dropdown'
import SkeletonLoader from '../../components/SkeletonLoader'
import Card from '../../components/Card'

import {
  getRecruiterDrives,
  getApplicants,
  getRecruitmentActivities,
} from '../../services/recruiterService'

import {
  RECRUITMENT_ACTIVITY_LABELS,
} from '../../constants/recruitmentActivity'

import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'

export default function RecruiterResults() {
  const { notify } = useNotification()

  const [loading, setLoading] = useState(true)

  const [drives, setDrives] = useState([])
  const [selectedDrive, setSelectedDrive] = useState('')

  const [applications, setApplications] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => {
    async function fetchDrives() {
      try {
        const data = await getRecruiterDrives()

        setDrives(data)

        if (data.length > 0) {
          setSelectedDrive(data[0].id)
        }
      } catch (error) {
        console.error(error)
        notify('Failed to load drives.')
      } finally {
        setLoading(false)
      }
    }

    fetchDrives()
  }, [])

  useEffect(() => {
    if (!selectedDrive) return

    async function fetchData() {
      try {
        const [apps, acts] = await Promise.all([
          getApplicants(selectedDrive),
          getRecruitmentActivities(selectedDrive),
        ])

        setApplications(
          apps.filter(
            (app) =>
              app.status === 'SELECTED' ||
              app.status === 'REJECTED'
          )
        )

        setActivities(acts)
      } catch (error) {
        console.error(error)
        notify('Failed to load results.')
      }
    }

    fetchData()
  }, [selectedDrive])

  const currentActivity =
    activities.length > 0
      ? activities[activities.length - 1]
      : null

  return (
  <div className="flex flex-col gap-6">
    <PageHeader
      title="Recruitment Results"
      description="Final outcomes of completed recruitment process."
      breadcrumb={['Dashboard', 'Results']}
    />

    {loading ? (
      <SkeletonLoader rows={6} />
    ) : (
      <>
        <Card>
          <Dropdown
            label="Placement Drive"
            value={selectedDrive}
            onChange={(e) => setSelectedDrive(e.target.value)}
            options={drives.map((drive) => ({
              value: drive.id,
              label: `${drive.company} - ${drive.role}`,
            }))}
          />
        </Card>

        <Table
          columns={[
            {
              key: 'studentName',
              header: 'Student',
            },
            {
              key: 'jobRole',
              header: 'Role',
            },
            {
              key: 'status',
              header: 'Result',
              render: (row) => (
                <Badge
                  label={row.status}
                  variant={
                    row.status === 'SELECTED'
                      ? 'success'
                      : 'danger'
                  }
                />
              ),
            },
            {
              key: 'activity',
              header: 'Rejected / Selected At',
              render: () =>
                currentActivity ? (
                  <Badge
                    label={
                      RECRUITMENT_ACTIVITY_LABELS[
                        currentActivity.activityType
                      ]
                    }
                  />
                ) : (
                  '-'
                ),
            },
            {
              key: 'updatedAt',
              header: 'Decision Date',
              render: (row) =>
                row.updatedAt
                  ? formatDate(row.updatedAt)
                  : '-',
            },
          ]}
          rows={applications}
          emptyMessage="No recruitment results available for this drive."
        />
      </>
    )}
  </div>
)
}
