import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import readingTime from 'reading-time'

const isServer = typeof window === 'undefined'
const projectUpdatesDirectory = isServer ? path.join(process.cwd(), 'project-updates') : ''

export interface ProjectUpdateData {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  projectId: string
  projectTitle?: string
  tags: string[]
  readingTime: string
}

export function getSortedProjectUpdates(): ProjectUpdateData[] {
  if (!isServer || !fs.existsSync(projectUpdatesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectUpdatesDirectory)
  const allUpdates = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(projectUpdatesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      const readingTimeStats = readingTime(matterResult.content)

      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        content: matterResult.content,
        projectId: matterResult.data.projectId,
        projectTitle: matterResult.data.projectTitle,
        tags: matterResult.data.tags || [],
        readingTime: readingTimeStats.text,
      }
    })

  return allUpdates.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllProjectUpdateIds() {
  if (!isServer || !fs.existsSync(projectUpdatesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectUpdatesDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => ({
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }))
}

export async function getProjectUpdateData(id: string): Promise<ProjectUpdateData | null> {
  if (!isServer || !fs.existsSync(projectUpdatesDirectory)) {
    return null
  }

  const fullPath = path.join(projectUpdatesDirectory, `${id}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrismPlus, {
      ignoreMissing: true,
      showLineNumbers: false,
      inline: false
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content)

  const contentHtml = processedContent.toString()
  const readingTimeStats = readingTime(matterResult.content)

  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.data.excerpt,
    content: contentHtml,
    projectId: matterResult.data.projectId,
    projectTitle: matterResult.data.projectTitle,
    tags: matterResult.data.tags || [],
    readingTime: readingTimeStats.text,
  }
}
