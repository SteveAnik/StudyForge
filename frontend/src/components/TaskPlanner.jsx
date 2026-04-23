import { useState } from 'react'
import { useCourses } from '../hooks/useCourses'
import { useCreateTask, useTasks } from '../hooks/useTasks'

export default function TaskPlanner() {
  const { data: courses = [] } = useCourses()
  const { data: tasks = [] } = useTasks()
  const createTask = useCreateTask()
  const [form, setForm] = useState({
    course_id: '',
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    estimated_minutes: 30
  })

  async function submit(e) {
    e.preventDefault()
    await createTask.mutateAsync(form)
    setForm({ ...form, title: '', description: '' })
  }

  return (
    <div className="panel-body">
      <p className="eyebrow">Practice planning</p>
      <h3>Exercise Planner</h3>
      <form onSubmit={submit} className="task-grid surface-block">
        <select value={form.course_id} onChange={(e) => setForm({ ...form, course_id: e.target.value })} required>
          <option value="">Select Track</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
        <input placeholder="Exercise title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="What to practice" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input type="number" min="1" value={form.estimated_minutes} onChange={(e) => setForm({ ...form, estimated_minutes: Number(e.target.value) })} />
        <button type="submit">Create Exercise</button>
      </form>
      <div className="surface-block">
        <h4>Planned Exercises</h4>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title} - {task.status} - {task.priority}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
