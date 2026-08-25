import { useState } from 'react'
import './SettingsForm.css'

const INITIAL_VALUES = {
  displayName: '',
  email: '',
  username: '',
  bio: '',
  notifications: true,
  theme: 'system',
}

function validateField(name, value) {
  switch (name) {
    case 'displayName':
      if (!value.trim()) return 'Display name is required.'
      if (value.trim().length < 2) return 'Display name must be at least 2 characters.'
      if (value.trim().length > 50) return 'Display name must be 50 characters or fewer.'
      return ''

    case 'email':
      if (!value.trim()) return 'Email is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return 'Enter a valid email address.'
      }
      return ''

    case 'username':
      if (!value.trim()) return 'Username is required.'
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return 'Username may only contain letters, numbers, and underscores.'
      }
      if (value.length < 3) return 'Username must be at least 3 characters.'
      if (value.length > 20) return 'Username must be 20 characters or fewer.'
      return ''

    case 'bio':
      if (value.length > 200) return 'Bio must be 200 characters or fewer.'
      return ''

    case 'theme':
      if (!['light', 'dark', 'system'].includes(value)) {
        return 'Select a valid theme.'
      }
      return ''

    default:
      return ''
  }
}

function validateAll(values) {
  const errors = {}
  for (const key of Object.keys(INITIAL_VALUES)) {
    if (key === 'notifications') continue
    const error = validateField(key, values[key])
    if (error) errors[key] = error
  }
  return errors
}

function SettingsForm() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitStatus, setSubmitStatus] = useState(null)

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setValues((prev) => ({ ...prev, [name]: nextValue }))
    setSubmitStatus(null)

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, nextValue),
      }))
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateAll(values)
    setErrors(nextErrors)
    setTouched(
      Object.fromEntries(Object.keys(INITIAL_VALUES).map((key) => [key, true])),
    )

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus({ type: 'error', message: 'Fix the errors below before saving.' })
      return
    }

    setSubmitStatus({ type: 'success', message: 'Settings saved successfully.' })
  }

  function handleReset() {
    setValues(INITIAL_VALUES)
    setErrors({})
    setTouched({})
    setSubmitStatus(null)
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <header className="settings-form__header">
        <h1>Settings</h1>
        <p>Update your profile and preferences.</p>
      </header>

      {submitStatus && (
        <div
          className={`settings-form__banner settings-form__banner--${submitStatus.type}`}
          role="status"
        >
          {submitStatus.message}
        </div>
      )}

      <fieldset className="settings-form__section">
        <legend>Profile</legend>

        <div className="settings-form__field">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={values.displayName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={errors.displayName ? 'displayName-error' : undefined}
            autoComplete="name"
          />
          {errors.displayName && (
            <span id="displayName-error" className="settings-form__error" role="alert">
              {errors.displayName}
            </span>
          )}
        </div>

        <div className="settings-form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <span id="email-error" className="settings-form__error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="settings-form__field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? 'username-error' : undefined}
            autoComplete="username"
          />
          {errors.username && (
            <span id="username-error" className="settings-form__error" role="alert">
              {errors.username}
            </span>
          )}
        </div>

        <div className="settings-form__field">
          <label htmlFor="bio">
            Bio
            <span className="settings-form__optional">(optional)</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.bio)}
            aria-describedby={errors.bio ? 'bio-error' : 'bio-hint'}
          />
          <span id="bio-hint" className="settings-form__hint">
            {values.bio.length}/200 characters
          </span>
          {errors.bio && (
            <span id="bio-error" className="settings-form__error" role="alert">
              {errors.bio}
            </span>
          )}
        </div>
      </fieldset>

      <fieldset className="settings-form__section">
        <legend>Preferences</legend>

        <div className="settings-form__field settings-form__field--checkbox">
          <label htmlFor="notifications">
            <input
              id="notifications"
              name="notifications"
              type="checkbox"
              checked={values.notifications}
              onChange={handleChange}
            />
            Email notifications
          </label>
        </div>

        <div className="settings-form__field">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={values.theme}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.theme)}
            aria-describedby={errors.theme ? 'theme-error' : undefined}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          {errors.theme && (
            <span id="theme-error" className="settings-form__error" role="alert">
              {errors.theme}
            </span>
          )}
        </div>
      </fieldset>

      <div className="settings-form__actions">
        <button type="submit" className="settings-form__btn settings-form__btn--primary">
          Save settings
        </button>
        <button
          type="button"
          className="settings-form__btn settings-form__btn--secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export default SettingsForm
