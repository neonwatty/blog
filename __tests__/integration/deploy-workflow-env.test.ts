import fs from 'fs'
import path from 'path'

describe('deploy workflow Vercel environment', () => {
  it('pulls production Vercel env before building production', () => {
    const workflow = fs.readFileSync(path.join(process.cwd(), '.github/workflows/deploy.yml'), 'utf8')

    expect(workflow).toContain('vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}')
    expect(workflow).toContain('vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}')
  })
})
