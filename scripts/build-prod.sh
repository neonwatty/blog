#!/bin/bash
# Production build script that excludes dev-only admin routes

set -e

# Backup locations
ADMIN_DIR="app/admin"
ADMIN_API_DIR="app/api/admin"
BACKUP_DIR=".admin-backup"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Move admin pages out of the way
if [ -d "$ADMIN_DIR" ]; then
  echo "Moving admin pages out of build..."
  mv "$ADMIN_DIR" "$BACKUP_DIR/admin"
fi

# Move admin API routes out of the way
if [ -d "$ADMIN_API_DIR" ]; then
  echo "Moving admin API routes out of build..."
  mv "$ADMIN_API_DIR" "$BACKUP_DIR/api-admin"
fi

# Run the build
echo "Running production build..."
build_success=true
next build || build_success=false

# Restore admin pages
if [ -d "$BACKUP_DIR/admin" ]; then
  echo "Restoring admin pages..."
  mv "$BACKUP_DIR/admin" "$ADMIN_DIR"
fi

# Restore admin API routes
if [ -d "$BACKUP_DIR/api-admin" ]; then
  echo "Restoring admin API routes..."
  mv "$BACKUP_DIR/api-admin" "$ADMIN_API_DIR"
fi

# Clean up backup directory
rmdir "$BACKUP_DIR" 2>/dev/null || true

if [ "$build_success" = false ]; then
  echo "Build failed!"
  exit 1
fi

echo "Build complete!"
