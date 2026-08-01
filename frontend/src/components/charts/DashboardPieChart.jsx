/*
========================================
Component: DashboardPieChart

Purpose:
Reusable pie chart used in dashboards.

Examples:
- Placement success
- Hiring ratio
- Student distribution

Props:
- title
- data
- nameKey
- valueKey
- centerText
========================================
*/

import Card from '../Card'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

const DEFAULT_COLORS = [
  '#22c55e',
  '#d1d5db',
]

export default function DashboardPieChart({
  title,
  data,
  nameKey = 'name',
  valueKey = 'value',
  centerText,
  colors = DEFAULT_COLORS,
}) {
  return (
    <Card
      title={title}
      className="h-full"
    >
      <div className="flex flex-col items-center">

        <div className="h-[270px] w-full">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                nameKey={nameKey}
                dataKey={valueKey}
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
              >

                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={colors[index % colors.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="mt-2 text-center">

            <p className="text-5xl font-bold text-primary-700">
                {centerText}
            </p>

          <p className="mt-1 text-sm text-gray-500">
            Placement Success
          </p>

        </div>

      </div>
    </Card>
  )
}