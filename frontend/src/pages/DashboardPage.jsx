import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AnalyticsPanel from '../components/AnalyticsPanel'
import CourseManager from '../components/CourseManager'
import PracticePanel from '../components/PracticePanel'
import TaskPlanner from '../components/TaskPlanner'

const SECTIONS = [
  { key: 'challenge', label: 'Challenge Lab', hint: 'Focused coding challenges only' },
  { key: 'flashcards', label: 'Exam Flashcards', hint: 'Rapid concept recall practice' },
  { key: 'organization', label: 'Learning Tracks', hint: 'Courses and structured paths' },
  { key: 'planning', label: 'Exercise Planner', hint: 'Build your coding routine' },
  { key: 'insights', label: 'Progress Radar', hint: 'Auto-updating mastery analytics' }
]

export default function DashboardPage() {
  const { auth, logout } = useAuth()
  const [activeSection, setActiveSection] = useState('challenge')
  const activeItem = SECTIONS.find((section) => section.key === activeSection)

  return (
    <div className="layout">
      <main className="workspace">
        <aside className="card sidebar minimal-sidebar">
          <p className="eyebrow">StudyForge</p>
          <h2 className="sidebar-title">Programmer Hub</h2>
          <div className="status-badge">Live Practice Platform</div>
          <div className="sidebar-nav">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                className={activeSection === section.key ? 'sidebar-btn active' : 'sidebar-btn'}
                onClick={() => setActiveSection(section.key)}
                type="button"
              >
                <span>{section.label}</span>
                <small>{section.hint}</small>
              </button>
            ))}
          </div>
          <div className="sidebar-footer">
            <span className="chip">{auth.user?.email}</span>
            <button onClick={logout} className="secondary">Logout</button>
          </div>
        </aside>
        <section className="section-view">
          <header className="header card dashboard-header">
            <div>
              <p className="eyebrow">Quizlet-inspired coding workspace</p>
              <h1>{activeItem?.label}</h1>
              <p className="subtitle">Learn concepts, practice actively, and build coding confidence daily.</p>
            </div>
            <div className="hero-metrics">
              <div className="hero-metric">
                <span>Daily Goal</span>
                <strong>5 Exercises</strong>
              </div>
              <div className="hero-metric">
                <span>Streak</span>
                <strong>12 Days</strong>
              </div>
              <div className="hero-metric">
                <span>Mastery</span>
                <strong>74%</strong>
              </div>
            </div>
          </header>
          <div className="card panel-shell">
            {activeSection === 'challenge' ? <PracticePanel mode="challenge" /> : null}
            {activeSection === 'flashcards' ? <PracticePanel mode="flashcards" /> : null}
            {activeSection === 'organization' ? <CourseManager /> : null}
            {activeSection === 'planning' ? <TaskPlanner /> : null}
            {activeSection === 'insights' ? <AnalyticsPanel /> : null}
          </div>
        </section>
      </main>
    </div>
  )
}
