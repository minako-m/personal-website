const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
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
        >
          Amira Mahmedjan
        </button>
        <ul className="navbar-links">
          {TABS.map(tab => (
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
