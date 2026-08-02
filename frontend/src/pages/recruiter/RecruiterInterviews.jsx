/*
==========================================
Component: RecruiterInterviews

Purpose:
Allows recruiters to schedule interviews and manage interview progress
(FR-4.8.4, interview scheduling requirements).

Current Features:
- Upcoming interviews table
- Schedule Interview modal (date, time, type, venue, meeting link, panel, instructions)
- Edit / Cancel / Complete / Reschedule actions

Future Backend Integration:
GET /recruiter/interviews, POST /recruiter/interviews, PUT /recruiter/interviews/{id}.
==========================================
*/

import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import SkeletonLoader from '../../components/SkeletonLoader'
import Card from '../../components/Card'
import {
  RECRUITMENT_ACTIVITY_LABELS,
} from '../../constants/recruitmentActivity'

import {
  getRecruiterDrives,
  getApplicants,
  getRecruitmentActivities,
  updateRecruitmentActivity,
  updateApplicationStatus,
} from '../../services/recruiterService'

import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'

export default function RecruiterInterviews() {
  const { notify } = useNotification()

  const [loading, setLoading] = useState(true)

  const [drives, setDrives] = useState([])
  const [selectedDrive, setSelectedDrive] = useState('')

  const [applications, setApplications] = useState([])
  const [activities, setActivities] = useState([])

  const [selectedActivity, setSelectedActivity] = useState(null)

  const [form, setForm] = useState({
    title: '',
    scheduledAt: '',
    mode: '',
    venue: '',
    meetingLink: '',
  })

  // -----------------------------
  // Load Drives
  // -----------------------------
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

  // -----------------------------
  // Load Interview Applications
  // -----------------------------
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
            (app) => app.status === 'INTERVIEW_SCHEDULED'
          )
        )

        setActivities(acts)
      } catch (error) {
        console.error(error)
        notify('Failed to load interview data.')
      }
    }

    fetchData()
  }, [selectedDrive])

  const interviewActivities = activities.filter((activity) =>
    [
      'TECHNICAL_INTERVIEW',
      'HR_INTERVIEW',
      'MANAGERIAL_INTERVIEW',
    ].includes(activity.activityType)
  )

  const getActivity = () => {
    return interviewActivities[0] ?? null
  }

  const openEditModal = () => {
    const activity = getActivity()

    if (!activity) {
      notify('No interview activity found.')
      return
    }

    setSelectedActivity(activity)

    setForm({
      title: activity.title,
      scheduledAt: activity.scheduledAt?.slice(0, 16),
      mode: activity.mode,
      venue: activity.venue ?? '',
      meetingLink: activity.meetingLink ?? '',
    })
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleUpdateActivity = async (e) => {
    e.preventDefault()

    if (!selectedActivity) return

    try {
      await updateRecruitmentActivity(
        selectedDrive,
        selectedActivity.id,
        {
          activityType: selectedActivity.activityType,
          title: form.title,
          scheduledAt: form.scheduledAt,
          mode: form.mode,
          venue:
            form.mode === 'OFFLINE'
              ? form.venue
              : null,
          meetingLink:
            form.mode === 'ONLINE'
              ? form.meetingLink
              : null,
        }
      )

      notify('Interview updated.')

      setSelectedActivity(null)

      const activities = await getRecruitmentActivities(
        selectedDrive
      )

      setActivities(activities)
    } catch (error) {
      console.error(error)
      notify('Failed to update interview.')
    }
  }

  const handleStatusChange = async (
    application,
    status
  ) => {
    try {
      await updateApplicationStatus(
        application.id,
        status
      )

      setApplications((prev) =>
        prev.filter((a) => a.id !== application.id)
      )

      notify(`Application marked as ${status}.`)
    } catch (error) {
      console.error(error)
      notify('Failed to update application.')
    }
  }

  const currentActivity = getActivity()


  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Interview Management"
        description="Manage interview-stage candidates and publish final decisions."
        breadcrumb={['Dashboard', 'Interviews']}
      />

      <div className="max-w-md">
        <Dropdown
          label="Placement Drive"
          value={selectedDrive}
          onChange={(e) => setSelectedDrive(e.target.value)}
          options={drives.map((drive) => ({
            label: `${drive.company} - ${drive.role}`,
            value: drive.id,
          }))}
        />
      </div>

      {getActivity() && (
        <Card
          title="Current Interview Activity"
          action={
            <Button
              size="sm"
              variant="outline"
              onClick={openEditModal}
            >
              Edit
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">
                Interview Type
              </p>

              <Badge
                label={currentActivity().activityType}
              />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Scheduled At
              </p>

              <p>
                {formatDate(
                  currentActivity().scheduledAt
                )}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Mode
              </p>

              <p>{currentActivity().mode}</p>
            </div>

            {getActivity().mode ===
              'ONLINE' && (
              <div>
                <p className="text-xs text-gray-500">
                  Meeting Link
                </p>

                <p>{currentActivity().meetingLink}</p>
              </div>
            )}

            {getActivity().mode ===
              'OFFLINE' && (
              <div>
                <p className="text-xs text-gray-500">
                  Venue
                </p>

                <p>{currentActivity().venue}</p>
              </div>
            )}
          </div>
        </Card>
      )}

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
              key: 'jobRole',
              header: 'Role',
            },
            {
              key: 'activity',
              header: 'Current Round',
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
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge label={row.status} />
              ),
            },
          ]}
          rows={applications}
          emptyMessage="No interview-stage candidates found."
          actions={(row) => (
            <div className="flex flex-wrap gap-2">
              <Button
                variant="success"
                size="sm"
                onClick={() =>
                  handleStatusChange(
                    row,
                    'SELECTED'
                  )
                }
              >
                Select
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  handleStatusChange(
                    row,
                    'REJECTED'
                  )
                }
              >
                Reject
              </Button>
            </div>
          )}
        />
      )}

      <Modal
        open={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        title="Edit Interview Activity"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setSelectedActivity(null)}
            >
              Cancel
            </Button>

            <Button onClick={handleUpdateActivity}>
              Save Changes
            </Button>
          </>
        }
      >
        <form
          onSubmit={handleUpdateActivity}
          className="flex flex-col gap-4"
        >
          <Input
            label="Title"
            value={form.title}
            onChange={(e) =>
              handleChange(
                'title',
                e.target.value
              )
            }
          />

          <Input
            label="Scheduled At"
            type="datetime-local"
            value={form.scheduledAt}
            onChange={(e) =>
              handleChange(
                'scheduledAt',
                e.target.value
              )
            }
          />

          <Dropdown
            label="Mode"
            value={form.mode}
            onChange={(e) =>
              handleChange(
                'mode',
                e.target.value
              )
            }
            options={[
              {
                label: 'Online',
                value: 'ONLINE',
              },
              {
                label: 'Offline',
                value: 'OFFLINE',
              },
            ]}
          />

          {form.mode === 'ONLINE' && (
            <Input
              label="Meeting Link"
              value={form.meetingLink}
              onChange={(e) =>
                handleChange(
                  'meetingLink',
                  e.target.value
                )
              }
            />
          )}

          {form.mode === 'OFFLINE' && (
            <Input
              label="Venue"
              value={form.venue}
              onChange={(e) =>
                handleChange(
                  'venue',
                  e.target.value
                )
              }
            />
          )}
        </form>
      </Modal>
    </div>
  )
}
