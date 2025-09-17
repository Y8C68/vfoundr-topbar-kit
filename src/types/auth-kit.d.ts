declare module '@y8c68/auth-kit' {
  // Re-export Clerk hooks
  export function useAuth(): ReturnType<typeof import('@clerk/clerk-react').useAuth>;
  export function useUser(): ReturnType<typeof import('@clerk/clerk-react').useUser>;
  export function useOrganization(): ReturnType<typeof import('@clerk/clerk-react').useOrganization>;
  export function useOrganizationList(options?: Parameters<typeof import('@clerk/clerk-react').useOrganizationList>[0]): ReturnType<typeof import('@clerk/clerk-react').useOrganizationList>;
  export function useClerk(): ReturnType<typeof import('@clerk/clerk-react').useClerk>;
  
  // Components
  export interface ProfilePageProps {
    components: any;
    toast: any;
    onPasswordChange?: () => void;
    onTwoFactorManage?: () => void;
  }
  
  export function ProfilePageComponent(props: ProfilePageProps): React.JSX.Element;
  
  // Provider
  export interface AuthProviderProps {
    children: React.ReactNode;
    publishableKey?: string;
    [key: string]: any;
  }
  
  export function AuthProvider(props: AuthProviderProps): React.JSX.Element;
}