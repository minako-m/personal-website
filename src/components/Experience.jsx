const experiences = [
  {
    role: 'Software Engineering Intern',
    company: 'Apple',
    date: 'Jun – Sept 2025',
    bullets: [
      'Scalable Cloud Testing, SWE Developer Foundations',
      'Telemetry analysis: Introduced metrics measuring performance of the testing platform, specifically in device utilization and availability. Identified opportunities in system design to optimize metrics.',
      'Resource optimization: Deployed configurable device pre-warming algorithm into production. Reduced traffic misses by 2 to 10 fold for specific device types without affecting waste.',
      'Event-based pre-warming: Implemented device provisioning triggered by event notifications affecting traffic.'
    ],
    tags: ['Swift', 'OpenTelemetry', 'gRPC', 'PostgreSQL'],
  },
  {
    role: 'Undergraduate Teaching Assistant',
    company: 'CS Department, University',
    date: 'Sep 2023 – May 2024',
    bullets: [
      'Led weekly office hours for Introduction to Algorithms, supporting 120+ students with course material.',
      'Designed and graded assignments and exams in collaboration with course instructors.',
      'Created supplementary study guides on dynamic programming and graph algorithms, shared with the full cohort.',
    ],
    tags: ['Algorithms', 'Python', 'Data Structures', 'Teaching'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="section-eyebrow">Work Experience</p>
        <h2 className="section-heading">Where I've worked</h2>
        <div className="experience-list">
          {experiences.map((exp) => (
            <div key={exp.role} className="experience-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-role">{exp.role}</h3>
                  <span className="experience-company">{exp.company}</span>
                </div>
                <span className="experience-date">{exp.date}</span>
              </div>
              <ul className="experience-bullets">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <div className="tag-list">
                {exp.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
