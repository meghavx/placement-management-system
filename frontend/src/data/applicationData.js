/*
Purpose
Dummy application records used by the Student Applications page and
re-exported (aggregated) for the Placement Admin Application
Management page.
*/

export const studentApplicationData = [
  { id: 1, company: 'Infosys', role: 'Systems Engineer', appliedDate: '2026-07-10', status: 'Shortlisted', interviewDate: '2026-08-02', updatedOn: '2026-07-18' },
  { id: 2, company: 'Cognizant', role: 'Programmer Analyst', appliedDate: '2026-07-05', status: 'Applied', interviewDate: null, updatedOn: '2026-07-05' },
  { id: 3, company: 'TCS', role: 'Assistant System Engineer', appliedDate: '2026-06-28', status: 'Rejected', interviewDate: '2026-07-10', updatedOn: '2026-07-12' },
  { id: 4, company: 'Capgemini', role: 'Analyst', appliedDate: '2026-06-20', status: 'Selected', interviewDate: '2026-07-02', updatedOn: '2026-07-08' },
]

export const adminApplicationData = [
  { id: 1, student: 'Aditi Sharma', company: 'Infosys', role: 'Systems Engineer', appliedDate: '2026-07-10', status: 'Shortlisted', interviewDate: '2026-08-02' },
  { id: 2, student: 'Rahul Verma', company: 'Tech Mahindra', role: 'Software Engineer', appliedDate: '2026-07-11', status: 'Applied', interviewDate: null },
  { id: 3, student: 'Sneha Patil', company: 'Zoho Corporation', role: 'Associate Software Developer', appliedDate: '2026-07-09', status: 'Selected', interviewDate: '2026-07-20' },
  { id: 4, student: 'Karthik Iyer', company: 'Wipro', role: 'Project Engineer', appliedDate: '2026-07-06', status: 'Rejected', interviewDate: '2026-07-14' },
]
