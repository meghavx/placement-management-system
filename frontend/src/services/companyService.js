// /*
// Purpose
// Service layer for company directory data used by the Placement Admin
// Company Management page.

// Future Features
// - Backend Integration: replace with GET /admin/companies once a
//   dedicated Company endpoint exists in the backend.
// */

// import { companyData } from '../data/companyData'

// export function getCompanies() {
//   return Promise.resolve(companyData)
// }


import apiClient from './apiClient'

export async function getCompanies() {
  try {
    const response = await apiClient.get('/companies')

    return response.data.data.map((company) => ({
      id: company.id,
      company: company.companyName,
      industry: company.industry,
      website: company.website,
      location: company.location,

      // Backend doesn't provide these yet.
      recruiters: 0,
      activeDrives: 0,
      status: 'Active',

      // Keep original fields too
      description: company.description,
    }))
  } catch (error) {
    console.error('Failed to fetch companies:', error)
    throw error
  }
}