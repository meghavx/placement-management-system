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
import { Plus } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Dropdown from '../../components/Dropdown'
import Textarea from '../../components/Textarea'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getInterviews, scheduleInterview, updateInterview } from '../../services/recruiterService'
import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'

const EMPTY_FORM = { studentName: '', role: '', date: '', time: '', type: 'Technical Interview', venue: '', meetingLink: '', instructions: '' }

export default function RecruiterInterviews() {
  const { notify } = useNotification()
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Backend Integration: replace with real GET /recruiter/interviews response.
    getInterviews().then((res) => {
      setInterviews(res)
      setLoading(false)
    })
  }, [])

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSchedule = async (e) => {
    e.preventDefault()
    setSaving(true)
    // Backend Integration: replace with real POST /recruiter/interviews call.
    const created = await scheduleInterview({ ...form, status: 'Scheduled' })
    setInterviews((prev) => [...prev, created])
    setSaving(false)
    setModalOpen(false)
    setForm(EMPTY_FORM)
    notify('Interview Scheduled')
  }

  const handleStatusChange = async (interview, status) => {
    // Backend Integration: replace with real PUT /recruiter/interviews/{id} call.
    await updateInterview(interview.id, { status })
    setInterviews((prev) => prev.map((i) => (i.id === interview.id ? { ...i, status } : i)))
    notify(`Interview marked as ${status}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Interview Management"
        description="Schedule interviews and track their status."
        breadcrumb={['Dashboard', 'Interviews']}
        primaryAction={
          <Button icon={Plus} onClick={() => setModalOpen(true)}>
            Schedule Interview
          </Button>
        }
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : (
        <Table
          columns={[
            { key: 'studentName', header: 'Student' },
            { key: 'role', header: 'Role' },
            { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
            { key: 'time', header: 'Time' },
            { key: 'type', header: 'Type' },
            { key: 'venue', header: 'Venue' },
            { key: 'status', header: 'Status', render: (r) => <Badge label={r.status} /> },
          ]}
          rows={interviews}
          emptyMessage="No interviews scheduled yet."
          actions={(row) => (
            <div className="flex flex-wrap gap-1">
              {row.status === 'Scheduled' && (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(row, 'Completed')}>
                    Complete
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleStatusChange(row, 'Cancelled')}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        />
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule Interview"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSchedule} loading={saving}>Schedule</Button>
          </>
        }
      >
        <form onSubmit={handleSchedule} className="flex flex-col gap-4" noValidate>
          <Input label="Student Name" name="studentName" value={form.studentName} onChange={(e) => handleChange('studentName', e.target.value)} required />
          <Input label="Role" name="role" value={form.role} onChange={(e) => handleChange('role', e.target.value)} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" name="date" type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} required />
            <Input label="Time" name="time" type="text" placeholder="10:00 AM" value={form.time} onChange={(e) => handleChange('time', e.target.value)} required />
          </div>
          <Dropdown label="Interview Type" name="type" value={form.type} onChange={(e) => handleChange('type', e.target.value)} options={['Online Test', 'Technical Interview', 'HR Interview', 'Group Discussion']} />
          <Input label="Venue" name="venue" value={form.venue} onChange={(e) => handleChange('venue', e.target.value)} placeholder="Online or Room number" />
          <Input label="Meeting Link" name="meetingLink" value={form.meetingLink} onChange={(e) => handleChange('meetingLink', e.target.value)} />
          <Textarea label="Instructions" name="instructions" value={form.instructions} onChange={(e) => handleChange('instructions', e.target.value)} />
        </form>
      </Modal>
    </div>
  )
}
