import { useState, useCallback, useEffect } from 'react'

export interface UseSearchOptions {
  defaultQuery?: string
  debounceDelay?: number
  onSearch?: (query: string) => void
}

export function useSearch(options: UseSearchOptions = {}) {
  const { defaultQuery = '', debounceDelay = 300, onSearch } = options
  const [query, setQuery] = useState(defaultQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
      if (query && onSearch) {
        onSearch(query)
      }
    }, debounceDelay)

    return () => clearTimeout(timer)
  }, [query, debounceDelay, onSearch])

  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery)
  }, [])

  const clearSearch = useCallback(() => {
    setQuery('')
    setDebouncedQuery('')
  }, [])

  return {
    query,
    debouncedQuery,
    setQuery: handleSearch,
    clearSearch
  }
}