import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ChatBox from './components/ChatBox.jsx'
import QuizPage from './components/QuizPage'
import LoginModal from './components/LoginModal.jsx'
import './styles/App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState('chat')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <div className="app-layout">
      {/* Overlay mobile sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={page}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        onNavigate={(p) => {
          if (p === 'login') {
            setShowLoginModal(true)
          } else {
            setPage(p)
          }
          setSidebarOpen(false)
        }}
      />

      <main className="main-content">
        {page === 'chat' && (
          <ChatBox
            onMenuClick={() => setSidebarOpen(true)}
            isLoggedIn={isLoggedIn}
            onLoginRequest={() => setShowLoginModal(true)}
          />
        )}
        {page === 'quiz' && (
          <QuizPage onBack={() => setPage('chat')} />
        )}
      </main>

      {/* Modal de connexion — par-dessus tout */}
      {showLoginModal && (
        <LoginModal
          onLogin={() => {
            setIsLoggedIn(true)
            setShowLoginModal(false)
          }}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  )
}

export default App