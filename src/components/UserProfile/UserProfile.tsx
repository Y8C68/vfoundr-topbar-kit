import React from 'react'
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

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors ${className || ''}`}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
        {user.imageUrl ? (
          <img 
            src={user.imageUrl} 
            alt={displayName || 'User'} 
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <span className="text-white font-semibold text-xs">
            {initials}
          </span>
        )}
      </div>
      <div className="hidden md:block text-left">
        <p className="text-sm font-medium text-slate-900 truncate max-w-32">
          {displayName}
        </p>
        <p className="text-xs text-slate-600 truncate max-w-32">
          {organization?.name || 'Personal Account'}
        </p>
      </div>
      {showDropdownIcon && (
        <ChevronDown className="h-3 w-3 text-slate-400" />
      )}
    </button>
  )
}