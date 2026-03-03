/** @jest-environment node */
import fs from 'fs'
import path from 'path'
import os from 'os'

let tmpDir: string
const originalEnv = process.env.NODE_ENV

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-imgup-'))
  fs.mkdirSync(path.join(tmpDir, 'public', 'images', 'posts'), { recursive: true })
  Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', writable: true })
})

afterEach(() => {
  jest.restoreAllMocks()
  Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true })
  fs.rmSync(tmpDir, { recursive: true, force: true })
})

function loadRouteHandler(cwd: string) {
  let mod: { POST: typeof import('@/app/api/admin/images/route').POST }
  jest.spyOn(process, 'cwd').mockReturnValue(cwd)
  jest.isolateModules(() => {
    mod = require('@/app/api/admin/images/route')
  })
  return mod!
}

function createImageRequest(file: File | null, slug: string | null) {
  const { NextRequest } = require('next/server')
  const formData = new FormData()
  if (file) formData.append('file', file)
  if (slug) formData.append('slug', slug)

  return new NextRequest('http://localhost:3000/api/admin/images', {
    method: 'POST',
    body: formData,
  })
}

describe('Image upload integration', () => {
  it('writes a valid image to disk', async () => {
    const { POST } = loadRouteHandler(tmpDir)
    const imageData = Buffer.from('fake-png-data')
    const file = new File([imageData], 'hero.png', { type: 'image/png' })
    const req = createImageRequest(file, 'my-post')

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.path).toBe('/images/posts/my-post/hero.png')

    const writtenPath = path.join(tmpDir, 'public', 'images', 'posts', 'my-post', 'hero.png')
    expect(fs.existsSync(writtenPath)).toBe(true)
    expect(fs.readFileSync(writtenPath).toString()).toBe('fake-png-data')
  })

  it('creates per-post directory if missing', async () => {
    const { POST } = loadRouteHandler(tmpDir)
    const file = new File([Buffer.from('data')], 'img.jpg', { type: 'image/jpeg' })
    const req = createImageRequest(file, 'brand-new-post')

    await POST(req)

    const dirPath = path.join(tmpDir, 'public', 'images', 'posts', 'brand-new-post')
    expect(fs.existsSync(dirPath)).toBe(true)
  })

  it('sanitizes filenames', async () => {
    const { POST } = loadRouteHandler(tmpDir)
    const file = new File([Buffer.from('data')], 'Photo (1).PNG', { type: 'image/png' })
    const req = createImageRequest(file, 'my-post')

    const res = await POST(req)
    const data = await res.json()

    // "Photo (1).PNG" -> replace non-alnum with '-' -> "Photo--1-.PNG"
    // -> collapse '-+' -> "Photo-1-.PNG" -> lowercase -> "photo-1-.png"
    expect(data.path).toBe('/images/posts/my-post/photo-1-.png')

    const writtenPath = path.join(tmpDir, 'public', 'images', 'posts', 'my-post', 'photo-1-.png')
    expect(fs.existsSync(writtenPath)).toBe(true)
  })
})
