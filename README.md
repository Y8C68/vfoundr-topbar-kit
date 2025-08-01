# @y8c68/topbar-kit

Standardized top bar component for VFoundr applications with integrated search, notifications, and user profile management.

## Installation

```bash
npm install @y8c68/topbar-kit
```

## Usage

```tsx
import { TopBar } from '@y8c68/topbar-kit'

function App() {
  return (
    <TopBar 
      config={{
        searchPlaceholder: 'Search your app...',
        onSearch: (query) => console.log('Searching:', query),
        onNotificationClick: () => console.log('Notifications clicked')
      }}
    />
  )
}
```

## Features

- **Universal Search Bar** with keyboard shortcuts (Cmd/Ctrl + K)
- **Notification Bell** with unread count support
- **User Profile** display with organization info
- **Settings** quick access
- **Custom Actions** support
- **Fully Typed** with TypeScript
- **Responsive Design** with mobile support

## Components

### TopBar

Main component that renders the complete top bar.

```tsx
import { TopBar } from '@y8c68/topbar-kit'

<TopBar 
  config={{
    showSearch: true,
    searchPlaceholder: 'Search...',
    showNotifications: true,
    showSettings: true,
    showUserProfile: true,
    customActions: [{
      id: 'help',
      icon: <HelpCircle className="h-4 w-4" />,
      label: 'Help',
      onClick: () => console.log('Help clicked')
    }],
    onSearch: (query) => handleSearch(query),
    onNotificationClick: () => openNotifications(),
    settingsPath: '/settings',
    accountPath: '/account'
  }}
/>
```

### SearchBar

Standalone search bar component.

```tsx
import { SearchBar } from '@y8c68/topbar-kit/components'

<SearchBar 
  placeholder="Search products..."
  onSearch={(query) => console.log(query)}
/>
```

### NotificationBell

Notification indicator with badge support.

```tsx
import { NotificationBell } from '@y8c68/topbar-kit/components'

<NotificationBell 
  hasNotifications={true}
  notificationCount={5}
  onClick={() => openNotifications()}
/>
```

### UserProfile

User avatar and profile display.

```tsx
import { UserProfile } from '@y8c68/topbar-kit/components'

<UserProfile 
  user={{
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    imageUrl: 'https://...'
  }}
  organization={{
    id: '456',
    name: 'Acme Corp'
  }}
  onClick={() => navigateToProfile()}
/>
```

## Hooks

### useSearch

Search functionality with debouncing.

```tsx
import { useSearch } from '@y8c68/topbar-kit/hooks'

const { query, debouncedQuery, setQuery, clearSearch } = useSearch({
  defaultQuery: '',
  debounceDelay: 300,
  onSearch: (q) => performSearch(q)
})
```

### useNotifications

Notification management with polling support.

```tsx
import { useNotifications } from '@y8c68/topbar-kit/hooks'

const { 
  notifications, 
  unreadCount, 
  loading, 
  error,
  markAsRead,
  markAllAsRead,
  refresh
} = useNotifications({
  fetchNotifications: async () => fetchFromAPI(),
  pollInterval: 60000 // Poll every minute
})
```

### useKeyboardShortcuts

Register keyboard shortcuts.

```tsx
import { useKeyboardShortcuts } from '@y8c68/topbar-kit/hooks'

useKeyboardShortcuts([
  {
    key: 'k',
    cmd: true,
    ctrl: true,
    handler: () => focusSearch(),
    description: 'Focus search'
  }
])
```

## Configuration

### TopBarConfig

```typescript
interface TopBarConfig {
  showSearch?: boolean
  searchPlaceholder?: string
  showNotifications?: boolean
  showSettings?: boolean
  showUserProfile?: boolean
  customActions?: TopBarAction[]
  onSearch?: (query: string) => void
  onNotificationClick?: () => void
  settingsPath?: string
  accountPath?: string
}
```

### TopBarAction

```typescript
interface TopBarAction {
  id: string
  icon: ReactNode
  label: string
  onClick: () => void
  badge?: string | number
}
```

## Peer Dependencies

- React 18+
- React Router DOM 6+
- Clerk React 4+ or 5+
- Lucide React

## Integration with Other Kits

The topbar-kit is designed to work seamlessly with:

- **@y8c68/auth-kit** - User authentication data
- **@y8c68/teams-kit** - Organization/team information
- **@y8c68/billing-kit** - Plan limits and usage indicators

## Example Integration

```tsx
import { TopBar } from '@y8c68/topbar-kit'
import { useAuth } from '@y8c68/auth-kit'
import { useTeams } from '@y8c68/teams-kit'

function AppLayout() {
  const { user } = useAuth()
  const { currentTeam } = useTeams()

  return (
    <div>
      <TopBar 
        config={{
          searchPlaceholder: `Search in ${currentTeam?.name}...`,
          customActions: user?.isPremium ? premiumActions : [],
        }}
      />
      {/* Rest of your app */}
    </div>
  )
}
```

## License

MIT