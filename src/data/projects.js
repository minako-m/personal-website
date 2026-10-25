export const projects = [
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

export const ALL = 'All'

export function getAllTags(projects) {
  return [...new Set(projects.flatMap((p) => p.tags))].sort()
}

export function filterByTag(projects, tag) {
  if (tag == null || tag === ALL) return projects
  const wanted = tag.toLowerCase()
  return projects.filter((p) => p.tags.some((t) => t.toLowerCase() === wanted))
}
