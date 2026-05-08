const projects = [
  {
    title: 'AlgoViz',
    description:
      'An interactive algorithm visualizer for sorting and graph traversal algorithms. Supports step-by-step animations and custom inputs to help students grasp algorithmic concepts.',
    tags: ['React', 'TypeScript', 'CSS Animations'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'NoteNest',
    description:
      'An AI-powered note-taking app that auto-summarizes lecture recordings and generates flashcards. Adopted by 200+ students at the university for exam preparation.',
    tags: ['Python', 'FastAPI', 'OpenAI API', 'React'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'CampusConnect',
    description:
      'A peer-to-peer marketplace for students to buy, sell, and trade textbooks and supplies. Features real-time chat, user ratings, and a recommendation engine.',
    tags: ['Node.js', 'React', 'PostgreSQL', 'WebSockets'],
    github: 'https://github.com',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <p className="section-eyebrow">Projects</p>
        <h2 className="section-heading">Things I've built</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.title} className="project-card">
              <div className="project-card-banner" />
              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-footer">
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
