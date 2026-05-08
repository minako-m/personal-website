const courses = [
  'Data Structures & Algorithms',
  'Machine Learning',
  'Operating Systems',
  'Distributed Systems',
  'Computer Networks',
  'Database Systems',
]

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <p className="section-eyebrow">Education</p>
        <h2 className="section-heading">Where I've studied</h2>
        <div className="education-card">
          <div>
            <h3 className="education-degree">Bachelor of Science in Computer Science</h3>
            <p className="education-school">University of Technology</p>
            <div className="education-details">
              <span className="education-badge">📅 2021 – 2025</span>
              <span className="education-badge">📍 Your City</span>
            </div>
            <p className="education-courses-label">Relevant Coursework</p>
            <div className="tag-list">
              {courses.map((course) => (
                <span key={course} className="tag">{course}</span>
              ))}
            </div>
          </div>
          <div className="education-gpa">
            <span className="education-gpa-value">3.8</span>
            <span className="education-gpa-label">GPA / 4.0</span>
          </div>
        </div>
      </div>
    </section>
  )
}
