/*
Purpose
Dummy profile data for the logged-in student, covering personal,
academic, skills, and certifications sections (Student Profile Page).
*/

export const studentProfileData = {
  fullName: 'Aditi Sharma',
  email: 'student@college.edu',
  phone: '9876543210',
  gender: 'Female',
  address: '221 MG Road',
  city: 'Bengaluru',
  state: 'Karnataka',
  pinCode: '560001',
  dateOfBirth: '2004-03-15',

  department: 'Computer Science',
  branch: 'Computer Science & Engineering',
  batch: '2022-2026',
  cgpa: 8.4,
  enrollmentNumber: 'ENR2022CS045',
  universityRollNumber: 'URN0451209',
  graduationYear: 2026,

  skills: ['Java', 'Spring Boot', 'React', 'MySQL', 'Git'],

  certifications: [
    {
      id: 1,
      title: 'AWS Cloud Practitioner',
      organization: 'Amazon Web Services',
      issueDate: '2025-11-10',
      credentialLink: 'https://credentials.example.com/aws-cp',
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      organization: 'Coursera',
      issueDate: '2025-05-22',
      credentialLink: 'https://credentials.example.com/fswd',
    },
  ],
}
