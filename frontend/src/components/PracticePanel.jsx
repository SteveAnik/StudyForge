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

const EDITOR_TEMPLATE = `function solve(input) {
  return input
}`

function parseOutput(value, type) {
  if (type === 'number') {
    return Number(value)
  }
  if (type === 'boolean') {
    return value.trim().toLowerCase() === 'true'
  }
  if (type === 'array') {
    return value
      .split(/,|\n/)
      .map((v) => Number(v.trim()))
      .filter((v) => !Number.isNaN(v))
  }
  return value
}

function outputPlaceholder(submissionType) {
  if (submissionType === 'array') return 'Use comma or newline separated values'
  if (submissionType === 'boolean') return 'true or false'
  if (submissionType === 'number') return 'Enter a number'
  return 'Enter output value'
}

export default function PracticePanel({ mode = 'challenge' }) {
  const [topic, setTopic] = useState('all')
  const {
    data: challenges = [],
    isLoading: isChallengeLoading,
    isError: challengeLoadError,
    error: challengeError,
    refetch: refetchChallenges
  } = usePracticeChallenges(topic === 'all' ? undefined : topic)
  const evaluate = useEvaluatePractice()
  const [selectedChallengeId, setSelectedChallengeId] = useState('')
  const [submittedOutput, setSubmittedOutput] = useState('')
  const [editorCode, setEditorCode] = useState(EDITOR_TEMPLATE)
  const [result, setResult] = useState(null)
  const [submitError, setSubmitError] = useState('')
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

  useEffect(() => {
    if (!challenges.length) {
      setSelectedChallengeId('')
      return
    }
    setSelectedChallengeId((prev) => {
      if (prev && challenges.some((challenge) => challenge.id === prev)) {
        return prev
      }
      return challenges[0].id
    })
    setSubmittedOutput('')
    setResult(null)
    setSubmitError('')
  }, [challenges])

  useEffect(() => {
    setFlashcardIndex(0)
    setIsFlipped(false)
  }, [topic])

  async function submitAttempt(e) {
    e.preventDefault()
    if (!selectedChallenge) {
      setSubmitError('Please select a challenge first.')
      setResult(null)
      return
    }
    setSubmitError('')
    try {
      const response = await evaluate.mutateAsync({
        challenge_id: selectedChallenge.id,
        submitted_output: parseOutput(submittedOutput, selectedChallenge.submission_type),
        duration_seconds: 30
      })
      setResult(response)
    } catch (error) {
      setResult(null)
      setSubmitError(error.message || 'Evaluation failed. Please try again.')
    }
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

  if (mode === 'flashcards') {
    return (
      <div className="panel-body focus-panel">
        <p className="eyebrow">Active Recall</p>
        <h3>Exam Flashcards</h3>
        <div className="surface-block">
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t === 'all' ? 'All Topics' : t}</option>
            ))}
          </select>
          <div className="flashcard-head">
            <h4>Flashcard Deck</h4>
            <p>{visibleFlashcards.length ? `${flashcardIndex + 1}/${visibleFlashcards.length}` : '0/0'}</p>
          </div>
          {currentFlashcard ? (
            <button
              type="button"
              className={isFlipped ? 'flashcard is-flipped' : 'flashcard'}
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
      </div>
    )
  }

  return (
    <div className="panel-body focus-panel">
      <p className="eyebrow">Focused practice mode</p>
      <h3>Challenge Lab</h3>
      <form onSubmit={submitAttempt} className="surface-block challenge-focused-layout">
        <div className="challenge-meta">
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t === 'all' ? 'All Topics' : t}</option>
            ))}
          </select>
          {isChallengeLoading ? <p>Loading challenges...</p> : null}
          {challengeLoadError ? <p className="error">{challengeError?.message || 'Failed to load challenges.'}</p> : null}
          <select value={selectedChallengeId} onChange={(e) => setSelectedChallengeId(e.target.value)} disabled={!challenges.length}>
            {challenges.map((challenge) => (
              <option key={challenge.id} value={challenge.id}>{challenge.title}</option>
            ))}
          </select>
          {!isChallengeLoading && !challengeLoadError && !challenges.length ? (
            <div className="challenge-preview">
              <p>No challenges found for this topic yet.</p>
              <button type="button" className="secondary" onClick={() => refetchChallenges()}>Reload Challenges</button>
            </div>
          ) : null}
          {selectedChallenge ? (
            <div className="challenge-preview">
              <p>{selectedChallenge.prompt}</p>
              <p><strong>Input payload:</strong> {JSON.stringify(selectedChallenge.input_payload)}</p>
              <p><strong>Expected output type:</strong> {selectedChallenge.submission_type}</p>
              <p><strong>Test cases:</strong> {selectedChallenge.test_cases.length}</p>
            </div>
          ) : null}
        </div>
        <div className="editor-shell">
          <label>Solution editor (draft area)</label>
          <textarea
            className="code-editor"
            value={editorCode}
            onChange={(e) => setEditorCode(e.target.value)}
            spellCheck={false}
          />
          <label>Output to evaluate</label>
          <textarea
            className="output-editor"
            value={submittedOutput}
            onChange={(e) => setSubmittedOutput(e.target.value)}
            placeholder={outputPlaceholder(selectedChallenge?.submission_type)}
            spellCheck={false}
          />
          <div className="challenge-actions">
            <button type="submit" disabled={!selectedChallenge || evaluate.isPending}>
              {evaluate.isPending ? 'Evaluating...' : 'Run Evaluation'}
            </button>
            {submitError ? <p className="error result-pill">{submitError}</p> : null}
            {result ? <p className="result-pill">Score: {result.score} - {result.feedback}</p> : null}
          </div>
        </div>
      </form>
    </div>
  )
}
