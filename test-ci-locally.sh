#!/bin/bash
set -e

echo "🚀 Testing CI pipeline locally..."

echo "✅ Step 1: Install dependencies"
npm ci

echo "✅ Step 2: Run ESLint"
npm run lint

echo "✅ Step 3: Run TypeScript check"
npm run type-check

echo "✅ Step 4: Run unit tests"
npm run test:ci

echo "✅ Step 5: Install Playwright browsers"
npx playwright install --with-deps

echo "✅ Step 6: Build for E2E tests"
NEXT_PUBLIC_SITE_URL=http://localhost:3000 npm run build

echo "✅ Step 7: Run E2E tests"
CI=true npm run test:e2e

echo "🎉 All CI steps passed locally!"