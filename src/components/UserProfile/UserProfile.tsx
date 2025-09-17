import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { UserData, OrganizationData } from '../../lib/types'
import { getInitials } from '../../lib/utils'

export interface UserProfileProps {
  user: UserData
  organization?: OrganizationData
  onClick?: () => void
  showDropdownIcon?: boolean
  className?: string
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  organization,
  onClick,
  showDropdownIcon = true,
  className
}) => {
  const displayName = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim()
  const initials = getInitials(displayName)
  const [showDetails, setShowDetails] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setShowDetails(window.innerWidth >= 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        transition: 'background-color 0.2s ease',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div style={{
        width: '2rem',
        height: '2rem',
        minWidth: '2rem',
        minHeight: '2rem',
        maxWidth: '2rem',
        maxHeight: '2rem',
        backgroundImage: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
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
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <span style={{
            color: 'white',
            fontWeight: '600',
            fontSize: '0.75rem'
          }}>
            {initials}
          </span>
        )}
      </div>
      <div style={{
        display: showDetails ? 'block' : 'none',
        textAlign: 'left'
      }}>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#0f172a',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '8rem'
        }}>
          {displayName}
        </p>
        <p style={{
          fontSize: '0.75rem',
          color: '#475569',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '8rem'
        }}>
          {organization?.name || 'Personal Account'}
        </p>
      </div>
      {showDropdownIcon && (
        <ChevronDown style={{ height: '1rem', width: '1rem', color: '#94a3b8' }} />
      )}
    </button>
  )
}