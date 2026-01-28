export interface ProjectData {
  id: string
  title: string
  description: string
  image: string
  link: string
  type: 'live' | 'github' | 'chrome' | 'npm'
  tags: string[]
  lastUpdated: string
  youtubeId?: string  // YouTube video ID (e.g., "dQw4w9WgXcQ")
  youtubeIsShort?: boolean  // True if the video is a YouTube Short (vertical)
}

const projects: ProjectData[] = [
  // Projects with videos (top)
  {
    id: 'bugdrop',
    title: 'BugDrop',
    description: 'Open source visual feedback widget - screenshots to GitHub Issues',
    image: '/images/projects/bugdrop.svg',
    link: 'https://github.com/neonwatty/bugdrop',
    type: 'github',
    tags: ['Feedback', 'GitHub', 'Open Source', 'DevTools'],
    lastUpdated: '2026-01-18',
    youtubeId: 'VkLvP1xmRzo',
    youtubeIsShort: true
  },
  {
    id: 'ytgify',
    title: 'YTGify',
    description: 'Create GIFs from YouTube videos instantly with this Chrome Extension',
    image: '/images/projects/ytgify.svg',
    link: 'https://chromewebstore.google.com/detail/ytgify/dnljofakogbecppbkmnoffppkfdmpfje',
    type: 'chrome',
    tags: ['Chrome Extension', 'YouTube', 'GIF'],
    lastUpdated: '2026-01-18',
    youtubeId: '6DncOTcm_xE',
    youtubeIsShort: true
  },
  {
    id: 'bleep-that-sht',
    title: 'Bleep That Sht',
    description: 'Effortlessly bleep out words or phrases from audio and video',
    image: '/images/projects/bleep-that-sht.jpg',
    link: 'https://neonwatty.github.io/bleep-that-shit/',
    type: 'live',
    tags: ['Audio', 'Web App', 'Tools'],
    lastUpdated: '2025-07-15',
    youtubeId: 'yL_IA-bQ1d0',
    youtubeIsShort: true
  },
  {
    id: 'meme-search',
    title: 'Meme Search',
    description: 'The open source Meme Search Engine and Finder. Free and built to self-host',
    image: '/images/projects/meme-search.jpg',
    link: 'https://github.com/neonwatty/meme-search',
    type: 'github',
    tags: ['AI', 'Search', 'Web App'],
    lastUpdated: '2025-06-15',
    youtubeId: 'weL3IBHZpUs'
  },
  {
    id: 'mybodyscans',
    title: 'MyBodyScans',
    description: 'Organize Your InBody Scans With AI',
    image: '/images/projects/mybodyscans.jpg',
    link: 'https://mybodyscans.xyz/',
    type: 'live',
    tags: ['AI', 'Health', 'Web App'],
    lastUpdated: '2025-09-15',
    youtubeId: '6rj6Y4QZGGY',
    youtubeIsShort: true
  },
  {
    id: 'polarize',
    title: 'Polarize',
    description: 'Helps coders learn faster from YouTube tutorials',
    image: '/images/projects/polarize.png',
    link: 'https://github.com/neonwatty/polarize',
    type: 'github',
    tags: ['Education', 'YouTube', 'Open Source'],
    lastUpdated: '2025-05-20',
    youtubeId: '4GJ-CJ7CXxk'
  },
  // Projects without videos
  {
    id: 'qc',
    title: 'QC',
    description: 'Simple tools to engineer a stronger relationship. (proof of concept)',
    image: '/images/projects/qc-logo.svg',
    link: 'https://neonwatty.github.io/qc-app/',
    type: 'live',
    tags: ['Web App', 'Relationships', 'Tools'],
    lastUpdated: '2025-09-20'
  }
]

export function getProjectsData(): ProjectData[] {
  return projects
}

export function getProjectById(id: string): ProjectData | undefined {
  return projects.find(project => project.id === id)
}
