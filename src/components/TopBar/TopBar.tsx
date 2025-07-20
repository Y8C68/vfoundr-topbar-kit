import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser, useOrganization } from '@clerk/clerk-react'
import { Bell, Settings, ChevronDown } from 'lucide-react'
import { SearchBar } from '../Search/SearchBar'
import { NotificationBell } from '../Notifications/NotificationBell'
import { UserProfile } from '../UserProfile/UserProfile'
import { UserProfileModal } from '../UserProfile/UserProfileModal'
import { TopBarConfig, TopBarAction } from '../../lib/types'
import { clsx } from 'clsx'

export interface TopBarProps {
  config?: TopBarConfig
  className?: string
}

export const TopBar: React.FC<TopBarProps> = ({ 
  config = {}, 
  className 
}) => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { organization } = useOrganization()
  const [showProfileModal, setShowProfileModal] = useState(false)

  const {
    showSearch = true,
    searchPlaceholder = 'Search contacts, companies, deals...',
    showNotifications = true,
    showSettings = true,
    showUserProfile = true,
    customActions = [],
    onSearch,
    onNotificationClick,
    onProfileClick,
    onOrganizationClick,
    onSubscriptionsClick,
    onSignOutClick,
    settingsPath = '/settings',
    accountPath = '/account'
  } = config

  const handleSettingsClick = () => {
    navigate(settingsPath)
  }

  const handleUserProfileClick = () => {
    setShowProfileModal(true)
  }

  const handleCloseModal = () => {
    setShowProfileModal(false)
  }

  const handleDefaultProfileClick = () => {
    if (onProfileClick) {
      onProfileClick()
    } else {
      navigate(accountPath)
    }
  }

  const handleDefaultOrganizationClick = () => {
    if (onOrganizationClick) {
      onOrganizationClick()
    } else {
      // Default organization action
      console.log('Organization clicked')
    }
  }

  const handleDefaultSubscriptionsClick = () => {
    if (onSubscriptionsClick) {
      onSubscriptionsClick()
    } else {
      // Default subscriptions action
      console.log('Subscriptions clicked')
    }
  }

  const handleDefaultSignOutClick = () => {
    if (onSignOutClick) {
      onSignOutClick()
    } else {
      // Default sign out action
      if ((window as any).Clerk) {
        (window as any).Clerk.signOut()
      }
    }
  }

  return (
    <div className={clsx(
      'h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6',
      className
    )}>
      {/* Left: Universal Search */}
      {showSearch && (
        <div className="flex-1 mr-8">
          <SearchBar 
            placeholder={searchPlaceholder}
            onSearch={onSearch}
          />
        </div>
      )}

      {/* Right: Actions & Profile */}
      <div className="flex items-center space-x-3">
        {/* Custom Actions */}
        {customActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title={action.label}
          >
            {action.icon}
            {action.badge && (
              <div className="absolute -top-1 -right-1 min-w-[1rem] h-4 px-1 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-medium">
                  {action.badge}
                </span>
              </div>
            )}
          </button>
        ))}

        {/* Notifications */}
        {showNotifications && (
          <NotificationBell onClick={onNotificationClick} />
        )}

        {/* Settings */}
        {showSettings && (
          <button
            onClick={handleSettingsClick}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4 text-slate-600" />
          </button>
        )}

        {/* Profile Dropdown */}
        {showUserProfile && user && (
          <UserProfile
            user={{
              id: user.id,
              firstName: user.firstName || undefined,
              lastName: user.lastName || undefined,
              fullName: user.fullName || undefined,
              email: user.primaryEmailAddress?.emailAddress,
              imageUrl: user.imageUrl || undefined
            }}
            organization={organization ? {
              id: organization.id,
              name: organization.name,
              slug: organization.slug || undefined
            } : undefined}
            onClick={handleUserProfileClick}
          />
        )}
      </div>

      {/* User Profile Modal */}
      {showUserProfile && user && (
        <UserProfileModal
          user={{
            id: user.id,
            firstName: user.firstName || undefined,
            lastName: user.lastName || undefined,
            fullName: user.fullName || undefined,
            email: user.primaryEmailAddress?.emailAddress,
            imageUrl: user.imageUrl || undefined
          }}
          organization={organization ? {
            id: organization.id,
            name: organization.name,
            slug: organization.slug || undefined
          } : undefined}
          isOpen={showProfileModal}
          onClose={handleCloseModal}
          onProfileClick={handleDefaultProfileClick}
          onOrganizationClick={handleDefaultOrganizationClick}
          onSubscriptionsClick={handleDefaultSubscriptionsClick}
          onSignOutClick={handleDefaultSignOutClick}
        />
      )}
    </div>
  )
}