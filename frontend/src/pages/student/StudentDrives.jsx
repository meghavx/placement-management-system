/*
==========================================
Component: StudentDrives

Purpose:
Allows students to browse placement opportunities, check eligibility,
and apply (FR-4.7.1, FR-4.7.2, eligibility verification FR-4.6.x).

Current Features:
- Search by company/role, filters by department/location
- Drive cards with eligibility badge
- Drive details modal
- Apply flow: Apply -> Confirmation Modal -> Application Submitted toast

Future Backend Integration:
GET /student/drives, GET /student/drives/{id}, POST /student/apply.
==========================================
*/

import { useEffect, useState } from 'react'
import { MapPin, CalendarDays, IndianRupee } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import SearchBar from '../../components/SearchBar'
import FilterBar from '../../components/FilterBar'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ConfirmationModal from '../../components/ConfirmationModal'
import EmptyState from '../../components/EmptyState'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getEligibleDrives, applyToDrive } from '../../services/studentService'
import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import { formatSalary } from '../../utils/formatSalary'
import { formatDate } from '../../utils/formatDate'
import { DEPARTMENTS } from '../../constants/departments'

export default function StudentDrives() {
  const { notify } = useNotification()
  const [drives, setDrives] = useState([])
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState('')
  const [selectedDrive, setSelectedDrive] = useState(null)
  const [confirmApply, setConfirmApply] = useState(null)
  const [applying, setApplying] = useState(false)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(drives, ['company', 'role'])

  const departmentFiltered = department
    ? filteredItems.filter((d) => d.departments.includes(department))
    : filteredItems

  useEffect(() => {
    // Backend Integration: replace with real GET /student/drives response.
    getEligibleDrives().then((res) => {
      setDrives(res)
      setLoading(false)
    })
  }, [])

  const handleApply = async () => {
    setApplying(true)
    // Backend Integration: replace with real POST /student/apply call.
    await applyToDrive(confirmApply.id)
    setDrives((prev) => prev.map((d) => (d.id === confirmApply.id ? { ...d, applied: true } : d)))
    setApplying(false)
    setConfirmApply(null)
    notify('Application Submitted')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Placement Drives"
        description="Browse opportunities and apply to eligible drives."
        breadcrumb={['Dashboard', 'Placement Drives']}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by company or role" className="sm:max-w-sm" />
      </div>

      <FilterBar
        filters={[
          { name: 'department', label: 'Department', value: department, onChange: (e) => setDepartment(e.target.value), options: DEPARTMENTS },
        ]}
        onReset={() => setDepartment('')}
      />

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : departmentFiltered.length === 0 ? (
        <EmptyState title="No placement drives found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departmentFiltered.map((drive) => (
            <Card key={drive.id} title={drive.company}>
              <p className="text-sm font-medium text-gray-800">{drive.role}</p>
              <div className="mt-3 flex flex-col gap-1.5 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><IndianRupee size={12} /> {formatSalary(drive.package)}</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} /> {drive.location}</span>
                <span className="flex items-center gap-1.5"><CalendarDays size={12} /> Apply by {formatDate(drive.applicationDeadline)}</span>
              </div>
              <div className="mt-3">
                <Badge label={drive.applied ? 'Applied' : drive.eligibilityStatus} />
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedDrive(drive)}>
                  View Details
                </Button>
                <Button
                  size="sm"
                  disabled={drive.eligibilityStatus !== 'Eligible' || drive.applied}
                  onClick={() => setConfirmApply(drive)}
                >
                  {drive.applied ? 'Applied' : 'Apply'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!selectedDrive}
        onClose={() => setSelectedDrive(null)}
        title={selectedDrive?.company}
        size="lg"
      >
        {selectedDrive && (
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            <p><span className="font-medium">Role:</span> {selectedDrive.role}</p>
            <p><span className="font-medium">Package:</span> {formatSalary(selectedDrive.package)}</p>
            <p><span className="font-medium">Location:</span> {selectedDrive.location}</p>
            <p><span className="font-medium">Employment Type:</span> {selectedDrive.employmentType}</p>
            <p><span className="font-medium">Drive Date:</span> {formatDate(selectedDrive.driveDate)}</p>
            <p><span className="font-medium">Application Deadline:</span> {formatDate(selectedDrive.applicationDeadline)}</p>
            <p><span className="font-medium">Job Description:</span> {selectedDrive.description}</p>
            <p><span className="font-medium">Eligibility:</span> Minimum CGPA {selectedDrive.minCgpa}, Departments: {selectedDrive.departments.join(', ')}</p>
            <p><span className="font-medium">Selection Process:</span> {selectedDrive.selectionProcess.join(' → ')}</p>
          </div>
        )}
      </Modal>

      <ConfirmationModal
        open={!!confirmApply}
        onClose={() => setConfirmApply(null)}
        onConfirm={handleApply}
        title="Apply for this Drive"
        message={confirmApply ? `Are you sure you want to apply to ${confirmApply.company} (${confirmApply.role})?` : ''}
        confirmLabel="Apply"
        loading={applying}
      />
    </div>
  )
}
