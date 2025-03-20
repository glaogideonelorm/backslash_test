import type React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">BackSlash E-Commerce</Link>
      </div>
      <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  )
}

export default Navbar
