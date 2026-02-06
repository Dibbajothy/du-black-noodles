import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Team from './pages/Team'
import Contests from './pages/Contests'
import Blog from './pages/Blog'
import NotFound from './pages/NotFound'
import logo from './assets/logo.png'
import Gallery from './pages/Gallery.jsx'
import Resources from './pages/Resources.jsx'
import Footer from './components/Footer.jsx'

const Nav = () => (
  <nav className="nav">
    <div className="nav-inner container">
      <NavLink to="/" className="brand">
        <img className="logo" src={logo} alt="logo" />
      </NavLink>
      <div className="spacer" />
      <NavLink to="/gallery" className="link">Gallery</NavLink>
      <NavLink to="/contests" className="link">Contests</NavLink>
      <NavLink to="/resources" className="link">Resources</NavLink>
      <NavLink to="/blog" className="link">Blog</NavLink>
      <NavLink to="/team" className="btn">Team</NavLink>
    </div>
  </nav>
)



export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
