/*
========================================
Component: StatisticCard

Purpose:
Single reusable statistic card used on every dashboard (Student,
Recruiter, Placement Admin, Super Admin). Never create a separate
card component per dashboard.

Current Features:
- title, value, icon, trend, description props

Future:
- Backend Integration: values are populated by each dashboard's
  service call response.
========================================
*/

export default function StatisticCard({ title, value, icon: Icon, trend, description }) {
  const isPositiveTrend = typeof trend === 'string' && trend.trim().startsWith('+')

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {Icon && (
          <span className="rounded-lg bg-primary-50 p-2 text-primary-600">
            <Icon size={18} />
          </span>
        )}
      </div>
      <span className="text-2xl font-semibold text-gray-900">{value}</span>
      {(trend || description) && (
        <span className={`text-xs ${isPositiveTrend ? 'text-green-600' : 'text-gray-500'}`}>
          {trend} {description}
        </span>
      )}
    </div>
  )
}
