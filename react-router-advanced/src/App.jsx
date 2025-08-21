import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import Nav from './components/Nav'

import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Profile from './components/Profile'
import ProfileDetails from './pages/ProfileDetails'
import ProfileSettings from './pages/ProfileSettings'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100svh', display: 'grid', placeItems: 'center', background: '#0b1220', color: '#e6ebff', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 900 }}>
          <BrowserRouter>
            <h1 style={{ textAlign: 'center', marginBottom: 16 }}>React Router Advanced</h1>
            <Nav />

            <div style={{ background: '#121c36', padding: 16, borderRadius: 12, border: '1px solid #22315a' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* Dynamic route */}
                <Route path="/posts/:postId" element={<Post />} />

                <Route path="/blog" element={<Blog />} />

                {/* Protected + Nested routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                >
                  <Route path="details" element={<ProfileDetails />} />
                  <Route path="settings" element={<ProfileSettings />} />
                </Route>

                <Route path="/login" element={<Login />} />

                {/* 404 */}
                <Route path="*" element={<div><h2>Not Found</h2><p>The page you requested does not exist.</p></div>} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </AuthProvider>
  )
}
