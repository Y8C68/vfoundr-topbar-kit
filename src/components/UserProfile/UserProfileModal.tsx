import React, { useEffect, useRef } from 'react'
import { User, Building2, CreditCard, LogOut } from 'lucide-react'
import { UserData, OrganizationData } from '../../lib/types'

export interface UserProfileModalProps {
  user: UserData
  organization?: OrganizationData
  isOpen: boolean
  onClose: () => void
  onProfileClick?: () => void
  onOrganizationClick?: () => void
  onSubscriptionsClick?: () => void
  onSignOutClick?: () => void
  className?: string
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  organization,
  isOpen,
  onClose,
  onProfileClick,
  onOrganizationClick,
  onSubscriptionsClick,
  onSignOutClick,
  className
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const displayName = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim()

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-start justify-end pt-16 pr-6">
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl border border-slate-200 min-w-64 overflow-hidden ${className || ''}`}
      >
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
              {user.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt={displayName || 'User'} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-sm">
                  {displayName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {displayName || 'User'}
              </p>
              <p className="text-xs text-slate-600 truncate">
                {user.email || 'No email'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {organization?.name || 'Personal Account'}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="py-2">
          <button
            onClick={() => {
              onProfileClick?.()
              onClose()
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <User className="w-4 h-4 mr-3 text-slate-500" />
            Profile
          </button>

          <button
            onClick={() => {
              onOrganizationClick?.()
              onClose()
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Building2 className="w-4 h-4 mr-3 text-slate-500" />
            Organization
          </button>

          <button
            onClick={() => {
              onSubscriptionsClick?.()
              onClose()
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <CreditCard className="w-4 h-4 mr-3 text-slate-500" />
            Subscriptions
          </button>

          <div className="border-t border-slate-200 mt-2 pt-2">
            <button
              onClick={() => {
                onSignOutClick?.()
                onClose()
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3 text-red-500" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}