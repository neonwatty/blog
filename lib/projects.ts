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
    lastUpdated: '2026-02-23',
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
    link: 'https://bleep-that-sht.com',
    type: 'live',
    tags: ['Audio', 'Web App', 'Tools', 'SaaS'],
    lastUpdated: '2026-02-23',
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
    description: 'Simple tools to engineer a stronger relationship',
    image: '/images/projects/qc-logo.svg',
    link: 'https://tryqc.co',
    type: 'live',
    tags: ['Web App', 'Relationships', 'Tools', 'iOS'],
    lastUpdated: '2026-02-22'
  },
  {
    id: 'seatify',
    title: 'Seatify',
    description: 'AI-powered seating arrangement optimization for weddings and events',
    image: '/images/projects/seatify.svg',
    link: 'https://seatify.app',
    type: 'live',
    tags: ['AI', 'SaaS', 'Web App', 'iOS'],
    lastUpdated: '2026-02-23'
  },
  {
    id: 'bullhorn',
    title: 'Bullhorn',
    description: 'Schedule social media posts across Twitter, LinkedIn, and Reddit',
    image: '/images/projects/bullhorn.svg',
    link: 'https://social-scheduler-dusky.vercel.app',
    type: 'live',
    tags: ['Social Media', 'SaaS', 'Web App'],
    lastUpdated: '2026-02-21'
  },
  {
    id: 'linkparty',
    title: 'LinkParty',
    description: 'YouTube party queue app - share videos at parties without the chaos',
    image: '/images/projects/linkparty.svg',
    link: 'https://party-queue-two.vercel.app',
    type: 'live',
    tags: ['YouTube', 'Web App', 'Social'],
    lastUpdated: '2026-02-20'
  }
]

export function getProjectsData(): ProjectData[] {
  return projects
}

export function getProjectById(id: string): ProjectData | undefined {
  return projects.find(project => project.id === id)
}
