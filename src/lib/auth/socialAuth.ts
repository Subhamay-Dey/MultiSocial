interface AuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
}

const authConfigs: Record<SocialPlatform['name'], AuthConfig> = {
  Facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/facebook/callback`,
    scope: ['pages_manage_posts', 'pages_read_engagement']
  },
  Twitter: {
    clientId: process.env.TWITTER_CLIENT_ID!,
    clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/twitter/callback`,
    scope: []
  },
  Instagram: {
    clientId: process.env.INSTAGRAM_CLIENT_ID!,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/instagram/callback`,
    scope: []
  },
  LinkedIn: {
    clientId: process.env.LINKEDIN_CLIENT_ID!,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/linkedin/callback`,
    scope: []
  }
};

export async function initiateAuth(platform: SocialPlatform['name']) {
  const config = authConfigs[platform];
  // Add your auth initiation logic here
  return config;
}

export async function handleCallback(platform: SocialPlatform['name'], code: string) {
  const config = authConfigs[platform];
  // Add your callback handling logic here
  return { platform, code };
}

export { authConfigs }; 