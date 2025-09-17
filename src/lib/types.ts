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
  // Component props for integrated modals
  profileComponents?: {
    Card: React.ComponentType<any>
    CardContent: React.ComponentType<any>
    CardHeader: React.ComponentType<any>
    CardTitle: React.ComponentType<any>
    Button: React.ComponentType<any>
    Input: React.ComponentType<any>
    Label: React.ComponentType<any>
    Avatar: React.ComponentType<any>
    AvatarFallback: React.ComponentType<any>
    AvatarImage: React.ComponentType<any>
    Separator: React.ComponentType<any>
    Dialog?: React.ComponentType<any>
    DialogContent?: React.ComponentType<any>
    DialogHeader?: React.ComponentType<any>
    DialogTitle?: React.ComponentType<any>
    DialogDescription?: React.ComponentType<any>
    DialogFooter?: React.ComponentType<any>
    DialogTrigger?: React.ComponentType<any>
  }
  organizationComponents?: {
    Card: React.ComponentType<any>
    CardContent: React.ComponentType<any>
    CardHeader: React.ComponentType<any>
    CardTitle: React.ComponentType<any>
    Button: React.ComponentType<any>
    Input: React.ComponentType<any>
    Label: React.ComponentType<any>
    Avatar: React.ComponentType<any>
    AvatarFallback: React.ComponentType<any>
    AvatarImage: React.ComponentType<any>
    Dialog: React.ComponentType<any>
    DialogContent: React.ComponentType<any>
    DialogDescription: React.ComponentType<any>
    DialogFooter: React.ComponentType<any>
    DialogHeader: React.ComponentType<any>
    DialogTitle: React.ComponentType<any>
    DialogTrigger: React.ComponentType<any>
  }
  billingComponents?: {
    Card: React.ComponentType<any>
    CardContent: React.ComponentType<any>
    CardHeader: React.ComponentType<any>
    CardTitle: React.ComponentType<any>
    Button: React.ComponentType<any>
    Progress: React.ComponentType<any>
    Badge: React.ComponentType<any>
    Alert: React.ComponentType<any>
    AlertTitle: React.ComponentType<any>
    AlertDescription: React.ComponentType<any>
    Tabs: React.ComponentType<any>
    TabsContent: React.ComponentType<any>
    TabsList: React.ComponentType<any>
    TabsTrigger: React.ComponentType<any>
    Dialog: React.ComponentType<any>
    DialogContent: React.ComponentType<any>
    DialogHeader: React.ComponentType<any>
    DialogTitle: React.ComponentType<any>
    DialogDescription: React.ComponentType<any>
    DialogFooter: React.ComponentType<any>
    DialogTrigger: React.ComponentType<any>
  }
  toast?: (props: { title: string; description?: string; variant?: 'default' | 'destructive' }) => void
  enableDebugInfo?: boolean
  onPasswordChange?: () => void
  onTwoFactorManage?: () => void
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