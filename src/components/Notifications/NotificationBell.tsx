import React, { useState } from 'react'
import { Bell } from 'lucide-react'

export interface NotificationBellProps {
  hasNotifications?: boolean
  notificationCount?: number
  onClick?: () => void
  className?: string
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  hasNotifications = true,
  notificationCount,
  onClick,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        position: 'relative',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        transition: 'background-color 0.2s ease',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      title="Notifications"
    >
      <Bell style={{ height: '1.25rem', width: '1.25rem', color: '#475569' }} />
      {hasNotifications && (
        <div style={{
          position: 'absolute',
          top: '-0.25rem',
          right: '-0.25rem',
          minWidth: '0.5rem',
          height: '0.5rem',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: notificationCount && notificationCount > 0 ? '0 0.25rem' : '0'
        }}>
          {notificationCount && notificationCount > 0 && (
            <span style={{
              fontSize: '0.625rem',
              color: 'white',
              fontWeight: '500',
              lineHeight: 1
            }}>
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </div>
      )}
    </button>
  )
}