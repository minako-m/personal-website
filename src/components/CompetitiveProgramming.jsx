import computer from '../assets/random-icons/computer-1.png'

const SKILLS = ['5 years', 'C++', 'Data structures & algorithms']

// The highlights, one card each. `badge` is the pill on top
// (`kind` picks its colour); `links` sit at the bottom of the card.
const HIGHLIGHTS = [
  {
    badge: 'Bronze medal',
    kind: 'bronze',
    title: 'EGOI 2021',
    detail: "European Girls' Olympiad in Informatics, representing Kazakhstan",
    links: [
      { label: 'My results', href: 'https://stats.egoi.org/people/118/' },
      { label: 'EGOI 2021 results', href: 'https://stats.egoi.org/editions/2021/results/' },
    ],
  },
  {
    badge: 'Silver medal',
    kind: 'silver',
    title: 'National Olympiad in Informatics',
    detail: 'Silver at the national olympiad',
  },
]

// Opened by clicking the computer on the Random tab's shelves
export default function CompetitiveProgramming({ onBack }) {
  return (
    <section id="competitive-programming" className="section">
      <div className="container">
        <button type="button" className="back-link" onClick={onBack}>
          ← back to Random
        </button>
        <div className="cp-heading">
          <img src={computer} alt="" className="cp-heading-icon" draggable={false} />
          <h2 className="section-heading">Competitive Programming</h2>
        </div>

        <div className="cp-intro">
          <p>
            I participated in competitive programming in high school for 5 years, which started
            the rest of my coding and software engineering journey. I mastered C++ and data
            structures &amp; algorithms.
          </p>
          <div className="tag-list">
            {SKILLS.map(skill => <span key={skill} className="tag">{skill}</span>)}
          </div>
        </div>

        <p className="education-courses-label">Highlights</p>
        <div className="cp-highlights">
          {HIGHLIGHTS.map(h => (
            <article key={h.title} className="cp-highlight">
              <span className={`cp-badge is-${h.kind}`}>{h.badge}</span>
              <h3 className="cp-highlight-title">{h.title}</h3>
              <p className="cp-highlight-detail">{h.detail}</p>
              {h.links && (
                <div className="cp-links">
                  {h.links.map(link => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="cp-shoutout">
          <div>
            <p className="cp-shoutout-label">Find me on Codeforces</p>
            <code className="cp-handle">Lumos</code>
          </div>
          <a
            className="cp-shoutout-button"
            href="https://codeforces.com/profile/Lumos"
            target="_blank"
            rel="noreferrer"
          >
            Visit profile ↗
          </a>
        </div>
      </div>
    </section>
  )
}
