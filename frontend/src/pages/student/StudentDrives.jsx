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
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ConfirmationModal from '../../components/ConfirmationModal'
import EmptyState from '../../components/EmptyState'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getEligibleDrives, getDriveById, applyToDrive } from '../../services/studentService'
import { useSearch } from '../../hooks/useSearch'
import { useNotification } from '../../hooks/useNotification'
import { formatSalary } from '../../utils/formatSalary'
import { formatDate } from '../../utils/formatDate'

export default function StudentDrives() {
  const { notify } = useNotification()
  const [drives, setDrives] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDrive, setSelectedDrive] = useState(null)
  const [confirmApply, setConfirmApply] = useState(null)
  const [applying, setApplying] = useState(false)

  const { searchTerm, setSearchTerm, filteredItems } =
    useSearch(drives, ['companyName', 'jobRole'])


  // useEffect(() => {
  //   async function fetchDrives() {
  //     try {
  //       const data = await getEligibleDrives()
  //       setDrives(data)
  //     } catch (error) {
  //       notify('Failed to load placement drives.', 'error')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchDrives()
  // }, [notify])
  useEffect(() => {
    async function fetchDrives() {
      try {
        const data = await getEligibleDrives()

        // console.log(data)

        setDrives(data)
      } catch (error) {
        console.error(error)
        notify('Failed to load drives.', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchDrives()
  }, [])


  const handleViewDetails = async (id) => {
    try {
      const drive = await getDriveById(id)
      setSelectedDrive(drive)
    } catch (error) {
      notify('Failed to load drive details.', 'error')
    }
  }

  const handleApply = async () => {
    setApplying(true)
    try {
      await applyToDrive(confirmApply.id)
      setDrives((prev) =>
        prev.map((d) =>
          d.id === confirmApply.id
            ? { ...d, applied: true }
            : d
        )
      )
      notify('Application submitted successfully.')
      setConfirmApply(null)
    } catch (error) {
      notify(error.message, 'error')
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Placement Drives"
        description="Browse opportunities and apply to eligible drives."
        breadcrumb={['Dashboard', 'Placement Drives']}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by company or role..."
          className="sm:max-w-md"
        />
      </div>

      

      {loading ? (
        <SkeletonLoader rows={6} />
      ) : filteredItems.length === 0 ? (
        <EmptyState title="No placement drives found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((drive) => (
            <Card key={drive.id}>
              <div className="flex h-full flex-col justify-between">

                {/* Company */}

                <div>

                  <div className="flex items-start justify-between">

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {drive.companyName}
                      </h3>

                      <p className="mt-1 text-primary-600 font-medium">
                        {drive.jobRole}
                      </p>
                    </div>

                    <Badge
                      label={drive.eligible ? 'Eligible' : 'Not Eligible'}
                      variant={drive.eligible ? 'success' : 'danger'}
                    />

                  </div>

                  <div className="mt-6 space-y-3 text-sm text-gray-600">

                    <div className="flex items-center gap-2">
                      <IndianRupee size={16} />
                      <span>{formatSalary(drive.packageOffered)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{drive.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      <span>
                        {formatDate(drive.driveDate)}
                      </span>
                    </div>

                  </div>

                </div>

                {/* Buttons */}

                <div className="mt-6 flex gap-2">

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewDetails(drive.id)}
                  >
                    View Details
                  </Button>

                  <Button
                    size="sm"
                    className="flex-1"
                    disabled={!drive.eligible || drive.applied}
                    onClick={() => setConfirmApply(drive)}
                  >
                    {drive.applied ? 'Applied' : 'Apply'}
                  </Button>

                </div>

              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!selectedDrive}
        onClose={() => setSelectedDrive(null)}
        title={selectedDrive?.companyName}
        size="lg"
      >
        {selectedDrive && (
          <div className="space-y-6">

            {/* ================= Basic Information ================= */}

            <div>

              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Drive Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{selectedDrive.companyName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Job Role</p>
                  <p className="font-medium">{selectedDrive.jobRole}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Package Offered</p>
                  <p className="font-medium">
                    {formatSalary(selectedDrive.packageOffered)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">
                    {selectedDrive.location}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Drive Date</p>
                  <p className="font-medium">
                    {formatDate(selectedDrive.driveDate)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Application Deadline</p>
                  <p className="font-medium">
                    {formatDate(selectedDrive.applicationDeadline)}
                  </p>
                </div>

              </div>

            </div>

            {/* ================= Job Description ================= */}

            <div>

              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Job Description
              </h3>

              <p className="rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                {selectedDrive.jobDescription}
              </p>

            </div>

            {/* ================= Eligibility ================= */}

            <div>

              <div className="mb-4 flex items-center justify-between">

                <h3 className="text-lg font-semibold text-gray-900">
                  Eligibility Criteria
                </h3>

                <Badge
                  label={
                    selectedDrive.eligible
                      ? 'Eligible'
                      : 'Not Eligible'
                  }
                  variant={
                    selectedDrive.eligible
                      ? 'success'
                      : 'danger'
                  }
                />

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-lg border p-4">

                  <p className="text-sm text-gray-500">
                    Minimum CGPA
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {selectedDrive.eligibility.minCgpa}
                  </p>

                </div>

                <div className="rounded-lg border p-4">

                  <p className="text-sm text-gray-500">
                    Maximum Backlogs
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {selectedDrive.eligibility.maxBacklogs}
                  </p>

                </div>

                <div className="rounded-lg border p-4">

                  <p className="text-sm text-gray-500">
                    Department
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {selectedDrive.eligibility.department}
                  </p>

                </div>

              </div>

            </div>

            {/* ================= Eligibility Reason ================= */}

            {!selectedDrive.eligible &&
              selectedDrive.ineligibilityReasons?.length > 0 && (

                <div>

                  <h3 className="mb-3 text-lg font-semibold text-red-700">
                    Why you are not eligible
                  </h3>

                  <ul className="list-disc space-y-2 pl-5 text-sm text-red-600">

                    {selectedDrive.ineligibilityReasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}

                  </ul>

                </div>

            )}

          </div>
        )}
      </Modal>

      <ConfirmationModal
        open={!!confirmApply}
        onClose={() => setConfirmApply(null)}
        onConfirm={handleApply}
        title="Apply for this Drive"
        message={
          confirmApply
            ? `Are you sure you want to apply to ${confirmApply.companyName} (${confirmApply.jobRole})?`
            : ''
        }
        confirmLabel="Apply"
        loading={applying}
      />
    </div>
  )
}
