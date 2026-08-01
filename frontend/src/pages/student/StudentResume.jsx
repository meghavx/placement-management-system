/*
==========================================
Component: StudentResume

Purpose:
Allows students to upload and manage their resume (FR-4.3.3).

Current Features:
- Current resume card (preview, download, replace, delete)
- Drag-and-drop / browse upload with file-type and size validation
- Resume guidelines accordion

Future Backend Integration:
GET /student/resume, POST /student/resume (multipart), DELETE /student/resume.
==========================================
*/

import { useEffect, useRef, useState } from 'react'
import { FileText, UploadCloud, Download, RefreshCw, Trash2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Accordion from '../../components/Accordion'
import SkeletonLoader from '../../components/SkeletonLoader'
import Alert from '../../components/Alert'
import { getStudentResume, uploadStudentResume, downloadStudentResume } from '../../services/studentService'
import { useNotification } from '../../hooks/useNotification'
import { formatDate } from '../../utils/formatDate'

const ACCEPTED_TYPES = ['application/pdf']
const MAX_SIZE_KB = 5120

export default function StudentResume() {
  const { notify } = useNotification()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    async function fetchResume() {
      try {
        const data = await getStudentResume()
        setResume(data)
      } catch (error) {
        notify('Failed to load resume.', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchResume()
    }, [notify])

  const handleFileSelect = async (file) => {
    setUploadError('')
    if (!file) return
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadError('Only PDF files are supported.')
      return
    }
    if (file.size / 1024 > MAX_SIZE_KB) {
      setUploadError('File size must not exceed 5 MB.')
      return
    }
    try {
      const updated = await uploadStudentResume(file)
      setResume(updated)
      notify('Resume uploaded successfully.')
    } catch (error) {
      notify(
        error.response?.data?.message || 'Failed to upload resume.',
        'error'
      )
    }
  }

  const handleDownload = async () => {
    try {
      const response = await downloadStudentResume()

      const url = window.URL.createObjectURL(response.data)

      const link = document.createElement('a')
      link.href = url
      link.download = resume?.fileName || 'resume.pdf'

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      notify('Failed to download resume.', 'error')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Resume" breadcrumb={['Dashboard', 'Resume']} />
        <SkeletonLoader rows={5} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Resume"
        description="Upload and manage the resume recruiters will see."
        breadcrumb={['Dashboard', 'Resume']}
      />

      <Card title="Current Resume">
        {resume ? (
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-primary-50 p-3 text-primary-600">
                <FileText size={20} />
              </span>
              <div>
                <p className="text-sm font-medium text-gray-800">{resume.fileName}</p>
                <p className="text-xs text-gray-500">
                  Uploaded {formatDate(resume.uploadedAt)}
                  · Updated {formatDate(resume.updatedAt)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={handleDownload}
              >
                Download
              </Button>
              <Button variant="outline" size="sm" icon={RefreshCw} onClick={() => fileInputRef.current?.click()}>
                Replace
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No resume uploaded yet.</p>
        )}
      </Card>

      <Card title="Upload New Resume">
        {uploadError && <div className="mb-3"><Alert type="error" message={uploadError} /></div>}
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 text-center hover:border-primary-400"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            handleFileSelect(e.dataTransfer.files?.[0])
          }}
        >
          <UploadCloud className="text-gray-400" size={32} />
          <p className="text-sm text-gray-600">Drag and drop your resume here, or</p>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Browse Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />
          <p className="text-xs text-gray-400">
            Accepted format: PDF (maximum 5 MB)
          </p>
        </div>
      </Card>

      <Accordion
        items={[
          {
            title: 'Resume Guidelines',
            content: (
              <ul className="list-inside list-disc space-y-1">
                <li>Keep your resume to a maximum of 2 pages.</li>
                <li>Use a clear, professional format with consistent fonts.</li>
                <li>Highlight relevant skills, projects, and certifications.</li>
                <li>Update your resume before applying to new placement drives.</li>
              </ul>
            ),
          },
        ]}
      />

    </div>
  )
}
