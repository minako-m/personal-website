import { useState } from 'react'
import SittingCharacter from './SittingCharacter'
import CodingCharacter from './CodingCharacter'
import TeachingCharacter from './TeachingCharacter'
import { matcha, randomMatcha } from '../data/matcha'

// Newest first. `team` and `bullets` are optional; `sitter: true` puts the
// pixel character on top of that card, `coder: true` puts the one with the
// laptop in its bottom-right corner.
const experiences = [
  {
    role: 'Android Engineer Intern',
    company: 'Uber Technologies Inc.',
    team: 'Booking Experience',
    location: 'San Francisco, CA',
    date: 'Jun – Aug 2026',
    bullets: [],
    tags: ['Java', 'Kotlin', 'Compose'],
    sitter: true,
  },
  {
    role: 'SWE Developer Foundations Intern',
    company: 'Apple Inc.',
    team: 'Cloud Testing',
    location: 'Cupertino, CA',
    date: 'Jun – Sept 2025',
    bullets: [
      'Telemetry analysis: Introduced metrics measuring performance of the testing platform, specifically in device utilization and availability. Identified opportunities in system design to optimize metrics.',
      'Resource optimization: Deployed configurable device pre-warming algorithm into production. Reduced traffic misses by 2 to 10 fold for specific device types without affecting waste.',
      'Event-based pre-warming: Implemented device provisioning triggered by event notifications affecting traffic.'
    ],
    tags: ['Swift', 'gRPC', 'OpenTelemetry', 'PostgreSQL'],
    coder: true,
  },
  {
    role: 'iOS Engineer Intern',
    company: 'Stanford Snyder Lab',
    location: 'Stanford, CA',
    date: 'Aug – Dec 2024',
    bullets: [
      'iOS Development: Developing an app that automates biomedical data collection from wearable Apple devices for clinical researches within Snyder Lab Wearipedia project. Integrating HealthKit and SwiftUI packages.',
      'Backend management: Using Firebase to offer cloud-based data management solutions for clinical researchers.',
    ],
    tags: ['Swift', 'SwiftUI', 'HealthKit', 'Firebase'],
  },
  {
    role: 'Research Intern, Data Science for Social Good',
    company: 'Stanford Data Science + Free to Feed',
    location: 'Stanford, CA',
    date: 'Jun – Aug 2024',
    bullets: [
      'LLMs: Utilized OpenAI API to clean & aggregate unstructured survey data (20 cols) on children’s food reactivity.',
      'Statistical Analysis: Utilized Python, data visualizations tools and statistical libraries to analyze key factors impacting children’s food reactivity, providing insights for improved dietary guidelines and interventions.',
    ],
    tags: ['Python', 'OpenAI API'],
  },
  {
    role: 'Research Scholar',
    company: 'Research Science Institute, MIT',
    location: 'Cambridge, MA',
    date: 'Jun – Aug 2022',
    bullets: [
      'Research: Under mentorship of Dr. Gil Alterovitz of Harvard Biomedical Cybernetics Lab. Research title: “Language and Virality Analysis in Building a Classification Model on COVID-19 Vaccine Misinformation Tweets”',
    ],
    tags: ['Python'],
  },
]

// Shown when the heading picker is on "taught". Same shape as `experiences`.
const teaching = [
  {
    role: 'Course Assistant',
    company: 'Stanford University School of Engineering',
    location: 'Stanford, CA',
    date: 'Sep 2026 – Present',
    bullets: [
      'CS 107: Computer Organization and Systems (cs107.stanford.edu)',
      'TA’d in Winter 2026 and Fall 2026',
      'Holding office hours & lab',
    ],
    tags: [],
  },
  {
    role: 'Course Assistant and Section Leader',
    company: 'Stanford University School of Engineering',
    location: 'Stanford, CA',
    date: 'Jan – Mar 2025',
    // TODO: the screenshot cut these lines off; replace with the full text
    bullets: [
      'Teaching section for 20 students within DATASCI …',
      'Covering topics such as data cleaning and visuali… ML.',
      'Holding office hours and grading assignment…',
    ],
    tags: [],
  },
]

const VIEWS = { worked: experiences, taught: teaching }

export default function Experience() {
  const [view, setView] = useState('worked')
  // A different matcha beside each title (across both lists), reshuffled every time the tab opens
  const [icons] = useState(() => randomMatcha(experiences.length + teaching.length))
  const cards = VIEWS[view]
  const iconOffset = view === 'worked' ? 0 : experiences.length

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-heading">
          Where I've{' '}
          {/* Segmented picker: a denim thumb slides behind the chosen word.
              On "taught", the teaching character stands just to its right. */}
          <span className="segmented-wrap">
            <span
              className="segmented"
              role="radiogroup"
              aria-label="Show where I've"
              style={{ '--selected': Object.keys(VIEWS).indexOf(view) }}
            >
              <span className="segmented-thumb" aria-hidden="true" />
              {Object.keys(VIEWS).map(word => (
                <button
                  key={word}
                  type="button"
                  role="radio"
                  aria-checked={view === word}
                  className={`segmented-option${view === word ? ' is-selected' : ''}`}
                  onClick={() => setView(word)}
                >
                  {word}
                </button>
              ))}
            </span>
            {view === 'taught' && <TeachingCharacter />}
          </span>
        </h2>
        <div className="experience-list">
          {cards.map((exp, i) => (
            <div
              key={`${view}-${i}`}
              className={`experience-card${exp.sitter ? ' has-sitter' : ''}`}
            >
              <div className="experience-header">
                <div className="experience-title">
                  <img src={matcha(icons[iconOffset + i])} alt="" className="experience-icon" />
                  <div>
                    <h3 className="experience-role">{exp.role}</h3>
                    <span className="experience-company">
                      {exp.company}{exp.team && ` · ${exp.team} team`}
                    </span>
                  </div>
                </div>
                {exp.sitter && (
                  <div className="sitter-gap">
                    <SittingCharacter />
                  </div>
                )}
                <div className="experience-when">
                  <span className="experience-date">{exp.date}</span>
                  <span className="experience-location">{exp.location}</span>
                </div>
              </div>
              {exp.bullets.length > 0 && (
                <ul className="experience-bullets">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
              <div className="experience-footer">
                <div className="tag-list">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                {exp.coder && <CodingCharacter />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
