import { useState } from 'react'
import { ALL, filterByTag, getAllTags, projects } from '../data/projects'

const tags = [ALL, ...getAllTags(projects)]

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState(ALL)
  const visibleProjects = filterByTag(projects, selectedTag)

  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <p className="section-eyebrow">Projects</p>
        <h2 className="section-heading">Things I've built</h2>
        <div className="tag-filter" role="group" aria-label="Filter projects by tag">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag-filter-pill${tag === selectedTag ? ' active' : ''}`}
              aria-pressed={tag === selectedTag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {visibleProjects.map((project) => (
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
