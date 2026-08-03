/*
========================================
Component: Badge

Purpose:
Single reusable status badge (Applied, Eligible, Selected, Rejected,
Draft, Published, Active, Inactive, etc). Every status uses this
component so colors stay consistent everywhere per the Color Palette
section of the spec.

Current Features:
- Resolves color automatically via getStatusColor() unless overridden

Future:
- None; keep this the single Badge implementation.
========================================
*/

import { getStatusColor } from '../utils/getStatusColor'
import { STATUS_COLOR_CLASSES } from '../constants/colors'
import { formatApplicationStatus } from '../utils/formatApplicationStatus'

export default function Badge({ label, color }) {
  const resolvedColor = color || getStatusColor(label)
  const classes = 
    STATUS_COLOR_CLASSES[resolvedColor] || 
    STATUS_COLOR_CLASSES.gray

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${classes}`}>
      {formatApplicationStatus(label)}
    </span>
  )
}
