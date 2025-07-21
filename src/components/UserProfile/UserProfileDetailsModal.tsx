import React from 'react'
import { ProfilePageComponent, type ProfilePageProps } from '@y8c68/auth-kit'
import { X } from 'lucide-react'

export interface UserProfileDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  // UI Components that must be provided by the consuming app
  components: ProfilePageProps['components'] & {
    Dialog?: React.ComponentType<any>
    DialogContent?: React.ComponentType<any>
    DialogHeader?: React.ComponentType<any>
    DialogTitle?: React.ComponentType<any>
  }
  // Toast function
  toast: ProfilePageProps['toast']
  // Optional customization from ProfilePageComponent
  onPasswordChange?: ProfilePageProps['onPasswordChange']
  onTwoFactorManage?: ProfilePageProps['onTwoFactorManage']
  className?: string
}

export const UserProfileDetailsModal: React.FC<UserProfileDetailsModalProps> = ({
  isOpen,
  onClose,
  components,
  toast,
  onPasswordChange,
  onTwoFactorManage,
  className
}) => {
  if (!isOpen) return null

  // If app provides Dialog components, use them
  if (components.Dialog && components.DialogContent) {
    const { Dialog, DialogContent, DialogHeader, DialogTitle } = components
    
    return (
      <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
        <DialogContent className={`max-w-2xl max-h-[80vh] overflow-y-auto ${className || ''}`}>
          {DialogHeader && DialogTitle && (
            <DialogHeader>
              <DialogTitle>Profile Settings</DialogTitle>
            </DialogHeader>
          )}
          <ProfilePageComponent
            components={components}
            toast={toast}
            onPasswordChange={onPasswordChange}
            onTwoFactorManage={onTwoFactorManage}
          />
        </DialogContent>
      </Dialog>
    )
  }

  // Fallback to styled div overlay if no Dialog components provided
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        pointerEvents: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e2e8f0',
          maxWidth: '672px', // max-w-2xl
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          padding: '24px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
        }}
        className={className || ''}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#64748b',
            transition: 'all 0.2s ease',
            zIndex: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9'
            e.currentTarget.style.color = '#374151'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#64748b'
          }}
        >
          <X size={20} />
        </button>
        
        {/* Title */}
        <div style={{ marginBottom: '24px', paddingRight: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#0f172a',
            margin: 0
          }}>
            Profile Settings
          </h2>
        </div>
        
        {/* Profile Page Component */}
        <ProfilePageComponent
          components={components}
          toast={toast}
          onPasswordChange={onPasswordChange}
          onTwoFactorManage={onTwoFactorManage}
        />
      </div>
    </div>
  )
}