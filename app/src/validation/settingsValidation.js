export const INITIAL_VALUES = {
  displayName: '',
  email: '',
  username: '',
  bio: '',
  emailNotifications: true,
  theme: 'system',
}

export const FIELD_IDS = {
  displayName: 'displayName',
  email: 'email',
  username: 'username',
  bio: 'bio',
  emailNotifications: 'emailNotifications',
  theme: 'theme',
}

export function validateDisplayName(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Display name is required.'
  }

  if (trimmed.length < 2) {
    return 'Display name must be at least 2 characters.'
  }

  if (trimmed.length > 50) {
    return 'Display name must be at most 50 characters.'
  }

  return ''
}

export function validateEmail(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Email is required.'
  }

  if (/\s/.test(value)) {
    return 'Email must not contain spaces.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(trimmed)) {
    return 'Enter a valid email address.'
  }

  return ''
}

export function validateUsername(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Username is required.'
  }

  if (trimmed.length < 3) {
    return 'Username must be at least 3 characters.'
  }

  if (trimmed.length > 20) {
    return 'Username must be at most 20 characters.'
  }

  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return 'Username may only contain letters, numbers, and underscores.'
  }

  return ''
}

export function validateBio(value) {
  if (value.length > 200) {
    return 'Bio must be at most 200 characters.'
  }

  return ''
}

export function validateField(field, value) {
  switch (field) {
    case 'displayName':
      return validateDisplayName(value)
    case 'email':
      return validateEmail(value)
    case 'username':
      return validateUsername(value)
    case 'bio':
      return validateBio(value)
    default:
      return ''
  }
}

export function validateSettings(values) {
  return {
    displayName: validateDisplayName(values.displayName),
    email: validateEmail(values.email),
    username: validateUsername(values.username),
    bio: validateBio(values.bio),
  }
}

export function hasValidationErrors(errors) {
  return Object.values(errors).some(Boolean)
}
