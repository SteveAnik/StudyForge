import { useEffect, useMemo, useState } from 'react'
import { useEvaluatePractice, usePracticeChallenges } from '../hooks/usePractice'

const TOPICS = ['all', 'arrays', 'linked_lists', 'stacks', 'queues', 'recursion', 'sorting', 'searching']

const FLASHCARDS = [
  { topic: 'arrays', question: 'What is the time complexity of accessing an element by index in an array?', answer: 'O(1) because arrays support direct index addressing.' },
  { topic: 'linked_lists', question: 'Why are insertions at the head of a singly linked list efficient?', answer: 'They are O(1) because only pointer updates are needed.' },
  { topic: 'stacks', question: 'Which operations define a stack ADT?', answer: 'push, pop, peek/top, and isEmpty.' },
  { topic: 'queues', question: 'What order does a queue follow?', answer: 'FIFO: First-In, First-Out.' },
  { topic: 'recursion', question: 'What two essentials must every recursive function have?', answer: 'A base case and a recursive step that progresses toward it.' },
  { topic: 'sorting', question: 'When is merge sort preferred over quick sort?', answer: 'When guaranteed O(n log n) worst-case performance and stability are needed.' },
  { topic: 'searching', question: 'When can binary search be applied?', answer: 'Only when the data is sorted (or monotonic by key).' }
]

const CODE_SPRINT = [
  { topic: 'arrays', question: 'Best complexity for finding max in unsorted array?', answer: 'O(n)', options: ['O(log n)', 'O(n)', 'O(n log n)'] },
  { topic: 'stacks', question: 'Which operation removes top stack element?', answer: 'pop', options: ['push', 'peek', 'pop'] },
  { topic: 'searching', question: 'Binary search requires which precondition?', answer: 'sorted data', options: ['hashed data', 'sorted data', 'unique data'] },
  { topic: 'recursion', question: 'Missing base case most likely causes?', answer: 'infinite recursion', options: ['faster runtime', 'infinite recursion', 'constant memory'] }
]

export default function PracticePanel() {
  const [topic, setTopic] = useState('all')
  const { data: challenges = [] } = usePracticeChallenges(topic === 'all' ? undefined : topic)
  const evaluate = useEvaluatePractice()
  const [selectedChallengeId, setSelectedChallengeId] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [result, setResult] = useState(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [flashcardIndex, setFlashcardIndex] = useState(0)

  const selectedChallenge = useMemo(
    () => challenges.find((c) => c.id === selectedChallengeId) || null,
    [challenges, selectedChallengeId]
  )

  const visibleFlashcards = useMemo(
    () => (topic === 'all' ? FLASHCARDS : FLASHCARDS.filter((card) => card.topic === topic)),
    [topic]
  )

  const currentFlashcard = visibleFlashcards[flashcardIndex] || null
  const visibleCodeSprint = useMemo(
    () => (topic === 'all' ? CODE_SPRINT : CODE_SPRINT.filter((item) => item.topic === topic)),
    [topic]
  )

  useEffect(() => {
    if (challenges.length > 0) {
      setSelectedChallengeId(challenges[0].id)
      setSubmitted('')
      setResult(null)
    } else {
      setSelectedChallengeId('')
    }
  }, [challenges])

  useEffect(() => {
    setFlashcardIndex(0)
    setIsFlipped(false)
  }, [topic])

  async function submitAttempt(e) {
    e.preventDefault()
    if (!selectedChallenge) {
      return
    }
    let parsedOutput = submitted
    if (selectedChallenge.submission_type === 'number') {
      parsedOutput = Number(submitted)
    }
    if (selectedChallenge.submission_type === 'boolean') {
      parsedOutput = submitted.trim().toLowerCase() === 'true'
    }
    if (selectedChallenge.submission_type === 'array') {
      parsedOutput = submitted.split(',').map((v) => Number(v.trim())).filter((v) => !Number.isNaN(v))
    }

    const response = await evaluate.mutateAsync({
      challenge_id: selectedChallenge.id,
      submitted_output: parsedOutput,
      duration_seconds: 30
    })
    setResult(response)
  }

  function nextFlashcard() {
    if (!visibleFlashcards.length) {
      return
    }
    setFlashcardIndex((prev) => (prev + 1) % visibleFlashcards.length)
    setIsFlipped(false)
  }

  function prevFlashcard() {
    if (!visibleFlashcards.length) {
      return
    }
    setFlashcardIndex((prev) => (prev - 1 + visibleFlashcards.length) % visibleFlashcards.length)
    setIsFlipped(false)
  }

  return (
    <div className="panel-body focus-panel">
      <p className="eyebrow">Learning + Practice + Play</p>
      <h3>Programmer Training Arena</h3>
      <div className="practice-layout">
        <section className="practice-column">
          <form onSubmit={submitAttempt} className="task-grid surface-block">
            <h4>Challenge Lab</h4>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t === 'all' ? 'All Topics' : t}</option>
              ))}
            </select>
            <select value={selectedChallengeId} onChange={(e) => setSelectedChallengeId(e.target.value)}>
              {challenges.map((challenge) => (
                <option key={challenge.id} value={challenge.id}>{challenge.title}</option>
              ))}
            </select>
            {selectedChallenge ? (
              <div className="challenge-preview compact">
                <p>{selectedChallenge.prompt}</p>
                <p><strong>Input:</strong> {JSON.stringify(selectedChallenge.input_payload)}</p>
                <input
                  value={submitted}
                  onChange={(e) => setSubmitted(e.target.value)}
                  placeholder={selectedChallenge.submission_type === 'array' ? 'Comma-separated numbers' : 'Your answer'}
                />
              </div>
            ) : null}
            <div className="challenge-actions">
              <button type="submit" disabled={!selectedChallenge}>Evaluate</button>
              {result ? <p className="result-pill">Score: {result.score} - {result.feedback}</p> : null}
            </div>
          </form>

          <div className="surface-block">
            <div className="flashcard-head">
              <h4>Exam Flashcards</h4>
              <p>{visibleFlashcards.length ? `${flashcardIndex + 1}/${visibleFlashcards.length}` : '0/0'}</p>
            </div>
            {currentFlashcard ? (
              <button
                type="button"
                className={isFlipped ? 'flashcard compact-flashcard is-flipped' : 'flashcard compact-flashcard'}
                onClick={() => setIsFlipped((prev) => !prev)}
              >
                <div className="flashcard-face flashcard-front">
                  <p className="eyebrow">Question</p>
                  <p>{currentFlashcard.question}</p>
                </div>
                <div className="flashcard-face flashcard-back">
                  <p className="eyebrow">Answer</p>
                  <p>{currentFlashcard.answer}</p>
                </div>
              </button>
            ) : (
              <p>No flashcards for this topic.</p>
            )}
            <div className="flashcard-actions">
              <button type="button" className="secondary" onClick={prevFlashcard}>Previous</button>
              <button type="button" className="secondary" onClick={nextFlashcard}>Next</button>
            </div>
          </div>
        </section>

        <aside className="practice-column narrow-column">
          <div className="surface-block quick-play">
            <h4>Code Sprint</h4>
            <div className="quiz-grid">
              {visibleCodeSprint.map((item) => (
                <div className="quiz-item" key={item.question}>
                  <p>{item.question}</p>
                  <p className="quiz-answer">Answer: {item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
