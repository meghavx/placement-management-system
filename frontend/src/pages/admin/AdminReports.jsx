/*
==========================================
Component: AdminReports

Purpose:
Allows Placement Admins to generate reports and visualize placement
statistics (FR-4.10.1 to FR-4.10.3).

Current Features:
- Statistic cards
- Charts: Placement Trend, Department-wise Placement, Package Distribution
- Filters (academic year, department)
- Export options (PDF, Excel, CSV)

Future Backend Integration:
GET /admin/reports, GET /admin/analytics, POST /admin/export.
==========================================
*/

import { useEffect, useState } from 'react'
import { FileDown } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StatisticCard from '../../components/StatisticCard'
import Card from '../../components/Card'
import FilterBar from '../../components/FilterBar'
import Button from '../../components/Button'
import SkeletonLoader from '../../components/SkeletonLoader'
import { getReports, exportReport } from '../../services/adminService'
import { useNotification } from '../../hooks/useNotification'
import { DEPARTMENTS } from '../../constants/departments'

export default function AdminReports() {
  const { notify } = useNotification()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
    // Backend Integration: replace with real GET /admin/reports and GET /admin/analytics responses.
    getReports().then((res) => {
      setReport(res)
      setLoading(false)
    })
  }, [])

  const handleExport = async (format) => {
    // Backend Integration: replace with real POST /admin/export call.
    await exportReport(format)
    notify(`Report exported as ${format}`)
  }

  if (loading || !report) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Reports & Analytics" breadcrumb={['Dashboard', 'Reports']} />
        <SkeletonLoader rows={8} />
      </div>
    )
  }

  const maxDept = Math.max(...report.departmentWisePlacement.map((d) => d.placed))
  const maxPackage = Math.max(...report.packageDistribution.map((p) => p.count))

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reports & Analytics"
        description="Visualize placement performance and export detailed reports."
        breadcrumb={['Dashboard', 'Reports & Analytics']}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatisticCard title="Placement %" value={`${report.stats.placementPercentage}%`} />
        <StatisticCard title="Highest Package" value={`₹${report.stats.highestPackage} LPA`} />
        <StatisticCard title="Average Package" value={`₹${report.stats.averagePackage} LPA`} />
        <StatisticCard title="Students Placed" value={report.stats.studentsPlaced} />
        <StatisticCard title="Companies Visited" value={report.stats.companiesVisited} />
        <StatisticCard title="Applications" value={report.stats.applications} />
        <StatisticCard title="Selection Ratio" value={report.stats.selectionRatio} />
      </div>

      <FilterBar
        filters={[
          { name: 'department', label: 'Department', value: department, onChange: (e) => setDepartment(e.target.value), options: DEPARTMENTS },
          { name: 'year', label: 'Academic Year', value: year, onChange: (e) => setYear(e.target.value), options: report.placementTrend.map((p) => p.year) },
        ]}
        onReset={() => { setDepartment(''); setYear('') }}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Placement Trend">
          <div className="flex h-40 items-end gap-4">
            {report.placementTrend.map((p) => (
              <div key={p.year} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-primary-500" style={{ height: `${(p.placed / Math.max(...report.placementTrend.map((x) => x.placed))) * 100}%` }} />
                <span className="text-xs text-gray-500">{p.year}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Department-wise Placement">
          <div className="flex flex-col gap-3">
            {report.departmentWisePlacement.map((d) => (
              <div key={d.department}>
                <div className="mb-1 flex justify-between text-xs text-gray-600">
                  <span>{d.department}</span>
                  <span>{d.placed}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-primary-500" style={{ width: `${(d.placed / maxDept) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Package Distribution">
          <div className="flex flex-col gap-3">
            {report.packageDistribution.map((p) => (
              <div key={p.range}>
                <div className="mb-1 flex justify-between text-xs text-gray-600">
                  <span>{p.range}</span>
                  <span>{p.count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-primary-500" style={{ width: `${(p.count / maxPackage) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Applications per Company">
          <div className="flex flex-col gap-3">
            {report.applicationsPerCompany.map((c) => (
              <div key={c.company} className="flex justify-between text-sm text-gray-700">
                <span>{c.company}</span>
                <span className="font-medium">{c.applications}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Export Options">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" icon={FileDown} onClick={() => handleExport('PDF')}>Export PDF</Button>
          <Button variant="outline" icon={FileDown} onClick={() => handleExport('Excel')}>Export Excel</Button>
          <Button variant="outline" icon={FileDown} onClick={() => handleExport('CSV')}>Export CSV</Button>
        </div>
      </Card>
    </div>
  )
}
