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
      status: company.active ? 'Active' : 'Inactive',
      
      // Backend doesn't provide these yet.
      recruiters: 0,
      activeDrives: 0,

      // Keep original fields too
      description: company.description,
    }))
  } catch (error) {
    console.error('Failed to fetch companies:', error)
    throw error
  }
}

export async function createCompany(company) {
  try {
    const response = await apiClient.post('/companies', {
      companyName: company.companyName,
      industry: company.industry,
      website: company.website,
      location: company.location,
      description: company.description,
    })

    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to create company.'
    )
  }
}

export async function updateCompany(companyId, company) {
  try {
    const response = await apiClient.put(
      `/companies/${companyId}`,
      {
        companyName: company.companyName,
        industry: company.industry,
        website: company.website,
        location: company.location,
        description: company.description,
      }
    )

    return response.data.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to update company.'
    )
  }
}

export async function updateCompanyStatus(companyId, active) {
  try {
    const response = await apiClient.patch(
      `/companies/${companyId}/status`,
      null,
      {
        params: {
          active,
        },
      }
    )

    return response.data.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to update company status.'
    )
  }
}