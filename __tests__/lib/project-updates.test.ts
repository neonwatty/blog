/**
 * @jest-environment node
 */
import fs from 'fs'

jest.mock('fs')
jest.mock('reading-time', () => ({
  __esModule: true,
  default: jest.fn(() => ({ text: '2 min read', minutes: 2 })),
}))

const mockProcess = jest.fn().mockResolvedValue({ toString: () => '<p>Update HTML</p>' })
const mockUse = jest.fn().mockReturnThis()
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: mockUse,
    process: mockProcess,
  })),
}))
jest.mock('remark-rehype', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('rehype-prism-plus', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('rehype-raw', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('rehype-stringify', () => ({ __esModule: true, default: jest.fn() }))

jest.mock('gray-matter', () => {
  return jest.fn((content: string) => {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!match) return { data: {}, content }
    const frontmatter = match[1]
    const body = match[2]
    const data: Record<string, unknown> = {}
    frontmatter.split('\n').forEach((line: string) => {
      const [key, ...rest] = line.split(': ')
      const value = rest.join(': ').trim()
      if (key && value) {
        if (value.startsWith('[') && value.endsWith(']')) {
          data[key.trim()] = value
            .slice(1, -1)
            .split(',')
            .map((s: string) => s.trim().replace(/['"]/g, ''))
        } else {
          data[key.trim()] = value.replace(/['"]/g, '')
        }
      }
    })
    return { data, content: body }
  })
})

const mockedFs = jest.mocked(fs)

function createMockUpdate(overrides: Record<string, string> = {}) {
  const defaults = {
    title: 'Update Title',
    date: '2025-02-01',
    excerpt: 'Update excerpt',
    projectId: 'my-project',
    projectTitle: 'My Project',
    tags: "['update', 'feature']",
  }
  const merged = { ...defaults, ...overrides }
  const frontmatter = Object.entries(merged)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  return `---\n${frontmatter}\n---\nUpdate content`
}

describe('lib/project-updates', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getSortedProjectUpdates', () => {
    it('returns updates sorted by date descending', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['old.md', 'new.md'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath)
        if (p.includes('old')) return createMockUpdate({ date: '2025-01-01' })
        if (p.includes('new')) return createMockUpdate({ date: '2025-02-01' })
        return ''
      })

      const { getSortedProjectUpdates } = require('@/lib/project-updates')
      const updates = getSortedProjectUpdates()

      expect(updates).toHaveLength(2)
      expect(updates[0].date).toBe('2025-02-01')
    })

    it('returns empty array when directory does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false)

      const { getSortedProjectUpdates } = require('@/lib/project-updates')
      expect(getSortedProjectUpdates()).toEqual([])
    })

    it('filters out non-markdown files', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['update.md', 'readme.txt'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockReturnValue(createMockUpdate())

      const { getSortedProjectUpdates } = require('@/lib/project-updates')
      expect(getSortedProjectUpdates()).toHaveLength(1)
    })

    it('defaults tags to empty array when not provided', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['update.md'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockReturnValue(
        '---\ntitle: No Tags\ndate: 2025-01-01\nexcerpt: Exc\nprojectId: proj\n---\nContent',
      )

      const { getSortedProjectUpdates } = require('@/lib/project-updates')
      const updates = getSortedProjectUpdates()
      expect(updates[0].tags).toEqual([])
    })
  })

  describe('getAllProjectUpdateIds', () => {
    it('returns params objects for each update', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['update-1.md', 'update-2.md'] as unknown as ReturnType<
        typeof fs.readdirSync
      >)

      const { getAllProjectUpdateIds } = require('@/lib/project-updates')
      const ids = getAllProjectUpdateIds()

      expect(ids).toEqual([{ params: { id: 'update-1' } }, { params: { id: 'update-2' } }])
    })

    it('returns empty array when directory does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false)

      const { getAllProjectUpdateIds } = require('@/lib/project-updates')
      expect(getAllProjectUpdateIds()).toEqual([])
    })
  })

  describe('getProjectUpdateData', () => {
    it('returns processed update data', async () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readFileSync.mockReturnValue(createMockUpdate({ title: 'My Update' }))

      const { getProjectUpdateData } = require('@/lib/project-updates')
      const update = await getProjectUpdateData('my-update')

      expect(update).not.toBeNull()
      expect(update.id).toBe('my-update')
      expect(update.title).toBe('My Update')
      expect(update.content).toContain('Update HTML')
    })

    it('returns null when file does not exist', async () => {
      mockedFs.existsSync.mockImplementation((p: fs.PathLike) => !String(p).endsWith('.md'))

      const { getProjectUpdateData } = require('@/lib/project-updates')
      const update = await getProjectUpdateData('nonexistent')

      expect(update).toBeNull()
    })

    it('returns null when directory does not exist', async () => {
      mockedFs.existsSync.mockReturnValue(false)

      const { getProjectUpdateData } = require('@/lib/project-updates')
      expect(await getProjectUpdateData('any')).toBeNull()
    })
  })
})
