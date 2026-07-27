/*
Purpose
Service layer for company directory data used by the Placement Admin
Company Management page.

Future Features
- Backend Integration: replace with GET /admin/companies once a
  dedicated Company endpoint exists in the backend.
*/

import { companyData } from '../data/companyData'

export function getCompanies() {
  return Promise.resolve(companyData)
}
