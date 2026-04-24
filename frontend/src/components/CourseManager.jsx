import { useCreateCourse, useCourses } from '../hooks/useCourses'
import { useState } from 'react'

const TRACK_MATERIALS = [
  { title: 'JavaScript Foundations', level: 'Beginner', lessons: 12, exercises: 40 },
  { title: 'Data Structures Core', level: 'Intermediate', lessons: 16, exercises: 55 },
  { title: 'Algorithms Interview Prep', level: 'Advanced', lessons: 20, exercises: 80 },
  { title: 'Backend API Engineering', level: 'Intermediate', lessons: 14, exercises: 46 }
]

export default function CourseManager() {
  const { data: courses = [], isLoading, isError, error } = useCourses()
  const createCourse = useCreateCourse()
  const [name, setName] = useState('')
  const [term, setTerm] = useState('')

  async function submit(e) {
    e.preventDefault()
    await createCourse.mutateAsync({ name, term })
    setName('')
    setTerm('')
  }

  return (
    <div className="panel-body">
      <p className="eyebrow">Structured learning</p>
      <h3>Learning Tracks</h3>
      <form onSubmit={submit} className="inline-form surface-block">
        <input placeholder="Track name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Phase or term" value={term} onChange={(e) => setTerm(e.target.value)} required />
        <button type="submit">Add</button>
      </form>
      <div className="surface-block">
        <h4>Learning Tracks Library</h4>
        <div className="material-grid">
          {TRACK_MATERIALS.map((track) => (
            <div key={track.title} className="material-card">
              <p className="eyebrow">{track.level}</p>
              <h5>{track.title}</h5>
              <p>{track.lessons} lessons</p>
              <p>{track.exercises} exercises</p>
            </div>
          ))}
        </div>
      </div>
      <div className="surface-block">
        <h4>Your Created Tracks</h4>
        {isLoading ? <p>Loading your tracks...</p> : null}
        {isError ? <p className="error">{error?.message || 'Failed to load tracks.'}</p> : null}
        {!isLoading && !isError ? (
          <ul>
            {courses.map((course) => (
              <li key={course.id}>{course.name} ({course.term})</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
