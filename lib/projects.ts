export interface ProjectData {
  id: string
  title: string
  description: string
  image: string
  link: string
  type: 'live' | 'github' | 'chrome' | 'npm'
  tags: string[]
  lastUpdated: string
}

const projects: ProjectData[] = [
  {
    id: 'ytgify',
    title: 'YTGify',
    description: 'Create GIFs from YouTube videos instantly with this Chrome Extension',
    image: '/images/projects/ytgify.svg',
    link: 'https://chromewebstore.google.com/detail/ytgify/dnljofakogbecppbkmnoffppkfdmpfje',
    type: 'chrome',
    tags: ['Chrome Extension', 'YouTube', 'GIF'],
    lastUpdated: '2025-09-26'
  },
  {
    id: 'qc',
    title: 'QC',
    description: 'Simple tools to engineer a stronger relationship. (proof of concept)',
    image: '/images/projects/qc-logo.svg',
    link: 'https://neonwatty.github.io/qc-app/',
    type: 'live',
    tags: ['Web App', 'Relationships', 'Tools'],
    lastUpdated: '2025-09-20'
  },
  {
    id: 'tfq',
    title: 'TFQ',
    description: 'Test Failure Queue - Claude Code powered test debugging without context overload',
    image: '/images/projects/npm-icon.svg',
    link: 'https://www.npmjs.com/package/tfq',
    type: 'npm',
    tags: ['CLI', 'Testing', 'Claude Code', 'DevTools'],
    lastUpdated: '2025-09-16'
  },
  {
    id: 'todoq',
    title: 'TodoQ',
    description: 'CLI task management for Claude Code without JSON overhead',
    image: '/images/projects/npm-icon.svg',
    link: 'https://www.npmjs.com/package/todoq',
    type: 'npm',
    tags: ['CLI', 'Task Management', 'Claude Code', 'Productivity'],
    lastUpdated: '2025-09-16'
  },
  {
    id: 'mybodyscans',
    title: 'MyBodyScans',
    description: 'Organize Your InBody Scans With AI',
    image: '/images/projects/mybodyscans.jpg',
    link: 'https://mybodyscans.xyz/',
    type: 'live',
    tags: ['AI', 'Health', 'Web App'],
    lastUpdated: '2025-09-15'
  },
  {
    id: 'bleep-that-sht',
    title: 'Bleep That Sht',
    description: 'Effortlessly bleep out words or phrases from audio and video',
    image: '/images/projects/bleep-that-sht.jpg',
    link: 'https://neonwatty.github.io/bleep-that-shit/',
    type: 'live',
    tags: ['Audio', 'Web App', 'Tools'],
    lastUpdated: '2025-07-15'
  },
  {
    id: 'meme-search',
    title: 'Meme Search',
    description: 'The open source Meme Search Engine and Finder. Free and built to self-host',
    image: '/images/projects/meme-search.jpg',
    link: 'https://github.com/neonwatty/meme-search',
    type: 'github',
    tags: ['AI', 'Search', 'Web App'],
    lastUpdated: '2025-06-15'
  },
  {
    id: 'polarize',
    title: 'Polarize',
    description: 'Helps coders learn faster from YouTube tutorials',
    image: '/images/projects/polarize.png',
    link: 'https://github.com/neonwatty/polarize',
    type: 'github',
    tags: ['Education', 'YouTube', 'Open Source'],
    lastUpdated: '2025-05-20'
  }
]

export function getProjectsData(): ProjectData[] {
  return projects
}

export function getProjectById(id: string): ProjectData | undefined {
  return projects.find(project => project.id === id)
}