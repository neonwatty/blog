/**
 * @jest-environment node
 */

import { POST } from '@/app/api/admin/images/route'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

jest.mock('fs')
const mockedFs = jest.mocked(fs)

describe('POST /api/admin/images', () => {
  const originalEnv = process.env.NODE_ENV

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', writable: true })
    mockedFs.existsSync.mockReturnValue(false)
    mockedFs.mkdirSync.mockReturnValue(undefined)
    mockedFs.writeFileSync.mockReturnValue(undefined)
  })

  function createRequest(file: File | null, slug: string | null) {
    const formData = new FormData()
    if (file) formData.append('file', file)
    if (slug) formData.append('slug', slug)

    return new NextRequest('http://localhost:3000/api/admin/images', {
      method: 'POST',
      body: formData,
    })
  }

  it('uploads a valid image', async () => {
    const file = new File(['fake-image-data'], 'test.png', { type: 'image/png' })
    const req = createRequest(file, 'my-post')
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.path).toBe('/images/posts/my-post/test.png')
    expect(mockedFs.writeFileSync).toHaveBeenCalled()
  })

  it('creates the image directory if it does not exist', async () => {
    mockedFs.existsSync.mockReturnValue(false)

    const file = new File(['data'], 'img.jpg', { type: 'image/jpeg' })
    const req = createRequest(file, 'new-post')
    await POST(req)

    expect(mockedFs.mkdirSync).toHaveBeenCalledWith(
      expect.stringContaining(path.join('public', 'images', 'posts', 'new-post')),
      { recursive: true },
    )
  })

  it('rejects non-image files', async () => {
    const file = new File(['data'], 'script.js', { type: 'application/javascript' })
    const req = createRequest(file, 'my-post')
    const res = await POST(req)

    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('Invalid file type')
  })

  it('rejects files over 5MB', async () => {
    const bigData = new Uint8Array(6 * 1024 * 1024)
    const file = new File([bigData], 'big.png', { type: 'image/png' })
    const req = createRequest(file, 'my-post')
    const res = await POST(req)

    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('5MB')
  })

  it('returns 400 when no file is provided', async () => {
    const req = createRequest(null, 'my-post')
    const res = await POST(req)

    expect(res.status).toBe(400)
  })

  it('returns 400 when no slug is provided', async () => {
    const file = new File(['data'], 'img.png', { type: 'image/png' })
    const req = createRequest(file, null)
    const res = await POST(req)

    expect(res.status).toBe(400)
  })

  it('returns 404 in production', async () => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true })

    const file = new File(['data'], 'img.png', { type: 'image/png' })
    const req = createRequest(file, 'my-post')
    const res = await POST(req)

    expect(res.status).toBe(404)
  })

  it('sanitizes filenames', async () => {
    const file = new File(['data'], 'My Image (1).png', { type: 'image/png' })
    const req = createRequest(file, 'my-post')
    const res = await POST(req)
    const data = await res.json()

    expect(data.path).toBe('/images/posts/my-post/my-image-1-.png')
  })
})
