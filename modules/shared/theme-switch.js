import React from 'react'
import { useTheme } from 'next-themes'

import { useHasMounted } from '@lib/helpers'
import Swatch from '@components/swatch'

const themes = [
  { title: 'Light Mode', name: 'light', color: { hex: '#f4f4f0' } },
  { title: 'Dark Mode', name: 'dark', color: { hex: '#000000' } },
  { title: 'Metal Mode', name: 'metal', color: { hex: '#8fff1f' } },
]

const ThemeSwitch = () => {
  const hasMounted = useHasMounted()
  const { theme, setTheme } = useTheme()

  // Client-only
  if (!hasMounted || !theme) return null

  // store our current and next theme objects
  const currentIndex = themes.findIndex((t) => t.name === theme) || 0

  const nextTheme = themes[(currentIndex + 1) % themes.length]
  const currentTheme = themes[currentIndex]

  return (
    <div className="theme-switch">
      <button
        className="theme-switch--toggle"
        onClick={() => setTheme(nextTheme.name)}
        aria-label={`Change theme to ${nextTheme.title}`}
      >
        <Swatch color={currentTheme.color} />
        <div className="theme-switch--label">{currentTheme.title}</div>
      </button>
    </div>
  )
}

export default ThemeSwitch
