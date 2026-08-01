/*
========================================
Component: DashboardBarChart

Purpose:
Reusable vertical bar chart for dashboard analytics.

Examples:
- Student placement progress
- Recruiter hiring statistics
- Admin company statistics

Props:
- title
- data
- xKey
- dataKey
========================================
*/

import Card from '../Card'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

import { LabelList } from 'recharts'

export default function DashboardBarChart({
  title,
  data,
  xKey,
  dataKey,
  color = '#22c55e',
  height = 360,
  maxBarSize = 55,
}) {
  return (
    <Card
      title={title}
      className="h-full"
    >
      <div style={{ height }}>

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
                dataKey={dataKey}
                radius={[8, 8, 0, 0]}
                fill={color}
                maxBarSize={maxBarSize}
            >

            <LabelList
                dataKey={dataKey}
                position="top"
            />

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>
    </Card>
  )
}