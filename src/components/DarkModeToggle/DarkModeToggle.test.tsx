import { describe, it, expect, vi } from 'vitest'
import { render, screen, setup } from '@/test/test-utils'
import DarkModeToggle from './DarkModeToggle'
import { useDarkMode } from '@/hooks/useDarkMode'

// Mock the useDarkMode hook
vi.mock('@/hooks/useDarkMode')

const mockUseDarkMode = (overrides: Partial<ReturnType<typeof useDarkMode>> = {}) => {
  const value = {
    isDarkMode: false,
    toggleDarkMode: vi.fn(),
    resetToSystem: vi.fn(),
    isManual: false,
    ...overrides,
  }
  vi.mocked(useDarkMode).mockReturnValue(value)
  return value
}

describe('DarkModeToggle', () => {
  it('renders correctly in light mode', () => {
    mockUseDarkMode({ isDarkMode: false })

    render(<DarkModeToggle />)

    const button = screen.getByRole('button', { name: 'ダークモードに切り替え' })
    expect(button).toBeInTheDocument()
  })

  it('renders correctly in dark mode', () => {
    mockUseDarkMode({ isDarkMode: true })

    render(<DarkModeToggle />)

    const button = screen.getByRole('button', { name: 'ライトモードに切り替え' })
    expect(button).toBeInTheDocument()
  })

  it('calls toggleDarkMode when clicked', async () => {
    const { toggleDarkMode } = mockUseDarkMode({ isDarkMode: false })

    const { user } = setup(<DarkModeToggle />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(toggleDarkMode).toHaveBeenCalledTimes(1)
  })

  it('has correct toggle position in light mode', () => {
    mockUseDarkMode({ isDarkMode: false })

    render(<DarkModeToggle />)

    const toggleSpan = screen.getByRole('button').querySelector('span')
    expect(toggleSpan).toHaveClass('-translate-x-3')
  })

  it('has correct toggle position in dark mode', () => {
    mockUseDarkMode({ isDarkMode: true })

    render(<DarkModeToggle />)

    const toggleSpan = screen.getByRole('button').querySelector('span')
    expect(toggleSpan).toHaveClass('translate-x-3')
  })

  it('displays moon icon in light mode', () => {
    mockUseDarkMode({ isDarkMode: false })

    render(<DarkModeToggle />)

    // Moon icon has a specific path
    const moonPath = screen.getByRole('button').querySelector('path[d*="17.293 13.293"]')
    expect(moonPath).toBeInTheDocument()
  })

  it('displays sun icon in dark mode', () => {
    mockUseDarkMode({ isDarkMode: true })

    render(<DarkModeToggle />)

    // Sun icon has multiple paths, check for the main one
    const sunPath = screen.getByRole('button').querySelector('path[fill-rule="evenodd"]')
    expect(sunPath).toBeInTheDocument()
  })
})