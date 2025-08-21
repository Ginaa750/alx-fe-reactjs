import { NavLink, Outlet } from 'react-router-dom'

export default function Profile() {
  const linkStyle = ({ isActive }) => ({
    padding: '6px 10px',
    borderRadius: 8,
    border: '1px solid #3a4a7a',
    background: isActive ? '#1e2a4a' : 'transparent',
    color: 'inherit',
    textDecoration: 'none',
    marginRight: 8,
  })

  return (
    <div>
      <h2>Profile</h2>
      <p>This page is protected. It also demonstrates nested routes:</p>

      <div style={{ margin: '10px 0' }}>
        <NavLink to="details" style={linkStyle}>Profile Details</NavLink>
        <NavLink to="settings" style={linkStyle}>Profile Settings</NavLink>
      </div>

      {/* Nested routes render here */}
      <div style={{ border: '1px solid #22315a', borderRadius: 12, padding: 12 }}>
        <Outlet />
      </div>
    </div>
  )
}
