export interface ProjectData {
  id: string
  title: string
  description: string
  image: string
  link: string
  type: 'live' | 'github' | 'chrome' | 'npm'
  tags: string[]
  lastUpdated: string
  displayOrder?: number
  youtubeId?: string // YouTube video ID (e.g., "dQw4w9WgXcQ")
  youtubeIsShort?: boolean // True if the video is a YouTube Short (vertical)
  beta?: boolean
}

const projects: ProjectData[] = [
  {
    id: 'seatify',
    title: 'Seatify',
    description: 'AI-powered seating optimization for weddings and corporate events',
    image: '/images/projects/seatify.svg',
    link: 'https://seatify.app',
    type: 'live',
    tags: ['AI', 'SaaS', 'Web App', 'iOS'],
    lastUpdated: '2026-06-03',
    displayOrder: 5,
  },
  {
    id: 'prbar',
    title: 'PRBar',
    description: 'Tiny macOS menu bar app for merged pull request activity',
    image: '/images/projects/prbar.svg',
    link: 'https://mean-weasel.github.io/prbar/',
    type: 'github',
    tags: ['macOS', 'GitHub', 'Swift', 'DevTools'],
    lastUpdated: '2026-06-04',
    displayOrder: 6,
  },
  {
    id: 'foil',
    title: 'Foil',
    description: 'Native macOS voice-to-paste with local and cloud transcription',
    image: '/images/projects/foil.svg',
    link: 'https://mean-weasel.github.io/foil/',
    type: 'github',
    tags: ['macOS', 'Voice', 'AI', 'Swift'],
    lastUpdated: '2026-06-03',
    displayOrder: 8,
  },
  {
    id: 'debtisfun',
    title: 'debtisfun',
    description: 'Interactive university debt and endowment explainer with shareable cards',
    image: '/images/projects/debtisfun.svg',
    link: 'https://debtisfun.com',
    type: 'live',
    tags: ['Data Viz', 'Education', 'Web App'],
    lastUpdated: '2026-06-03',
    displayOrder: 4,
  },
  {
    id: 'prcard',
    title: 'PRCard',
    description: 'Public proof cards for AI-native builder resumes and pull request history',
    image: '/images/projects/prcard.svg',
    link: 'https://prcard.app',
    type: 'live',
    tags: ['GitHub', 'Portfolio', 'Web App'],
    lastUpdated: '2026-06-03',
    displayOrder: 7,
  },
  {
    id: 'bugdrop',
    title: 'BugDrop',
    description: 'In-app feedback to GitHub Issues, with screenshots and annotations',
    image: '/images/projects/bugdrop.svg',
    link: 'https://github.com/mean-weasel/bugdrop',
    type: 'github',
    tags: ['Feedback', 'GitHub', 'Open Source', 'DevTools'],
    lastUpdated: '2026-06-01',
    displayOrder: 2,
    youtubeId: 'VkLvP1xmRzo',
    youtubeIsShort: true,
  },
  {
    id: 'bleep-that-sht',
    title: 'Bleep That Sht',
    description: 'Audio and video censorship tool with a polished Studio workflow',
    image: '/images/projects/bleep-that-sht.svg',
    link: 'https://bleepthat.sh',
    type: 'live',
    tags: ['Audio', 'Web App', 'Tools', 'SaaS'],
    lastUpdated: '2026-06-03',
    displayOrder: 1,
    youtubeId: 'yL_IA-bQ1d0',
    youtubeIsShort: true,
  },
  {
    id: 'ytgify',
    title: 'YTGify',
    description: 'Create GIFs from YouTube videos instantly with this Chrome Extension',
    image: '/images/projects/ytgify.svg',
    link: 'https://ytgify.com',
    type: 'live',
    tags: ['Chrome Extension', 'YouTube', 'GIF'],
    lastUpdated: '2026-01-18',
    displayOrder: 9,
    youtubeId: '6DncOTcm_xE',
    youtubeIsShort: true,
  },
  {
    id: 'meme-search',
    title: 'Meme Search',
    description: 'The open source Meme Search Engine and Finder. Free and built to self-host',
    image: '/images/projects/meme-search.jpg',
    link: 'https://github.com/neonwatty/meme-search',
    type: 'github',
    tags: ['AI', 'Search', 'Web App'],
    lastUpdated: '2026-05-31',
    displayOrder: 3,
    youtubeId: 'weL3IBHZpUs',
  },
]

export function getProjectsData(): ProjectData[] {
  return [...projects].sort((a, b) => {
    const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER
    const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER

    if (orderA !== orderB) {
      return orderA - orderB
    }

    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  })
}

export function getProjectById(id: string): ProjectData | undefined {
  return projects.find((project) => project.id === id)
}
