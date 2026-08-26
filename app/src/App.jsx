import SettingsForm from './components/SettingsForm.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Settings</h1>
        <p className="app-subtitle">Manage your profile and preferences</p>
      </header>
      <main className="app-main">
        <SettingsForm />
      </main>
    </div>
  )
}

export default App
