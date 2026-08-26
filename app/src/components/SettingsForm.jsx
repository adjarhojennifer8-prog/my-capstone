import { useId, useRef, useState } from 'react'
import {
  FIELD_IDS,
  INITIAL_VALUES,
  hasValidationErrors,
  validateField,
  validateSettings,
} from '../validation/settingsValidation.js'
import './SettingsForm.css'

const PROFILE_FIELDS = ['displayName', 'email', 'username', 'bio']
const THEME_OPTIONS = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

function createEmptyErrors() {
  return {
    displayName: '',
    email: '',
    username: '',
    bio: '',
  }
}

function SettingsForm() {
  const formId = useId()
  const statusRegionId = `${formId}-status`
  const submitAttemptedRef = useRef(false)

  const [values, setValues] = useState(INITIAL_VALUES)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState(createEmptyErrors)
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })

  function clearFormMessage() {
    setFormMessage({ type: '', text: '' })
  }

  function updateFieldError(field, value) {
    setErrors((current) => ({
      ...current,
      [field]: validateField(field, value),
    }))
  }

  function handleChange(field) {
    return (event) => {
      const { value, type, checked } = event.target
      const nextValue = type === 'checkbox' ? checked : value

      setValues((current) => ({
        ...current,
        [field]: nextValue,
      }))
      clearFormMessage()

      if (touched[field] || submitAttemptedRef.current) {
        updateFieldError(field, nextValue)
      }
    }
  }

  function handleBlur(field) {
    return () => {
      setTouched((current) => ({ ...current, [field]: true }))
      updateFieldError(field, values[field])
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    submitAttemptedRef.current = true

    const nextErrors = validateSettings(values)
    setErrors(nextErrors)
    setTouched({
      displayName: true,
      email: true,
      username: true,
      bio: true,
    })

    if (hasValidationErrors(nextErrors)) {
      setFormMessage({
        type: 'error',
        text: 'Please fix the errors below before saving your settings.',
      })
      return
    }

    setFormMessage({
      type: 'success',
      text: 'Settings saved successfully.',
    })
  }

  function handleReset(event) {
    event.preventDefault()
    submitAttemptedRef.current = false
    setValues(INITIAL_VALUES)
    setTouched({})
    setErrors(createEmptyErrors())
    setFormMessage({ type: '', text: '' })
  }

  function fieldErrorId(field) {
    return `${formId}-${field}-error`
  }

  function fieldDescribedBy(field) {
    const ids = []

    if (field === 'bio') {
      ids.push(`${formId}-bio-counter`)
    }

    if (errors[field]) {
      ids.push(fieldErrorId(field))
    }

    return ids.length > 0 ? ids.join(' ') : undefined
  }

  return (
    <form
      className="settings-form"
      noValidate
      onSubmit={handleSubmit}
      onReset={handleReset}
      aria-describedby={formMessage.text ? statusRegionId : undefined}
    >
      <div
        id={statusRegionId}
        className={`form-status form-status--${formMessage.type || 'empty'}`}
        role={formMessage.text ? 'status' : undefined}
        aria-live="polite"
        aria-atomic="true"
      >
        {formMessage.text}
      </div>

      <fieldset className="settings-section">
        <legend>Profile</legend>

        <div className="form-field">
          <label htmlFor={FIELD_IDS.displayName}>Display name</label>
          <input
            id={FIELD_IDS.displayName}
            name="displayName"
            type="text"
            value={values.displayName}
            onChange={handleChange('displayName')}
            onBlur={handleBlur('displayName')}
            aria-invalid={errors.displayName ? 'true' : undefined}
            aria-describedby={fieldDescribedBy('displayName')}
            autoComplete="name"
          />
          {errors.displayName ? (
            <p
              id={fieldErrorId('displayName')}
              className="field-error"
              role="alert"
            >
              {errors.displayName}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor={FIELD_IDS.email}>Email</label>
          <input
            id={FIELD_IDS.email}
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={fieldDescribedBy('email')}
            autoComplete="email"
          />
          {errors.email ? (
            <p id={fieldErrorId('email')} className="field-error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor={FIELD_IDS.username}>Username</label>
          <input
            id={FIELD_IDS.username}
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange('username')}
            onBlur={handleBlur('username')}
            aria-invalid={errors.username ? 'true' : undefined}
            aria-describedby={fieldDescribedBy('username')}
            autoComplete="username"
          />
          {errors.username ? (
            <p
              id={fieldErrorId('username')}
              className="field-error"
              role="alert"
            >
              {errors.username}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor={FIELD_IDS.bio}>Bio</label>
          <textarea
            id={FIELD_IDS.bio}
            name="bio"
            rows={4}
            value={values.bio}
            onChange={handleChange('bio')}
            onBlur={handleBlur('bio')}
            aria-invalid={errors.bio ? 'true' : undefined}
            aria-describedby={fieldDescribedBy('bio')}
          />
          <p id={`${formId}-bio-counter`} className="field-hint">
            {values.bio.length}/200 characters
          </p>
          {errors.bio ? (
            <p id={fieldErrorId('bio')} className="field-error" role="alert">
              {errors.bio}
            </p>
          ) : null}
        </div>
      </fieldset>

      <fieldset className="settings-section">
        <legend>Preferences</legend>

        <div className="form-field form-field--checkbox">
          <input
            id={FIELD_IDS.emailNotifications}
            name="emailNotifications"
            type="checkbox"
            checked={values.emailNotifications}
            onChange={handleChange('emailNotifications')}
          />
          <label htmlFor={FIELD_IDS.emailNotifications}>
            Email notifications
          </label>
        </div>

        <div className="form-field">
          <label htmlFor={FIELD_IDS.theme}>Theme</label>
          <select
            id={FIELD_IDS.theme}
            name="theme"
            value={values.theme}
            onChange={handleChange('theme')}
          >
            {THEME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save settings
        </button>
        <button type="reset" className="btn btn-secondary">
          Reset
        </button>
      </div>
    </form>
  )
}

export default SettingsForm
