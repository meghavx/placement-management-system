/*
==========================================
Component: StudentNotifications

Purpose:
Displays all placement-related notifications for the student:
announcements, interview schedules, application updates, and results
(SRS Notification Management module).

Current Features:
- Filter by notification type (Unread, Announcements, Interviews, Results, General)
- Notification cards with read/unread state
- Mark as read, delete actions
- Empty state when no notifications match

Future Backend Integration:
GET /student/notifications, PUT /student/notifications/{id}, DELETE /student/notifications/{id}.
==========================================
*/

import { useEffect, useState } from 'react'
import { Bell, CalendarClock, Megaphone, Award, AlertCircle, Info } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import FilterBar from '../../components/FilterBar'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getStudentNotifications } from '../../services/studentService'
import { markNotificationRead, deleteNotification } from '../../services/notificationService'
import { useNotification } from '../../hooks/useNotification'

const TYPE_ICONS = {
  'Interview Schedule': CalendarClock,
  'Placement Announcement': Megaphone,
  'Application Update': Info,
  'Selection Result': Award,
  'Deadline Reminder': AlertCircle,
  'General Notice': Bell,
}

const FILTER_OPTIONS = ['Unread', 'Placement Announcement', 'Interview Schedule', 'Selection Result', 'General Notice']

export default function StudentNotifications() {
  const { notify } = useNotification()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    // Backend Integration: replace with real GET /student/notifications response.
    getStudentNotifications().then((res) => {
      setNotifications(res)
      setLoading(false)
    })
  }, [])

  const filtered = notifications.filter((n) => {
    if (!filter) return true
    if (filter === 'Unread') return !n.read
    return n.type === filter
  })

  const handleMarkRead = async (id) => {
    // Backend Integration: replace with real PUT /student/notifications/{id} call.
    await markNotificationRead(id)
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleDelete = async (id) => {
    // Backend Integration: replace with real DELETE /student/notifications/{id} call.
    await deleteNotification(id)
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    notify('Notification Deleted')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Notifications"
        description="Announcements, interview schedules, and results relevant to you."
        breadcrumb={['Dashboard', 'Notifications']}
      />

      <FilterBar
        filters={[{ name: 'filter', label: 'Type', value: filter, onChange: (e) => setFilter(e.target.value), options: FILTER_OPTIONS }]}
        onReset={() => setFilter('')}
      />

      {loading ? (
        <SkeletonLoader rows={5} />
      ) : filtered.length === 0 ? (
        <EmptyState title="No notifications available." description="You're all caught up for now." icon={Bell} />
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((n) => {
            const Icon = TYPE_ICONS[n.type] || Bell
            return (
              <li
                key={n.id}
                className={`flex items-start gap-4 rounded-xl border p-4 ${n.read ? 'border-gray-200 bg-white' : 'border-primary-200 bg-primary-50/40'}`}
              >
                <span className="rounded-lg bg-white p-2 text-primary-600 shadow-sm">
                  <Icon size={18} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-primary-600" />}
                  </div>
                  <p className="text-sm text-gray-600">{n.description}</p>
                  <p className="mt-1 text-xs text-gray-400">{n.time}</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {!n.read && (
                    <Button variant="ghost" size="sm" onClick={() => handleMarkRead(n.id)}>
                      Mark Read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(n.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
