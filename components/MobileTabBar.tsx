'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
  BoltIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  RocketLaunchIcon as RocketLaunchIconSolid,
  BoltIcon as BoltIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, activeIcon: HomeIconSolid },
  { name: 'Posts', href: '/posts', icon: DocumentTextIcon, activeIcon: DocumentTextIconSolid },
  { name: 'Projects', href: '/projects', icon: RocketLaunchIcon, activeIcon: RocketLaunchIconSolid },
  { name: 'Updates', href: '/project-updates', icon: BoltIcon, activeIcon: BoltIconSolid },
  { name: 'About', href: '/about', icon: UserIcon, activeIcon: UserIconSolid },
]

export default function MobileTabBar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'var(--gradient-elevated)',
        borderTop: '1px solid var(--color-border-primary)',
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-[49px]">
        {navigation.map((item) => {
          const active = isActive(item.href)
          const Icon = active ? item.activeIcon : item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full transition-all duration-200"
              style={{
                color: active ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
              }}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="w-6 h-6 mb-0.5" />
              <span
                className="text-[10px] font-medium leading-tight"
                style={{
                  color: active ? 'var(--color-accent-primary)' : 'var(--color-text-tertiary)',
                }}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
