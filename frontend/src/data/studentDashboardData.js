/*
Purpose
Dummy statistics and lists for the Student Dashboard page, matching the
layout described in Part 3 of the spec.
*/

export const studentDashboardData = {
  stats: {
    eligibleDrives: 12,
    applicationsSubmitted: 5,
    interviewsScheduled: 2,
    offersReceived: 1,
  },
  upcomingDrives: [
    { id: 1, company: 'Tech Mahindra', role: 'Software Engineer', package: 8.5, deadline: '2026-08-01', eligibilityStatus: 'Eligible' },
    { id: 5, company: 'Zoho Corporation', role: 'Associate Software Developer', package: 9.0, deadline: '2026-08-12', eligibilityStatus: 'Eligible' },
  ],
  recentApplications: [
    { id: 1, company: 'Infosys', role: 'Systems Engineer', appliedDate: '2026-07-10', status: 'Shortlisted', updatedOn: '2026-07-18' },
    { id: 2, company: 'Cognizant', role: 'Programmer Analyst', appliedDate: '2026-07-05', status: 'Applied', updatedOn: '2026-07-05' },
  ],
  notifications: [
    { id: 1, title: 'Interview Scheduled', description: 'Your Infosys interview is scheduled for 2 Aug.', time: '2 hours ago', read: false },
    { id: 2, title: 'New Placement Drive', description: 'Zoho Corporation drive has been published.', time: '1 day ago', read: true },
  ],
  upcomingInterviews: [
    { id: 1, company: 'Infosys', date: '2026-08-02', time: '10:00 AM', mode: 'Online', status: 'Scheduled' },
  ],
}
