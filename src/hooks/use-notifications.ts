import { useState, useCallback, useEffect } from 'react'
import { NotificationData } from '../lib/types'

export interface UseNotificationsOptions {
  fetchNotifications?: () => Promise<NotificationData[]>
  pollInterval?: number
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const { fetchNotifications, pollInterval = 60000 } = options
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const loadNotifications = useCallback(async () => {
    if (!fetchNotifications) return

    setLoading(true)
    setError(null)

    try {
      const data = await fetchNotifications()
      setNotifications(data)
      setUnreadCount(data.filter(n => !n.read).length)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [fetchNotifications])

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
    setUnreadCount(0)
  }, [])

  useEffect(() => {
    if (fetchNotifications) {
      loadNotifications()

      if (pollInterval > 0) {
        const interval = setInterval(loadNotifications, pollInterval)
        return () => clearInterval(interval)
      }
    }
  }, [fetchNotifications, pollInterval, loadNotifications])

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refresh: loadNotifications
  }
}