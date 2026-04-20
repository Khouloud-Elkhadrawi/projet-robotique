import { useState, useCallback } from 'react'
import '../styles/QuizPage.css'


const QUESTIONS = [
  {
    q: 'Quel microcontrôleur est au cœur de la plupart des robots éducatifs Arduino Uno ?',
    opts: ['ATmega328P', 'ARM Cortex-M4', 'Raspberry Pi 4', 'ESP8266'],
    correct: 0,
    explanation: 'L\'ATmega328P d\'Atmel est le MCU 8-bit qui équipe l\'Arduino Uno, cadencé à 16 MHz avec 32 KB de flash.',
  },
  {
    q: 'Quel capteur permet à un robot de mesurer son orientation et sa rotation en 3D ?',
    opts: ['Capteur ultrason HC-SR04', 'IMU (gyroscope + accéléromètre)', 'Capteur infrarouge', 'Encodeur rotatif'],
    correct: 1,
    explanation: 'Une IMU (Inertial Measurement Unit) combine gyroscope et accéléromètre pour mesurer orientation, vitesse angulaire et accélération sur 3 axes.',
  },
  {
    q: 'Quel protocole est utilisé pour la communication sans fil courte portée entre deux robots ?',
    opts: ['HTTP / REST', 'CAN Bus', 'Bluetooth / ZigBee', 'UART série RS-232'],
    correct: 2,
    explanation: 'Bluetooth (classique ou BLE) et ZigBee sont les protocoles RF les plus courants pour la communication inter-robots à courte portée.',
  },
  {
    q: 'Dans ROS (Robot Operating System), comment s\'appelle le mécanisme de communication entre nœuds ?',
    opts: ['Thread pool partagé', 'Publish / Subscribe (Topics)', 'Appel TCP direct', 'Polling en boucle'],
    correct: 1,
    explanation: 'ROS repose sur un modèle Publish/Subscribe : les nœuds publient sur des Topics et d\'autres nœuds y souscrivent de manière asynchrone.',
  },
  {
    q: 'Quelle technique permet à un robot de se localiser dans un environnement totalement inconnu ?',
    opts: ['Régulateur PID', 'Apprentissage supervisé', 'SLAM (Simultaneous Localization and Mapping)', 'Cinématique inverse'],
    correct: 2,
    explanation: 'Le SLAM permet au robot de construire une carte de son environnement tout en estimant sa propre position en temps réel.',
  },
]

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null) // index chosen
  const [showResult, setShowResult] = useState(false)
  const [done, setDone] = useState(false)

  const q = QUESTIONS[current]
  const progress = Math.round((current / QUESTIONS.length) * 100)
  const isCorrect = selected === q.correct
  const isLast = current === QUESTIONS.length - 1

  const handleSelect = useCallback(
    (idx) => {
      if (selected !== null) return
      setSelected(idx)
      if (idx === q.correct) setScore((s) => s + 1)
    },
    [selected, q.correct]
  )

  const handleNext = () => {
    if (isLast) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setDone(false)
    setShowResult(false)
  }

  const finalPct = Math.round((score / QUESTIONS.length) * 100)
  const resultMsg =
    finalPct === 100
      ? 'Parfait ! Tu maîtrises la robotique comme un ingénieur confirmé.'
      : finalPct >= 60
      ? 'Bon score ! Continue à explorer les systèmes embarqués et la mécatronique.'
      : "Continue à apprendre ! L'association ENSI est là pour t'accompagner."

  return (
    <div className="quiz-page">
      {/* Header */}
      <div className="quiz-header">
        <div className="quiz-title">
          Quiz Robotique
          <span>NIVEAU INTERMÉDIAIRE</span>
        </div>

        <div className="quiz-progress-wrap">
          <div className="progress-meta">
            <span>
              {done ? 'Terminé' : `Question ${current + 1} / ${QUESTIONS.length}`}
            </span>
            <span>{done ? finalPct : progress}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${done ? finalPct : progress}%` }}
            />
          </div>
        </div>

        <div className="quiz-score-badge">
          <div className="score-num">{score}</div>
          <div className="score-label">SCORE</div>
        </div>
      </div>

      {/* Results screen */}
      {done ? (
        <div className="results-screen">
          <div className="result-trophy">
            {finalPct === 100 ? '🏆' : finalPct >= 60 ? '🤖' : '📚'}
          </div>
          <div className="result-score">
            {score} / {QUESTIONS.length}
          </div>
          <div className="result-label">Score Final</div>
          <div className="result-pct">{finalPct}%</div>
          <p className="result-msg">{resultMsg}</p>

          {/* Breakdown */}
          <div className="result-breakdown">
            {QUESTIONS.map((qItem, i) => {
              const wasCorrect = i < current + 1
              return (
                <div key={i} className={`breakdown-item ${wasCorrect ? 'ok' : 'ko'}`}>
                  <span className="breakdown-dot" />
                  <span>{i + 1}</span>
                </div>
              )
            })}
          </div>

          <button className="restart-btn" onClick={handleRestart}>
            RECOMMENCER
          </button>
        </div>
      ) : (
        /* Question */
        <div className="quiz-main">
          <div className="question-card">
            <div className="q-number">
              Question {String(current + 1).padStart(2, '0')}
            </div>
            <p className="question-text">{q.q}</p>

            <div className="options-grid">
              {q.opts.map((opt, i) => {
                let state = ''
                if (selected !== null) {
                  if (i === q.correct) state = 'correct'
                  else if (i === selected) state = 'wrong'
                  else state = 'dim'
                }
                return (
                  <button
                    key={i}
                    className={`option-btn ${state}`}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                  >
                    <span className="option-letter">{LETTERS[i]}</span>
                    <span className="option-text">{opt}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Feedback */}
          {selected !== null && (
            <div className={`feedback-bar ${isCorrect ? 'correct' : 'wrong'}`}>
              <span className="fb-icon">{isCorrect ? '✓' : '✗'}</span>
              {isCorrect
                ? `Bonne réponse ! ${q.explanation}`
                : `Mauvaise réponse. ${q.explanation}`}
            </div>
          )}

          {/* Footer */}
          <div className="quiz-footer">
            <div className="q-dots">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`q-dot ${i < current ? 'done' : ''} ${
                    i === current ? 'current' : ''
                  }`}
                />
              ))}
            </div>

            <button
              className="next-btn"
              onClick={handleNext}
              disabled={selected === null}
            >
              {isLast ? 'Voir les résultats' : 'Suivant'}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
