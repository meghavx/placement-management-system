/*
Purpose
Dummy data for the Recruiter Dashboard, matching Part 4 of the spec.
*/

export const recruiterDashboardData = {
  stats: {
    activeDrives: 8,
    applicationsReceived: 247,
    candidatesShortlisted: 42,
    offersPublished: 15,
  },
  recentDrives: [
    { id: 1, company: 'Tech Mahindra', role: 'Software Engineer', applications: 63, deadline: '2026-08-01', status: 'Published' },
    { id: 2, company: 'Tech Mahindra', role: 'QA Engineer', applications: 28, deadline: '2026-08-05', status: 'Draft' },
  ],
  latestApplicants: [
    { id: 1, name: 'Rahul Verma', drive: 'Software Engineer', department: 'Computer Science', cgpa: 8.1, appliedDate: '2026-07-20', status: 'Applied' },
    { id: 2, name: 'Sneha Patil', drive: 'Software Engineer', department: 'Information Technology', cgpa: 8.9, appliedDate: '2026-07-19', status: 'Shortlisted' },
  ],
  upcomingInterviews: [
    { id: 1, studentName: 'Sneha Patil', role: 'Software Engineer', date: '2026-08-02', time: '11:00 AM', mode: 'Online' },
    { id: 2, studentName: 'Karthik Iyer', role: 'Software Engineer', date: '2026-08-02', time: '2:00 PM', mode: 'On-Campus' },
  ],
  notifications: [
    { id: 1, title: '18 New Applications', time: '3 hours ago' },
    { id: 2, title: 'Interview Reminder: 4 today', time: '5 hours ago' },
  ],
}
