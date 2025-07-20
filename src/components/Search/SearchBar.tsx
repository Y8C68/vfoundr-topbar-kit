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
        <Search 
          className="absolute h-4 w-4 text-slate-400" 
          style={{ 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            position: 'absolute',
            zIndex: 10
          }} 
        />
        <input
          id="universal-search"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full min-w-[300px] max-w-[600px] py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className || ''}`}
          style={{
            paddingLeft: '40px',
            paddingRight: '64px'
          }}
        />
        <div 
          className="absolute flex items-center space-x-1 text-xs text-slate-400"
          style={{
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            position: 'absolute',
            zIndex: 10
          }}
        >
          <Command className="h-3 w-3" />
          <span>K</span>
        </div>
      </div>
    </form>
  )
}