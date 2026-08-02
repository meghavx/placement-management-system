/*
==========================================
Component: RecruiterShortlisted

Purpose:
Allows recruiters to manage shortlisted candidates before interviews
(FR-4.8.3, FR-4.8.4).

Current Features:
- Shortlisted candidates table
- Schedule Interview, Update Status, Reject, Select actions

Future Backend Integration:
GET /recruiter/shortlisted, PUT /recruiter/shortlist.
==========================================
*/

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import SearchBar from '../../components/SearchBar'
import Dropdown from '../../components/Dropdown'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'
import Card from '../../components/Card'

import {
  getRecruiterDrives,
  getApplicants,
  getRecruitmentActivities,
  updateApplicationStatus,
} from '../../services/recruiterService'

import { useNotification } from '../../hooks/useNotification'
import { useSearch } from '../../hooks/useSearch'

import { formatDate } from '../../utils/formatDate'

import {
  APPLICATION_STATUS,
} from '../../constants/applicationStatus'

import {
  RECRUITMENT_ACTIVITY_LABELS,
} from '../../constants/recruitmentActivity'

export default function RecruiterShortlisted() {
  const navigate = useNavigate()
  const { notify } = useNotification()

  const [loading, setLoading] = useState(true)

  const [drives, setDrives] = useState([])
  const [selectedDrive, setSelectedDrive] = useState('')

  const [applications, setApplications] = useState([])

  const [currentActivity, setCurrentActivity] = useState(null)

  const {
    searchTerm,
    setSearchTerm,
    filteredItems,
  } = useSearch(applications, [
    'studentName',
    'rollNumber',
    'jobRole',
  ])

  useEffect(() => {
    async function loadDrives() {
      try {
        const driveData = await getRecruiterDrives()

        setDrives(driveData)

        if (driveData.length > 0) {
          setSelectedDrive(String(driveData[0].id))
        }
      } catch (error) {
        console.error(error)
        notify('Failed to load placement drives.')
      }
    }

    loadDrives()
  }, [])

  useEffect(() => {
    if (!selectedDrive) return

    loadData()
  }, [selectedDrive])

  async function loadData() {
    try {
      setLoading(true)

      const [applicationData, activityData] =
        await Promise.all([
          getApplicants(selectedDrive),
          getRecruitmentActivities(selectedDrive),
        ])

      setApplications(
        applicationData.filter(
          (app) =>
            app.status ===
            APPLICATION_STATUS.SHORTLISTED
        )
      )

      if (activityData.length > 0) {
        const latest = [...activityData]
          .sort(
            (a, b) =>
              new Date(a.scheduledAt) -
              new Date(b.scheduledAt)
          )
          .at(-1)

        setCurrentActivity(latest)
      } else {
        setCurrentActivity(null)
      }
    } catch (error) {
      console.error(error)
      notify('Failed to load shortlisted candidates.')
    } finally {
      setLoading(false)
    }
  }

  async function handleReject(applicationId) {
    try {
      await updateApplicationStatus(
        applicationId,
        APPLICATION_STATUS.REJECTED
      )

      setApplications((prev) =>
        prev.filter(
          (application) =>
            application.id !== applicationId
        )
      )

      notify('Candidate rejected successfully.')
    } catch (error) {
      console.error(error)
      notify('Failed to reject candidate.')
    }
  }

    return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Shortlisted Candidates"
        description="Review shortlisted candidates before they enter the interview process."
        breadcrumb={['Dashboard', 'Shortlisted']}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <Dropdown
          label="Placement Drive"
          value={selectedDrive}
          onChange={(e) => setSelectedDrive(e.target.value)}
          options={drives.map((drive) => ({
            label: `${drive.company} - ${drive.role}`,
            value: drive.id,
          }))}
        />

        <SearchBar
          label="Search"
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by student name"
          className="w-full md:max-w-sm"
        />
      </div>

      

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            {
              key: 'studentName',
              header: 'Student',
            },
            {
              key: 'rollNumber',
              header: 'Roll No.',
            },
            {
              key: 'jobRole',
              header: 'Job Role',
            },
            {
              key: 'activity',
              header: 'Recruitment Activity',
              render: () => (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate(`/recruiter/activities/${selectedDrive}`)
                  }
                >
                  View Activity
                </Button>
              ),
            },
            {
              key: 'appliedAt',
              header: 'Applied On',
              render: (row) => formatDate(row.appliedAt),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge label={row.status} />
              ),
            },
          ]}
          rows={filteredItems}
          emptyMessage="No shortlisted candidates found."
          actions={(row) => (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleReject(row.id)}
              >
                Reject
              </Button>
            </div>
          )}
        />
      )}
    </div>
  )
}
