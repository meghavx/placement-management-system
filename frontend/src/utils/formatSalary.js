/*
Purpose
Formats package/salary numbers (in LPA - Lakhs Per Annum) consistently
across drive cards, tables, and reports.
*/

export function formatSalary(lpa) {
  if (lpa === undefined || lpa === null) return '-'
  return `₹${lpa} LPA`
}
