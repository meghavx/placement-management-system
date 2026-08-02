import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Pencil } from 'lucide-react'

import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Dropdown from '../../components/Dropdown'
import Input from '../../components/Input'
import SkeletonLoader from '../../components/SkeletonLoader'

import {
  getRecruitmentActivities,
  createRecruitmentActivity,
  updateRecruitmentActivity,
  getRecruiterDriveById,
} from '../../services/recruiterService'

import {
  RECRUITMENT_ACTIVITY,
  RECRUITMENT_ACTIVITY_LABELS,
} from '../../constants/recruitmentActivity'

import {
  ACTIVITY_MODE,
  ACTIVITY_MODE_LABELS,
} from '../../constants/activityMode'

import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'

const EMPTY_FORM = {
  activityType: RECRUITMENT_ACTIVITY.APTITUDE_TEST,
  title: 'Aptitude Test',
  scheduledAt: '',
  mode: ACTIVITY_MODE.ONLINE,
  meetingLink: '',
  venue: '',
}

export default function RecruitmentActivities() {
  const { driveId } = useParams()
  const { notify } = useNotification()

  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState([])

  const [drive, setDrive] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState(null)

  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    fetchActivities()
  }, [driveId])

  async function fetchActivities() {
    try {
        setLoading(true)

        const [activityData, driveData] = await Promise.all([
        getRecruitmentActivities(driveId),
        getRecruiterDriveById(driveId),
        ])

        const sorted = [...activityData].sort(
        (a, b) =>
            new Date(a.scheduledAt) -
            new Date(b.scheduledAt)
        )

        setActivities(sorted)
        setDrive(driveData)
    } finally {
        setLoading(false)
    }
    }

  const currentActivity = useMemo(() => {
    if (!activities.length) return null

    return [...activities].sort(
        (a, b) =>
        new Date(a.scheduledAt) -
        new Date(b.scheduledAt)
    ).at(-1)
    }, [activities])

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field === 'activityType') {
      setForm((prev) => ({
        ...prev,
        activityType: value,
        title: RECRUITMENT_ACTIVITY_LABELS[value],
      }))
    }
  }

  const openCreateModal = () => {
    setEditingActivity(null)

    setForm({
      ...EMPTY_FORM,
    })

    setModalOpen(true)
  }

  const openEditModal = (activity) => {
    setEditingActivity(activity)

    setForm({
      activityType: activity.activityType,
      title: activity.title,
      scheduledAt: activity.scheduledAt?.slice(0, 16),
      mode: activity.mode,
      meetingLink: activity.meetingLink ?? '',
      venue: activity.venue ?? '',
    })

    setModalOpen(true)
  }

    const handleSubmit = async () => {
    try {
      setSaving(true)

      const payload = {
        activityType: form.activityType,
        title: form.title,
        scheduledAt: form.scheduledAt,
        mode: form.mode,
        meetingLink:
          form.mode === ACTIVITY_MODE.ONLINE
            ? form.meetingLink
            : null,
        venue:
          form.mode === ACTIVITY_MODE.OFFLINE
            ? form.venue
            : null,
      }

      if (editingActivity) {
        await updateRecruitmentActivity(
          driveId,
          editingActivity.id,
          payload
        )

        notify('Recruitment activity updated.')
      } else {
        await createRecruitmentActivity(driveId, payload)

        notify('Recruitment activity created.')
      }

      setModalOpen(false)
      setEditingActivity(null)
      setForm(EMPTY_FORM)
      await fetchActivities()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Recruitment Activities"
        description={
            drive
            ? `${drive.companyName} • ${drive.jobRole}`
            : 'Manage recruitment stages for this placement drive.'
        }
        breadcrumb={[
          'Dashboard',
          'Placement Drives',
          'Recruitment Activities',
        ]}
        primaryAction={
          <Button
            icon={Plus}
            onClick={openCreateModal}
          >
            Create Activity
          </Button>
        }
      />

      {drive && (
        <Card title="Placement Drive">
            <div className="grid grid-cols-2 gap-5 text-sm">
            <div>
                <p className="text-gray-500">Company</p>
                <p>{drive.companyName}</p>
            </div>

            <div>
                <p className="text-gray-500">Role</p>
                <p>{drive.jobRole}</p>
            </div>

            <div>
                <p className="text-gray-500">Drive Date</p>
                <p>{formatDate(drive.driveDate)}</p>
            </div>

            <div>
                <p className="text-gray-500">Status</p>
                <Badge label={drive.status} />
            </div>
            </div>
        </Card>
        )}

      {loading ? (
        <SkeletonLoader rows={8} />
      ) : (
        <>
          <Card title="Current Recruitment Stage">
            {currentActivity ? (
              <div className="grid grid-cols-2 gap-5 text-sm">
                <div>
                  <p className="text-gray-500">Activity</p>

                  <Badge
                    label={
                      RECRUITMENT_ACTIVITY_LABELS[
                        currentActivity.activityType
                      ]
                    }
                  />
                </div>

                <div>
                  <p className="text-gray-500">
                    Scheduled At
                  </p>

                  <p>
                    {formatDate(
                      currentActivity.scheduledAt
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Mode
                  </p>

                  <p>
                    {
                      ACTIVITY_MODE_LABELS[
                        currentActivity.mode
                      ]
                    }
                  </p>
                </div>

                {currentActivity.mode ===
                ACTIVITY_MODE.ONLINE ? (
                  <div>
                    <p className="text-gray-500">
                      Meeting Link
                    </p>

                    <a
                        href={currentActivity.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-blue-600 hover:underline"
                    >
                    {currentActivity.meetingLink}
                    </a>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500">
                      Venue
                    </p>

                    <p>{currentActivity.venue}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No recruitment activity has been
                created yet.
              </p>
            )}
          </Card>

          <Table
            columns={[
              {
                key: 'activityType',
                header: 'Activity',
                render: (row) =>
                  RECRUITMENT_ACTIVITY_LABELS[
                    row.activityType
                  ],
              },
              {
                key: 'scheduledAt',
                header: 'Scheduled',
                render: (row) =>
                  formatDate(row.scheduledAt),
              },
              {
                key: 'mode',
                header: 'Mode',
                render: (row) =>
                  ACTIVITY_MODE_LABELS[row.mode],
              },
            ]}
            rows={activities}
            emptyMessage="No recruitment activities found."
            actions={(row) => (
              <Button
                variant="ghost"
                size="sm"
                icon={Pencil}
                onClick={() =>
                  openEditModal(row)
                }
              />
            )}
          />
        </>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          editingActivity
            ? 'Update Activity'
            : 'Create Activity'
        }
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              loading={saving}
              onClick={handleSubmit}
            >
              {editingActivity
                ? 'Update'
                : 'Create'}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Dropdown
            label="Activity"
            value={form.activityType}
            onChange={(e) =>
              handleChange(
                'activityType',
                e.target.value
              )
            }
            options={Object.values(
              RECRUITMENT_ACTIVITY
            ).map((value) => ({
              label:
                RECRUITMENT_ACTIVITY_LABELS[
                  value
                ],
              value,
            }))}
          />

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
            type="datetime-local"
            label="Scheduled At"
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
            options={Object.values(
              ACTIVITY_MODE
            ).map((value) => ({
              label:
                ACTIVITY_MODE_LABELS[
                  value
                ],
              value,
            }))}
          />

          {form.mode ===
          ACTIVITY_MODE.ONLINE ? (
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
          ) : (
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
        </div>
      </Modal>
    </div>
  )
}