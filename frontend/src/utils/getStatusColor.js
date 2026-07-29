/*
Purpose
Single source of truth mapping any status string (application status,
drive status, account status) to the semantic color token used by the
Badge component. Prevents each page from re-implementing this logic.
*/

import { APPLICATION_STATUS_COLORS } from '../constants/applicationStatus'
import { DRIVE_STATUS_COLORS } from '../constants/driveStatus'

const ACCOUNT_STATUS_COLORS = {
  Active: 'green',
  Inactive: 'gray',
  Eligible: 'green',
  'Not Eligible': 'red',
}

export function getStatusColor(status) {
  return (
    APPLICATION_STATUS_COLORS[status] ||
    DRIVE_STATUS_COLORS[status] ||
    ACCOUNT_STATUS_COLORS[status] ||
    'gray'
  )
}
