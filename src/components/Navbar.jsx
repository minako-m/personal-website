// Still of the character sipping matcha (character/drink-4, trimmed)
import logo from '../assets/navbar-logo.png'

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects', hidden: true },   // not ready yet: remove `hidden` to show it
  { id: 'education', label: 'Education' },
  { id: 'hobbies', label: 'Hobbies' },
]

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <button
          className="navbar-logo"
          onClick={() => onTabChange('home')}
          aria-label="Amira Mahmedjan, home"
        >
          <img src={logo} alt="" draggable={false} />
        </button>
        <ul className="navbar-links">
          {TABS.filter(tab => !tab.hidden).map(tab => (
            <li key={tab.id}>
              <button
                className={`navbar-tab${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
