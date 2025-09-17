import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser, useOrganization, useAuth } from '@y8c68/auth-kit'
import { Bell, Settings, ChevronDown } from 'lucide-react'
import { SearchBar } from '../Search/SearchBar'
import { NotificationBell } from '../Notifications/NotificationBell'
import { UserProfile } from '../UserProfile/UserProfile'
import { UserProfileModal } from '../UserProfile/UserProfileModal'
import { UserProfileDetailsModal, OrganizationModal, SubscriptionsModal } from '../UserProfile'
import { TopBarConfig, TopBarAction } from '../../lib/types'
// Inline keyframe styles for pulse animation
const pulseKeyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`

export interface TopBarProps {
  config?: TopBarConfig
  className?: string
}

export const TopBar: React.FC<TopBarProps> = ({ 
  config = {}, 
  className 
}) => {
  // Inject pulse keyframes into document head if not already present
  React.useEffect(() => {
    const styleId = 'topbar-kit-keyframes'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = pulseKeyframes
      document.head.appendChild(style)
    }
  }, [])
  const navigate = useNavigate()
  const { user, isLoaded: userLoaded } = useUser()
  const { organization, isLoaded: orgLoaded } = useOrganization()
  const { signOut } = useAuth()
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showProfileDetailsModal, setShowProfileDetailsModal] = useState(false)
  const [showOrganizationModal, setShowOrganizationModal] = useState(false)
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false)

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
    accountPath = '/account',
    profileComponents,
    organizationComponents,
    billingComponents,
    toast,
    enableDebugInfo,
    onPasswordChange,
    onTwoFactorManage
  } = config

  const handleSettingsClick = useCallback(() => {
    navigate(settingsPath)
  }, [navigate, settingsPath])

  const handleUserProfileClick = useCallback(() => {
    setShowProfileModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowProfileModal(false)
  }, [])

  const handleDefaultProfileClick = useCallback(() => {
    if (onProfileClick) {
      onProfileClick()
    } else if (profileComponents && toast) {
      // Use integrated modal if components are provided
      setShowProfileDetailsModal(true)
    } else {
      navigate(accountPath)
    }
  }, [onProfileClick, profileComponents, toast, navigate, accountPath])

  const handleDefaultOrganizationClick = useCallback(() => {
    if (onOrganizationClick) {
      onOrganizationClick()
    } else if (organizationComponents && toast) {
      // Use integrated modal if components are provided
      setShowOrganizationModal(true)
    } else {
      // Default organization action
      console.log('Organization clicked')
    }
  }, [onOrganizationClick, organizationComponents, toast])

  const handleDefaultSubscriptionsClick = useCallback(() => {
    if (onSubscriptionsClick) {
      onSubscriptionsClick()
    } else if (billingComponents && toast) {
      // Use integrated modal if components are provided
      setShowSubscriptionsModal(true)
    } else {
      // Default subscriptions action
      console.log('Subscriptions clicked')
    }
  }, [onSubscriptionsClick, billingComponents, toast])

  const handleDefaultSignOutClick = useCallback(async () => {
    if (onSignOutClick) {
      onSignOutClick()
    } else {
      // Use auth-kit's signOut
      await signOut()
    }
  }, [onSignOutClick, signOut])

  // Memoize user and organization data to prevent unnecessary re-renders
  const userData = useMemo(() => {
    if (!userLoaded || !user) return null
    return {
      id: user.id,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      fullName: user.fullName || undefined,
      email: user.primaryEmailAddress?.emailAddress,
      imageUrl: user.imageUrl || undefined
    }
  }, [userLoaded, user])

  const organizationData = useMemo(() => {
    if (!orgLoaded) return undefined
    if (!organization) return undefined
    return {
      id: organization.id,
      name: organization.name,
      slug: organization.slug || undefined
    }
  }, [orgLoaded, organization])

  // Don't render until both user and organization data are loaded
  if (!userLoaded || !orgLoaded) {
    return (
      <div 
        className={className}
        style={{
          height: '4rem',
          minHeight: '4rem',
          maxHeight: '4rem',
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          <div style={{
            height: '2rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.375rem',
            width: '24rem'
          }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
            <div style={{
              height: '2rem',
              width: '2rem',
              backgroundColor: '#e2e8f0',
              borderRadius: '50%'
            }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={className}
      style={{
        height: '4rem',
        minHeight: '4rem',
        maxHeight: '4rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Left: Universal Search */}
      {showSearch && (
        <div style={{ flex: '1 1 0%', maxWidth: 'calc(100% - 200px)', marginRight: '2rem' }}>
          <SearchBar 
            placeholder={searchPlaceholder}
            onSearch={onSearch}
          />
        </div>
      )}

      {/* Right: Actions & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Custom Actions */}
        {customActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
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
            title={action.label}
          >
            {action.icon}
            {action.badge && (
              <div style={{
                position: 'absolute',
                top: '-0.25rem',
                right: '-0.25rem',
                minWidth: '1rem',
                height: '1rem',
                paddingLeft: '0.25rem',
                paddingRight: '0.25rem',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '0.625rem',
                  color: 'white',
                  fontWeight: '500',
                  lineHeight: 1
                }}>
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
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s ease',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Settings"
          >
            <Settings style={{ height: '1.25rem', width: '1.25rem', color: '#475569' }} />
          </button>
        )}

        {/* Profile Dropdown */}
        {showUserProfile && userData && (
          <UserProfile
            user={userData}
            organization={organizationData}
            onClick={handleUserProfileClick}
          />
        )}
      </div>

      {/* User Profile Modal */}
      {showUserProfile && userData && (
        <UserProfileModal
          user={userData}
          organization={organizationData}
          isOpen={showProfileModal}
          onClose={handleCloseModal}
          onProfileClick={handleDefaultProfileClick}
          onOrganizationClick={handleDefaultOrganizationClick}
          onSubscriptionsClick={handleDefaultSubscriptionsClick}
          onSignOutClick={handleDefaultSignOutClick}
        />
      )}

      {/* Profile Details Modal */}
      {profileComponents && toast && (
        <UserProfileDetailsModal
          isOpen={showProfileDetailsModal}
          onClose={() => setShowProfileDetailsModal(false)}
          components={profileComponents}
          toast={toast}
          onPasswordChange={onPasswordChange}
          onTwoFactorManage={onTwoFactorManage}
        />
      )}

      {/* Organization Settings Modal */}
      {organizationComponents && toast && (
        <OrganizationModal
          isOpen={showOrganizationModal}
          onClose={() => setShowOrganizationModal(false)}
          components={organizationComponents}
          toast={toast}
          enableDebugInfo={enableDebugInfo}
        />
      )}

      {/* Subscriptions Modal */}
      {billingComponents && toast && (
        <SubscriptionsModal
          isOpen={showSubscriptionsModal}
          onClose={() => setShowSubscriptionsModal(false)}
          components={billingComponents}
          toast={toast}
        />
      )}
    </div>
  )
}