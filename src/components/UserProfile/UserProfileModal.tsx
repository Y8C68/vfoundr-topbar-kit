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
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(1px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingTop: '64px',
        paddingRight: '24px',
        pointerEvents: 'auto'
      }}
    >
      <div
        ref={modalRef}
        style={{
          position: 'relative',
          zIndex: 10000,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e2e8f0',
          minWidth: '320px',
          maxWidth: '384px',
          overflow: 'hidden',
          pointerEvents: 'auto',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          color: '#0f172a'
        }}
        className={className || ''}
      >
        {/* User Info Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              {user.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt={displayName || 'User'} 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <span style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  {displayName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div style={{
              flex: 1,
              minWidth: 0
            }}>
              <p style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#0f172a',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {displayName || 'User'}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#475569',
                margin: '4px 0 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {user.email || 'No email'}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: '2px 0 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {organization?.name || 'Personal Account'}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div style={{ padding: '12px 0' }}>
          <button
            onClick={() => {
              onProfileClick?.()
              onClose()
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              textAlign: 'left',
              fontFamily: 'inherit',
              outline: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <User style={{ width: '20px', height: '20px', marginRight: '16px', color: '#64748b' }} />
            Profile
          </button>

          <button
            onClick={() => {
              onOrganizationClick?.()
              onClose()
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              textAlign: 'left',
              fontFamily: 'inherit',
              outline: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Building2 style={{ width: '20px', height: '20px', marginRight: '16px', color: '#64748b' }} />
            Organization
          </button>

          <button
            onClick={() => {
              onSubscriptionsClick?.()
              onClose()
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              textAlign: 'left',
              fontFamily: 'inherit',
              outline: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <CreditCard style={{ width: '20px', height: '20px', marginRight: '16px', color: '#64748b' }} />
            Subscriptions
          </button>

          <div style={{
            borderTop: '1px solid #e2e8f0',
            marginTop: '12px',
            paddingTop: '12px'
          }}>
            <button
              onClick={() => {
                onSignOutClick?.()
                onClose()
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#dc2626',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                textAlign: 'left',
                fontFamily: 'inherit',
                outline: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <LogOut style={{ width: '20px', height: '20px', marginRight: '16px', color: '#ef4444' }} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}