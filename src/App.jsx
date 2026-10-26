import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Hobbies from './components/Hobbies'
import './App.css'

// Tabs drawn in the denim palette instead of matcha (see [data-theme] in index.css)
const DENIM_TABS = ['education', 'hobbies']

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    document.documentElement.dataset.theme = DENIM_TABS.includes(activeTab) ? 'denim' : 'matcha'
  }, [activeTab])

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === 'home' && <Hero />}
        {activeTab === 'experience' && <Experience />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'education' && <Education />}
        {activeTab === 'hobbies' && <Hobbies />}
      </main>
      <footer className="footer">
        <div className="container">
          <p>
            © 2025 Amira Mahmedjan · Built with{' '}
            <a href="https://react.dev" target="_blank" rel="noreferrer">React</a>
            {' '}&amp;{' '}
            <a href="https://vite.dev" target="_blank" rel="noreferrer">Vite</a>
          </p>
        </div>
      </footer>
    </>
  )
}
