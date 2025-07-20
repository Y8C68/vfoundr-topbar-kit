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
      className={`relative p-2 rounded-lg hover:bg-slate-100 transition-colors ${className || ''}`}
      title="Notifications"
    >
      <Bell className="h-4 w-4 text-slate-600" />
      {hasNotifications && (
        <div className="absolute -top-1 -right-1 min-w-[0.5rem] h-2 bg-red-500 rounded-full flex items-center justify-center">
          {notificationCount && notificationCount > 0 && (
            <span className="text-[10px] text-white font-medium px-1">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </div>
      )}
    </button>
  )
}