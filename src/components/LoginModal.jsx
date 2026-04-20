import { useState, useEffect } from 'react'
import '../styles/LoginModal.css'

export default function LoginModal({ onLogin, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  /* Fermer avec Échap */
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 1400)
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel">
        {/* Bouton fermer */}
        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>

        {/* Déco circuit */}
        <div className="modal-circuit" />

        {/* Icône robot */}
        <div className="modal-robo-icon">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="20" width="32" height="28" rx="6" stroke="#D4A017" strokeWidth="1.5"/>
            <rect x="22" y="10" width="20" height="12" rx="4" stroke="#D4A017" strokeWidth="1.5"/>
            <line x1="32" y1="22" x2="32" y2="20" stroke="#D4A017" strokeWidth="1.5"/>
            <circle cx="24" cy="30" r="3.5" fill="#D4A017" opacity="0.85"/>
            <circle cx="40" cy="30" r="3.5" fill="#D4A017" opacity="0.85"/>
            <rect x="24" y="38" width="16" height="4" rx="2" stroke="#8a6510" strokeWidth="1.5"/>
            <line x1="12" y1="28" x2="16" y2="28" stroke="#D4A017" strokeWidth="1.5"/>
            <line x1="48" y1="28" x2="52" y2="28" stroke="#D4A017" strokeWidth="1.5"/>
            <line x1="24" y1="48" x2="24" y2="54" stroke="#D4A017" strokeWidth="1.5"/>
            <line x1="40" y1="48" x2="40" y2="54" stroke="#D4A017" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* En-tête */}
        <div className="modal-header">
          <h2>Bienvenue</h2>
          <p>Connectez-vous pour accéder au chat</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-form-group">
            <label className="modal-label">Identifiant</label>
            <div className="modal-input-wrap">
              <span className="modal-input-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5.5" r="2.5" stroke="#8a6510" strokeWidth="1.3"/>
                  <path d="M2.5 13.5C2.5 11 5 9 8 9s5.5 2 5.5 4.5" stroke="#8a6510" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                className="modal-input"
                type="text"
                placeholder="prenom.nom@ensi.tn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>
          </div>

          <div className="modal-form-group">
            <label className="modal-label">Mot de passe</label>
            <div className="modal-input-wrap">
              <span className="modal-input-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#8a6510" strokeWidth="1.3"/>
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="#8a6510" strokeWidth="1.3"/>
                  <circle cx="8" cy="10.5" r="1" fill="#8a6510"/>
                </svg>
              </span>
              <input
                className="modal-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="modal-options">
            <label className="modal-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Se souvenir de moi
            </label>
            <span className="modal-forgot">Mot de passe oublié ?</span>
          </div>

          <button
            type="submit"
            className={`modal-submit-btn${loading ? ' loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="btn-loader">
                <span /><span /><span />
              </span>
            ) : (
              'ACCÉDER AU SYSTÈME'
            )}
          </button>
        </form>

        <p className="modal-signup-row">
          Pas encore membre ?{' '}
          <a href="#register">Rejoindre l&apos;association</a>
        </p>
      </div>
    </div>
  )
}