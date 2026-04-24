import { useMemo, useState } from 'react'
import { useOverviewAnalytics, useTopicAnalytics } from '../hooks/usePractice'

export default function AnalyticsPanel() {
  const { data: overview } = useOverviewAnalytics()
  const { data: topics = [] } = useTopicAnalytics()
  const [showLowMasteryOnly, setShowLowMasteryOnly] = useState(false)
  const [masteryThreshold, setMasteryThreshold] = useState(70)

  const topWeakTopic = useMemo(() => {
    if (!topics.length) return null
    return [...topics].sort((a, b) => a.mastery - b.mastery)[0]
  }, [topics])

  const visibleTopics = useMemo(() => {
    if (!showLowMasteryOnly) {
      return topics
    }
    return topics.filter((topic) => topic.mastery < masteryThreshold)
  }, [topics, showLowMasteryOnly, masteryThreshold])

  const visibleOverviewItems = useMemo(() => {
    if (!overview) {
      return []
    }
    return [
      { key: 'Total Tracks', value: overview.total_courses },
      { key: 'Total Exercises', value: overview.total_tasks },
      { key: 'Completed Exercises', value: overview.completed_tasks },
      { key: 'Completion Rate', value: `${overview.completion_rate}%` },
      { key: 'Practice Attempts', value: overview.practice_attempts },
      { key: 'Correct Attempts', value: overview.correct_attempts }
    ]
  }, [overview])

  return (
    <div className="panel-body">
      <p className="eyebrow">Performance view</p>
      <h3>Progress Radar</h3>
      <div className="surface-block radar-intro">
        <p>
          Progress Radar tracks your completion, accuracy, and topic mastery from every challenge evaluation.
          It updates automatically whenever new attempts are submitted.
        </p>
        <div className="radar-controls">
          <button type="button" className="secondary" onClick={() => setShowLowMasteryOnly((prev) => !prev)}>
            {showLowMasteryOnly ? 'Show All Topics' : 'Show Focus Topics'}
          </button>
          <label>
            Focus threshold
            <input
              type="number"
              min="0"
              max="100"
              value={masteryThreshold}
              onChange={(e) => setMasteryThreshold(Number(e.target.value) || 0)}
            />
          </label>
        </div>
      </div>
      {overview ? (
        <div className="surface-block">
          <h4>What this tracks</h4>
          <ul>
            {visibleOverviewItems.map((item) => (
              <li key={item.key}>{item.key}: {item.value}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="surface-block">
        <h4>Topic Mastery</h4>
        {!visibleTopics.length ? <p>No topics in this filter yet.</p> : null}
        <ul>
          {visibleTopics.map((topic) => (
            <li key={topic.topic}>{topic.topic}: {topic.mastery}% ({topic.correct}/{topic.attempts})</li>
          ))}
        </ul>
      </div>
      {topWeakTopic ? <p>Focus next: {topWeakTopic.topic}</p> : null}
    </div>
  )
}
