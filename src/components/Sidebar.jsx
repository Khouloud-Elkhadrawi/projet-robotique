import '../styles/Sidebar.css'

const NAV_LINKS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 4a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H6l-4 3V4z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Chat',
    page: 'chat',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 7a2 2 0 114 0c0 1.5-2 2-2 3.5"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="13" r="0.8" fill="currentColor" />
      </svg>
    ),
    label: 'Quiz',
    page: 'quiz',
  },
]

function Sidebar({ isOpen, onClose, activePage, isLoggedIn, onNavigate, onLogout }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar-grain" />

      <button className="sidebar-close" onClick={onClose} aria-label="Fermer">✕</button>

      {/* ── Logo & Titre ── */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-wrap">
          <div className="sidebar-logo-icon">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="30,4 56,52 4,52" fill="none" stroke="url(#goldGrad1)" strokeWidth="2.5" />
              <polygon points="30,14 48,48 12,48" fill="none" stroke="url(#goldGrad2)" strokeWidth="1.5" opacity="0.6" />
              <line x1="32" y1="38" x2="52" y2="38" stroke="#F0C040" strokeWidth="3" strokeLinecap="round" />
              <line x1="35" y1="44" x2="52" y2="44" stroke="#D4A017" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="goldGrad1" x1="0" y1="0" x2="60" y2="60">
                  <stop offset="0%" stopColor="#A0A0A0" />
                  <stop offset="100%" stopColor="#F0C040" />
                </linearGradient>
                <linearGradient id="goldGrad2" x1="60" y1="0" x2="0" y2="60">
                  <stop offset="0%" stopColor="#F0C040" />
                  <stop offset="100%" stopColor="#555" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <h1 className="sidebar-app-name">RoboChat</h1>
        <p className="sidebar-assoc-name">Association ENSI</p>
        <div className="sidebar-divider" />
      </div>

      {/* ── Navigation ── */}
      <nav className="sidebar-nav">
        <p className="sidebar-nav-label">Navigation</p>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                className={`sidebar-nav-link ${activePage === link.page ? 'sidebar-nav-link--active' : ''}`}
                onClick={() => {
                  onNavigate(link.page)
                  onClose()
                }}
              >
                <span className="nav-icon">{link.icon}</span>
                <span>{link.label}</span>
                {activePage === link.page && <span className="nav-active-dot" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Bouton Connexion / Déconnexion ── */}
      <div className="sidebar-auth">
        {isLoggedIn ? (
          <>
            <div className="sidebar-user-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5.5" r="2.5" stroke="#4ade80" strokeWidth="1.3"/>
                <path d="M2.5 13.5C2.5 11 5 9 8 9s5.5 2 5.5 4.5" stroke="#4ade80" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span>Connecté</span>
            </div>
            <button
              className="sidebar-nav-link sidebar-logout-btn"
              onClick={() => { onLogout(); onClose() }}
            >
              <span className="nav-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 16H3a1 1 0 01-1-1V3a1 1 0 011-1h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M12 13l4-4-4-4M16 9H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Déconnexion</span>
            </button>
          </>
        ) : (
          <button
            className="sidebar-nav-link sidebar-login-btn"
            onClick={() => { onNavigate('login'); onClose() }}
          >
            <span className="nav-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M3 15c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </span>
            <span>Connexion</span>
          </button>
        )}
      </div>

      {/* ── Statut ── */}
      <div className="sidebar-status">
        <div className="status-dot" />
        <span>RoboChat en ligne</span>
      </div>

      {/* ── Footer ── */}
      <div className="sidebar-footer">
        <p>© 2025 Association ENSI</p>
        <p>Tous droits réservés</p>
      </div>
    </aside>
  )
}

export default Sidebar