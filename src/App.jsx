import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Random from './components/Random'
import Hometown from './components/Hometown'
import CompetitiveProgramming from './components/CompetitiveProgramming'
import './App.css'

// Pages not drawn in the default matcha palette (see [data-theme] in index.css)
const THEMES = { education: 'denim', random: 'denim', cp: 'butter' }

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  // Tab switch from inside a page (the Random tab's shelves): starts at the top
  const openPage = (tab) => {
    setActiveTab(tab)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    document.documentElement.dataset.theme = THEMES[activeTab] ?? 'matcha'
  }, [activeTab])

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === 'home' && <Hero />}
        {activeTab === 'experience' && <Experience />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'education' && <Education />}
        {activeTab === 'random' && <Random onOpen={openPage} />}
        {activeTab === 'hometown' && <Hometown onBack={() => openPage('random')} />}
        {activeTab === 'cp' && <CompetitiveProgramming onBack={() => openPage('random')} />}
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
