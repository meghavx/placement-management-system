/*
Purpose
Dummy report/analytics data for the Placement Admin Reports &
Analytics page.
*/

export const reportData = {
  stats: {
    placementPercentage: 78,
    highestPackage: 24,
    averagePackage: 7.6,
    studentsPlaced: 410,
    companiesVisited: 54,
    applications: 3860,
    selectionRatio: '1:9',
  },
  placementTrend: [
    { year: '2023', placed: 320 },
    { year: '2024', placed: 365 },
    { year: '2025', placed: 388 },
    { year: '2026', placed: 410 },
  ],
  departmentWisePlacement: [
    { department: 'Computer Science', placed: 180 },
    { department: 'Information Technology', placed: 120 },
    { department: 'Electronics & Communication', placed: 60 },
    { department: 'Mechanical Engineering', placed: 30 },
    { department: 'Civil Engineering', placed: 20 },
  ],
  packageDistribution: [
    { range: '3-6 LPA', count: 150 },
    { range: '6-9 LPA', count: 180 },
    { range: '9-15 LPA', count: 60 },
    { range: '15+ LPA', count: 20 },
  ],
  applicationsPerCompany: [
    { company: 'Infosys', applications: 640 },
    { company: 'TCS', applications: 590 },
    { company: 'Tech Mahindra', applications: 410 },
  ],
}
