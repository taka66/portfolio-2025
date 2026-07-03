import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { useDarkMode } from './useDarkMode'

// Same provider setup as production (src/components/Providers.tsx)
const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
)

type MediaQueryListener = (e: { matches: boolean; media: string }) => void

// next-themes resolves the "system" theme via matchMedia('(prefers-color-scheme: dark)')
// and subscribes with the legacy addListener API, so the mock supports both APIs
// and lets tests simulate a system preference change.
function mockSystemPreference(prefersDark: boolean) {
  const listeners: MediaQueryListener[] = []
  const remove = (listener: MediaQueryListener) => {
    const index = listeners.indexOf(listener)
    if (index >= 0) listeners.splice(index, 1)
  }
  let matches = prefersDark

  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return matches
    },
    media: query,
    onchange: null,
    addListener: (listener: MediaQueryListener) => listeners.push(listener),
    removeListener: remove,
    addEventListener: (_: string, listener: MediaQueryListener) => listeners.push(listener),
    removeEventListener: (_: string, listener: MediaQueryListener) => remove(listener),
    dispatchEvent: vi.fn(),
  }))

  return {
    change(nextPrefersDark: boolean) {
      matches = nextPrefersDark
      listeners.forEach((listener) =>
        listener({ matches: nextPrefersDark, media: '(prefers-color-scheme: dark)' })
      )
    },
  }
}

describe('useDarkMode', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark', 'light')
    mockSystemPreference(false)
  })

  it('follows the system preference (light) when no theme is stored', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper })

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.isManual).toBe(false)
  })

  it('follows the system preference (dark) when no theme is stored', () => {
    mockSystemPreference(true)

    const { result } = renderHook(() => useDarkMode(), { wrapper })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.isManual).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('initializes from a stored theme', () => {
    localStorage.setItem('theme', 'dark')

    const { result } = renderHook(() => useDarkMode(), { wrapper })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.isManual).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles between light and dark', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper })

    expect(result.current.isDarkMode).toBe(false)

    act(() => {
      result.current.toggleDarkMode()
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.isManual).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    act(() => {
      result.current.toggleDarkMode()
    })

    expect(result.current.isDarkMode).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('resets to the system preference', () => {
    localStorage.setItem('theme', 'dark')

    const { result } = renderHook(() => useDarkMode(), { wrapper })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.isManual).toBe(true)

    act(() => {
      result.current.resetToSystem()
    })

    expect(result.current.isDarkMode).toBe(false) // system prefers light
    expect(result.current.isManual).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('responds to system preference changes while following the system', () => {
    const systemPreference = mockSystemPreference(false)

    const { result } = renderHook(() => useDarkMode(), { wrapper })

    expect(result.current.isDarkMode).toBe(false)

    act(() => {
      systemPreference.change(true)
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.isManual).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('keeps the manual choice when the system preference changes', () => {
    const systemPreference = mockSystemPreference(false)

    const { result } = renderHook(() => useDarkMode(), { wrapper })

    act(() => {
      result.current.toggleDarkMode()
    })

    expect(result.current.isDarkMode).toBe(true)

    act(() => {
      systemPreference.change(false)
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.isManual).toBe(true)
  })
})
