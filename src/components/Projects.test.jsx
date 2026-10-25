import { afterEach, describe, it, expect } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Projects from './Projects'
import { projects } from '../data/projects'

afterEach(cleanup)

const cardTitles = () =>
  screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)

describe('Projects', () => {
  it('shows every card at first', () => {
    render(<Projects />)
    expect(cardTitles()).toEqual(projects.map((p) => p.title))
  })

  it('shows only matching cards after clicking "Python"', () => {
    render(<Projects />)
    fireEvent.click(screen.getByRole('button', { name: 'Python' }))
    const expected = projects
      .filter((p) => p.tags.includes('Python'))
      .map((p) => p.title)
    expect(expected.length).toBeGreaterThan(0)
    expect(expected.length).toBeLessThan(projects.length)
    expect(cardTitles()).toEqual(expected)
  })
})
