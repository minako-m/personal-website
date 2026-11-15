import { useRef, useState } from 'react'
import StanfordCharacter from './StanfordCharacter'
import RocketCharacter from './RocketCharacter'
import { matcha } from '../data/matcha'

// Coursework, one dropdown per group
const courseGroups = [
  {
    name: 'AI',
    courses: [
      ['CS 109', 'Introduction to Probability for Computer Scientists'],
      ['CS 124', 'From Languages to Information'],
      ['CS 205L', 'Continuous Mathematical Methods with an Emphasis on Machine Learning'],
      ['CS 224V', 'Agentic AI'],
      ['CS 229', 'Machine Learning'],
      ['DATASCI 112', 'Principles of Data Science'],
    ],
  },
  {
    name: 'Systems',
    courses: [
      ['CS 107', 'Computer Organization and Systems'],
      ['CS 111', 'Operating Systems Principles'],
      ['CS 112', 'Operating Systems Kernel Implementation Project'],
      ['CS 144', 'Computer Networking'],
      ['CS 155', 'Computer and Network Security'],
      ['EE 180', 'Digital Systems Architecture'],
    ],
  },
  {
    name: 'Other',
    courses: [
      ['CS 103', 'Mathematical Foundations of Computing'],
      ['CS 146S', 'The Modern Software Developer'],
      ['CS 161', 'Design and Analysis of Algorithms'],
      ['CS 193P', 'iOS Application Development'],
      ['ENGR 40M', 'An Intro to Making: What is EE'],
      ['MATH 51', 'Linear Algebra, Multivariable Calculus, and Modern Applications'],
    ],
  },
]

// A different matcha beside the degree and each class, fixed (not shuffled
// per visit): the degree gets the first, then the classes in listed order.
// All 19 icons, one each.
const EDU_MATCHA = [19, 4, 11, 2, 15, 8, 17, 5, 13, 1, 9, 16, 6, 12, 3, 18, 10, 14, 7]

// Where each group's classes start in EDU_MATCHA (after the degree's)
const groupOffsets = courseGroups.reduce(
  (offsets, group, i) => [...offsets, offsets[i] + group.courses.length], [1])

// One dropdown: the blue title row toggles a list that slides open and shut
function CourseGroup({ group, matchaOffset }) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const bodyId = `courses-${group.name.toLowerCase()}`

  const toggle = () => {
    // Closing a list you've scrolled down into would yank the page up under
    // you, so first bring its title row back into view
    if (open) {
      const top = headerRef.current.getBoundingClientRect().top
      if (top < 80) window.scrollBy({ top: top - 80, behavior: 'smooth' })
    }
    setOpen(o => !o)
  }

  return (
    <div className={`course-group ${open ? 'is-open' : ''}`}>
      <button
        ref={headerRef}
        type="button"
        className="course-group-header"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={toggle}
      >
        {group.name}
      </button>
      <div id={bodyId} className="course-group-body" inert={!open}>
        <ul className="course-list">
          {group.courses.map(([code, name], i) => (
            <li key={code}>
              <img src={matcha(EDU_MATCHA[matchaOffset + i])} alt="" className="course-matcha" />
              <span className="course-code">{code}</span>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

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
        {/* Both labels share one grid cell, so the button is always as wide
            as the longer one and swapping them doesn't resize the column */}
        <span aria-hidden={inSpace}>launch me to space</span>
        <span aria-hidden={!inSpace}>bring me back to campus!</span>
      </button>
      {/* A fixed-height stage (the rocket's height), so swapping characters
          doesn't change the card's height */}
      <div className="buddy-stage">
        {inSpace ? <RocketCharacter /> : <StanfordCharacter />}
      </div>
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-heading">Where I've studied</h2>
        <div className="education-card">
          <div>
            <div className="education-degree-row">
              <img src={matcha(EDU_MATCHA[0])} alt="" className="education-degree-matcha" />
              <h3 className="education-degree">Bachelor's degree, Computer Science</h3>
            </div>
            <p className="education-school">Stanford University</p>
            <div className="education-details">
              <span className="education-badge">📅 Sep 2023 – Jun 2027</span>
              <span className="education-badge">📍 Stanford, CA</span>
            </div>
            <p className="education-courses-label">Relevant Coursework</p>
            <div className="course-groups">
              {courseGroups.map((group, i) => (
                <CourseGroup key={group.name} group={group} matchaOffset={groupOffsets[i]} />
              ))}
            </div>
          </div>
          <CampusBuddy />
        </div>
      </div>
    </section>
  )
}
