// Define your social platform types here
type SocialPlatform = {
  name: 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn';
  icon: React.ReactNode;
  enabled: boolean;
  apiEndpoint: string;
} 