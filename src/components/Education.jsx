import { useState } from 'react'
import StanfordCharacter from './StanfordCharacter'
import RocketCharacter from './RocketCharacter'

// Placeholder coursework from the template: replace with real courses
const courses = [
  'Data Structures & Algorithms',
  'Machine Learning',
  'Operating Systems',
  'Distributed Systems',
  'Computer Networks',
  'Database Systems',
]

// The card's right column: the cheering character, which a button swaps for
// her riding Hoover Tower to space (and back)
function CampusBuddy() {
  const [inSpace, setInSpace] = useState(false)
  return (
    <div className="education-buddy">
      <button
        type="button"
        className={`buddy-button ${inSpace ? 'is-return' : 'is-launch'}`}
        onClick={() => setInSpace(v => !v)}
      >
        {inSpace ? 'bring me back to campus!' : 'launch me to space'}
      </button>
      {inSpace ? <RocketCharacter /> : <StanfordCharacter />}
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <p className="section-eyebrow">Education</p>
        <h2 className="section-heading">Where I've studied</h2>
        <div className="education-card">
          <div>
            <h3 className="education-degree">Bachelor's degree, Computer Science</h3>
            <p className="education-school">Stanford University</p>
            <div className="education-details">
              <span className="education-badge">📅 Sep 2023 – Jun 2027</span>
              <span className="education-badge">📍 Stanford, CA</span>
            </div>
            <p className="education-courses-label">Relevant Coursework</p>
            <div className="tag-list">
              {courses.map((course) => (
                <span key={course} className="tag">{course}</span>
              ))}
            </div>
          </div>
          <CampusBuddy />
        </div>
      </div>
    </section>
  )
}
