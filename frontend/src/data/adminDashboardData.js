/*
Purpose
Dummy statistics for the Placement Admin Dashboard, the most
information-rich dashboard in the application (Part 5 of the spec).
*/

export const adminDashboardData = {
  stats: {
    totalStudents: 1240,
    totalRecruiters: 86,
    totalCompanies: 54,
    activeDrives: 22,
    applicationsReceived: 3860,
    studentsSelected: 410,
    placementPercentage: 78,
    averagePackage: 7.6,
  },
  charts: {
    monthlyPlacementTrend: [
      { month: 'Feb', placed: 20 },
      { month: 'Mar', placed: 45 },
      { month: 'Apr', placed: 70 },
      { month: 'May', placed: 95 },
      { month: 'Jun', placed: 130 },
      { month: 'Jul', placed: 410 },
    ],
    departmentWisePlacement: [
      { department: 'Computer Science', placed: 180 },
      { department: 'Information Technology', placed: 120 },
      { department: 'Electronics & Communication', placed: 60 },
      { department: 'Mechanical Engineering', placed: 30 },
      { department: 'Civil Engineering', placed: 20 },
    ],
    applicationsByCompany: [
      { company: 'Infosys', applications: 640 },
      { company: 'TCS', applications: 590 },
      { company: 'Tech Mahindra', applications: 410 },
      { company: 'Zoho Corporation', applications: 260 },
    ],
    selectionRate: 62,
  },
  recentDrives: [
    { id: 1, company: 'Tech Mahindra', role: 'Software Engineer', deadline: '2026-08-01', applicants: 63, status: 'Published' },
    { id: 5, company: 'Zoho Corporation', role: 'Associate Software Developer', deadline: '2026-08-12', applicants: 38, status: 'Published' },
  ],
  recentRecruiters: [
    { id: 1, company: 'Zoho Corporation', recruiter: 'Priya Raman', status: 'Active', createdDate: '2026-07-15' },
    { id: 2, company: 'Tech Mahindra', recruiter: 'Rohan Mehta', status: 'Active', createdDate: '2026-07-10' },
  ],
  recentStudents: [
    { id: 1, name: 'Aditi Sharma', department: 'Computer Science', cgpa: 8.4, accountStatus: 'Active' },
    { id: 2, name: 'Rahul Verma', department: 'Computer Science', cgpa: 8.1, accountStatus: 'Active' },
  ],
  upcomingActivities: [
    { id: 1, drive: 'Tech Mahindra - Software Engineer', activity: 'Technical Interview', deadline: '2026-08-02' },
    { id: 2, drive: 'Zoho Corporation - Associate Developer', activity: 'Application Deadline', deadline: '2026-08-12' },
  ],
}
