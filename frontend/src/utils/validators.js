/*
Purpose
Shared, reusable form validation helpers so validation logic is never
duplicated across forms (SRS 5.3.5 Input Validation, Spec section 29).
*/

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// export function validatePhone(phone) {
//   const regex = /^[0-9]{10}$/
//   return regex.test(phone)
// }
export function validatePhone(phone) {
  const regex = /^[6-9]\d{9}$/
  return regex.test(String(phone).trim())
}

export function validateCGPA(cgpa) {
  const value = Number(cgpa)
  return !Number.isNaN(value) && value >= 0 && value <= 10
}

export function validateRequired(value) {
  return value !== undefined && value !== null && String(value).trim() !== ''
}

export function validateUrl(url) {
  if (!url) return true // optional field in most forms
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validatePassword(password) {
  if (!password) {
    return 'Password is required.'
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (!passwordRegex.test(password)) {
    return 'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.'
  }

  return ''
}