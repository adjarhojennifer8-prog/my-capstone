import { describe, expect, it } from 'vitest'
import {
  validateBio,
  validateDisplayName,
  validateEmail,
  validateSettings,
  validateUsername,
} from './settingsValidation.js'

describe('settingsValidation', () => {
  it('rejects empty required fields', () => {
    const errors = validateSettings({
      displayName: '',
      email: '',
      username: '',
      bio: '',
    })

    expect(errors.displayName).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.username).toBeTruthy()
    expect(errors.bio).toBe('')
  })

  it('rejects invalid email addresses', () => {
    expect(validateEmail('not-an-email')).toBe('Enter a valid email address.')
    expect(validateEmail('user @example.com')).toBe(
      'Email must not contain spaces.',
    )
  })

  it('rejects invalid username characters', () => {
    expect(validateUsername('bad-user')).toBe(
      'Username may only contain letters, numbers, and underscores.',
    )
    expect(validateUsername('user name')).toBe(
      'Username may only contain letters, numbers, and underscores.',
    )
    expect(validateUsername('user@name')).toBe(
      'Username may only contain letters, numbers, and underscores.',
    )
  })

  it('rejects display names shorter than 2 characters', () => {
    expect(validateDisplayName('a')).toBe(
      'Display name must be at least 2 characters.',
    )
    expect(validateDisplayName('   ')).toBe('Display name is required.')
  })

  it('rejects bios longer than 200 characters', () => {
    expect(validateBio('a'.repeat(201))).toBe(
      'Bio must be at most 200 characters.',
    )
  })

  it('accepts bios with exactly 200 characters', () => {
    expect(validateBio('a'.repeat(200))).toBe('')
  })

  it('accepts valid settings', () => {
    const errors = validateSettings({
      displayName: 'Jane Doe',
      email: 'jane@example.com',
      username: 'jane_doe',
      bio: 'Hello world',
    })

    expect(errors).toEqual({
      displayName: '',
      email: '',
      username: '',
      bio: '',
    })
  })

  it('does not reject valid display names or usernames with surrounding whitespace', () => {
    expect(validateDisplayName('  Jo  ')).toBe('')
    expect(validateUsername('  abc  ')).toBe('')
  })
})
