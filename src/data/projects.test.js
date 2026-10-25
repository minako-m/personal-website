import { describe, it, expect } from 'vitest'
import { filterByTag, getAllTags } from './projects'

const sample = [
  { title: 'A', tags: ['React', 'Python'] },
  { title: 'B', tags: ['Go', 'React'] },
  { title: 'C', tags: ['CSS'] },
]

describe('getAllTags', () => {
  it('removes duplicates and sorts', () => {
    expect(getAllTags(sample)).toEqual(['CSS', 'Go', 'Python', 'React'])
  })
})

describe('filterByTag', () => {
  it('returns every project for "All" or null', () => {
    expect(filterByTag(sample, 'All')).toEqual(sample)
    expect(filterByTag(sample, null)).toEqual(sample)
  })

  it('returns every project sharing a tag', () => {
    expect(filterByTag(sample, 'React').map((p) => p.title)).toEqual(['A', 'B'])
  })

  it('returns nothing for a tag nobody uses', () => {
    expect(filterByTag(sample, 'Rust')).toEqual([])
  })

  it('matches tags case-insensitively', () => {
    expect(filterByTag(sample, 'react').map((p) => p.title)).toEqual(['A', 'B'])
  })
})
