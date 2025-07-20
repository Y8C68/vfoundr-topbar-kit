import React, { useState, useEffect } from 'react'
import { Search, Command } from 'lucide-react'
import { formatKeyboardShortcut } from '../../lib/utils'

export interface SearchBarProps {
  placeholder?: string
  defaultValue?: string
  onSearch?: (query: string) => void
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  defaultValue = '',
  onSearch,
  className
}) => {
  const [query, setQuery] = useState(defaultValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      const searchInput = document.getElementById('universal-search')
      searchInput?.focus()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          id="universal-search"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full min-w-[300px] max-w-[600px] pl-10 pr-16 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className || ''}`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 text-xs text-slate-400">
          <Command className="h-3 w-3" />
          <span>{formatKeyboardShortcut().replace(/[⌘]/g, '')}</span>
        </div>
      </div>
    </form>
  )
}