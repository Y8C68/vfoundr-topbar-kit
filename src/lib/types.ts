import { ReactNode } from 'react'

export interface TopBarConfig {
  showSearch?: boolean
  searchPlaceholder?: string
  showNotifications?: boolean
  showSettings?: boolean
  showUserProfile?: boolean
  customActions?: TopBarAction[]
  onSearch?: (query: string) => void
  onNotificationClick?: () => void
  onProfileClick?: () => void
  onOrganizationClick?: () => void
  onSubscriptionsClick?: () => void
  onSignOutClick?: () => void
  settingsPath?: string
  accountPath?: string
}

export interface TopBarAction {
  id: string
  icon: ReactNode
  label: string
  onClick: () => void
  badge?: string | number
}

export interface UserData {
  id: string
  firstName?: string
  lastName?: string
  fullName?: string
  email?: string
  imageUrl?: string
}

export interface OrganizationData {
  id: string
  name: string
  slug?: string
}

export interface NotificationData {
  id: string
  title: string
  message?: string
  timestamp: Date
  read: boolean
  type?: 'info' | 'warning' | 'error' | 'success'
}