import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AnalyticsPanel from '../components/AnalyticsPanel'
import CourseManager from '../components/CourseManager'
import PracticePanel from '../components/PracticePanel'
import TaskPlanner from '../components/TaskPlanner'

const SECTIONS = [
  { key: 'practice', label: 'Learn & Practice', hint: 'Challenges and coding drills' },
  { key: 'organization', label: 'Learning Tracks', hint: 'Courses and structured paths' },
  { key: 'planning', label: 'Exercise Planner', hint: 'Build your coding routine' },
  { key: 'insights', label: 'Progress Radar', hint: 'Mastery and growth metrics' }
]

export default function DashboardPage() {
  const { auth, logout } = useAuth()
  const [activeSection, setActiveSection] = useState('practice')
  const activeItem = SECTIONS.find((section) => section.key === activeSection)

  return (
    <div className="layout">
      <main className="workspace">
        <aside className="card sidebar minimal-sidebar">
          <p className="eyebrow">StudyForge</p>
          <h2 className="sidebar-title">Programmer Hub</h2>
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
          </header>
          <div className="card panel-shell">
            {activeSection === 'practice' ? <PracticePanel /> : null}
            {activeSection === 'organization' ? <CourseManager /> : null}
            {activeSection === 'planning' ? <TaskPlanner /> : null}
            {activeSection === 'insights' ? <AnalyticsPanel /> : null}
          </div>
        </section>
      </main>
    </div>
  )
}
