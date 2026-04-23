import { useMemo } from 'react'
import { useOverviewAnalytics, useTopicAnalytics } from '../hooks/usePractice'

export default function AnalyticsPanel() {
  const { data: overview } = useOverviewAnalytics()
  const { data: topics = [] } = useTopicAnalytics()

  const topWeakTopic = useMemo(() => {
    if (!topics.length) return null
    return [...topics].sort((a, b) => a.mastery - b.mastery)[0]
  }, [topics])

  return (
    <div className="panel-body">
      <p className="eyebrow">Performance view</p>
      <h3>Progress Radar</h3>
      {overview ? (
        <div className="surface-block">
          <ul>
            <li>Total Tracks: {overview.total_courses}</li>
            <li>Total Exercises: {overview.total_tasks}</li>
            <li>Completed Exercises: {overview.completed_tasks}</li>
            <li>Completion Rate: {overview.completion_rate}%</li>
            <li>Practice Attempts: {overview.practice_attempts}</li>
            <li>Correct Attempts: {overview.correct_attempts}</li>
          </ul>
        </div>
      ) : null}
      <div className="surface-block">
        <h4>Topic Mastery</h4>
        <ul>
          {topics.map((topic) => (
            <li key={topic.topic}>{topic.topic}: {topic.mastery}% ({topic.correct}/{topic.attempts})</li>
          ))}
        </ul>
      </div>
      {topWeakTopic ? <p>Focus next: {topWeakTopic.topic}</p> : null}
    </div>
  )
}
