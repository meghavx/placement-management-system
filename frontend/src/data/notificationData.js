/*
Purpose
Dummy notification records for the Student and Recruiter Notifications
pages, covering every notification type described in the spec.
*/

export const studentNotificationData = [
  { id: 1, type: 'Interview Schedule', title: 'Interview Scheduled', description: 'Your Infosys interview is scheduled for 2 Aug, 10:00 AM.', time: '2 hours ago', read: false },
  { id: 2, type: 'Placement Announcement', title: 'New Placement Drive: Zoho Corporation', description: 'A new drive has been published for eligible students.', time: '1 day ago', read: true },
  { id: 3, type: 'Selection Result', title: 'Result Published: Capgemini', description: 'Congratulations! You have been selected.', time: '3 days ago', read: true },
  { id: 4, type: 'Deadline Reminder', title: 'Application Deadline Approaching', description: 'Tech Mahindra drive closes on 1 Aug.', time: '4 days ago', read: false },
  { id: 5, type: 'General Notice', title: 'Placement Cell Office Hours Updated', description: 'The placement cell will now be open until 6 PM on weekdays.', time: '1 week ago', read: true },
]

export const recruiterNotificationData = [
  { id: 1, type: 'Applications Received', title: '18 New Applications', description: 'Your Tech Mahindra drive received 18 new applications.', time: '3 hours ago', read: false, priority: 'High' },
  { id: 2, type: 'Interview Reminder', title: 'Interviews Today', description: 'You have 4 interviews scheduled today.', time: '5 hours ago', read: false, priority: 'High' },
  { id: 3, type: 'Deadline Reminder', title: 'Drive Deadline Tomorrow', description: 'Application deadline for Zoho Corporation drive is tomorrow.', time: '1 day ago', read: true, priority: 'Medium' },
  { id: 4, type: 'Result Published', title: 'Results Published', description: 'You published results for 12 candidates.', time: '2 days ago', read: true, priority: 'Low' },
]
