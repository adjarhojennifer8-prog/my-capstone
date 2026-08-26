import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import SettingsForm from './SettingsForm.jsx'

const validValues = {
  displayName: 'Jane Doe',
  email: 'jane@example.com',
  username: 'jane_doe',
  bio: 'A short bio.',
}

async function fillValidProfile(user) {
  await user.type(screen.getByLabelText(/display name/i), validValues.displayName)
  await user.type(screen.getByLabelText(/^email$/i), validValues.email)
  await user.type(screen.getByLabelText(/^username$/i), validValues.username)
  await user.type(screen.getByLabelText(/^bio$/i), validValues.bio)
}

describe('SettingsForm', () => {
  it('rejects empty required fields on submit', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText(/display name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/username is required/i)).toBeInTheDocument()
    expect(
      screen.getByText(/please fix the errors below before saving/i),
    ).toBeInTheDocument()
  })

  it('rejects invalid email on submit', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/display name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/^email$/i), 'not-an-email')
    await user.type(screen.getByLabelText(/^username$/i), 'jane_doe')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()
  })

  it('rejects invalid username characters on submit', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/display name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/^email$/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/^username$/i), 'bad-user')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(
      screen.getByText(/username may only contain letters, numbers, and underscores/i),
    ).toBeInTheDocument()
  })

  it('rejects display names shorter than 2 characters on blur', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    const displayName = screen.getByLabelText(/display name/i)
    await user.type(displayName, 'a')
    await user.tab()

    expect(
      screen.getByText(/display name must be at least 2 characters/i),
    ).toBeInTheDocument()
  })

  it('rejects bios longer than 200 characters on submit', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await fillValidProfile(user)
    await user.clear(screen.getByLabelText(/^bio$/i))
    await user.type(screen.getByLabelText(/^bio$/i), 'a'.repeat(201))
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(
      screen.getByText(/bio must be at most 200 characters/i),
    ).toBeInTheDocument()
  })

  it('accepts bios with exactly 200 characters', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/display name/i), validValues.displayName)
    await user.type(screen.getByLabelText(/^email$/i), validValues.email)
    await user.type(screen.getByLabelText(/^username$/i), validValues.username)
    await user.type(screen.getByLabelText(/^bio$/i), 'a'.repeat(200))
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText(/settings saved successfully/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/bio must be at most 200 characters/i),
    ).not.toBeInTheDocument()
  })

  it('submits successfully with valid values', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await fillValidProfile(user)
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText(/settings saved successfully/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/please fix the errors below/i),
    ).not.toBeInTheDocument()
  })

  it('reset clears validation errors and restores initial values', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await fillValidProfile(user)
    await user.click(screen.getByRole('button', { name: /save settings/i }))
    expect(screen.getByText(/settings saved successfully/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /reset/i }))

    expect(screen.getByLabelText(/display name/i)).toHaveValue('')
    expect(screen.getByLabelText(/^email$/i)).toHaveValue('')
    expect(screen.getByLabelText(/^username$/i)).toHaveValue('')
    expect(screen.getByLabelText(/^bio$/i)).toHaveValue('')
    expect(screen.getByLabelText(/email notifications/i)).toBeChecked()
    expect(screen.getByLabelText(/^theme$/i)).toHaveValue('system')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(
      screen.queryByText(/settings saved successfully/i),
    ).not.toBeInTheDocument()
  })

  it('sets accessibility attributes on invalid fields', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.click(screen.getByRole('button', { name: /save settings/i }))

    const displayName = screen.getByLabelText(/display name/i)
    const email = screen.getByLabelText(/^email$/i)
    const username = screen.getByLabelText(/^username$/i)

    expect(displayName).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(username).toHaveAttribute('aria-invalid', 'true')

    const displayNameError = screen.getByText(/display name is required/i)
    expect(displayName).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining(displayNameError.id),
    )
  })

  it('shows a live bio character counter', () => {
    render(<SettingsForm />)

    expect(screen.getByText('0/200 characters')).toBeInTheDocument()
  })

  it('defaults preferences correctly', () => {
    render(<SettingsForm />)

    expect(screen.getByLabelText(/email notifications/i)).toBeChecked()
    expect(screen.getByLabelText(/^theme$/i)).toHaveValue('system')

    const themeSelect = screen.getByLabelText(/^theme$/i)
    const options = within(themeSelect).getAllByRole('option')

    expect(options).toHaveLength(3)
    expect(options.map((option) => option.textContent)).toEqual([
      'System',
      'Light',
      'Dark',
    ])
  })
})
