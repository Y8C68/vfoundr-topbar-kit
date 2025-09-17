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
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <Search 
          style={{ 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            position: 'absolute',
            zIndex: 10,
            height: '1.25rem',
            width: '1.25rem',
            color: '#94a3b8'
          }} 
        />
        <input
          id="universal-search"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={className}
          style={{
            width: '100%',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            paddingLeft: '40px',
            paddingRight: '64px',
            border: '1px solid #cbd5e1',
            borderRadius: '0.5rem',
            outline: 'none',
            transition: 'all 0.2s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#cbd5e1';
            e.target.style.boxShadow = 'none';
          }}
        />
        <div 
          style={{
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            position: 'absolute',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: '#94a3b8'
          }}
        >
          <Command style={{ height: '1rem', width: '1rem' }} />
          <span>K</span>
        </div>
      </div>
    </form>
  )
}