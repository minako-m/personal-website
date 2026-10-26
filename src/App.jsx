import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Random from './components/Random'
import Hometown from './components/Hometown'
import './App.css'

// Tabs drawn in the denim palette instead of matcha (see [data-theme] in index.css)
const DENIM_TABS = ['education', 'random']

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  // Tab switch from inside a page (the Random tab's frames): starts at the top
  const openPage = (tab) => {
    setActiveTab(tab)
    window.scrollTo(0, 0)
  }

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
        {activeTab === 'random' && <Random onOpenHometown={() => openPage('hometown')} />}
        {activeTab === 'hometown' && <Hometown onBack={() => openPage('random')} />}
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
