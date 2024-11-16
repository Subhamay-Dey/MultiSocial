import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Get user from database using email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!user) {
      return NextResponse.redirect(new URL('/dashboard?error=user_not_found', req.url));
    }

    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const platform = req.url.split('/oauth/')[1].split('?')[0];

    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(new URL('/dashboard?error=oauth_error', req.url));
    }

    if (platform === 'linkedin') {
      // Exchange code for access token
      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code!,
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/oauth/linkedin`,
          client_id: '86nrfzff5nxcc5',
          client_secret: 'WPL_AP1.wULZ1szRykJiRqRX.Mw1s7w==',
        }),
      });

      if (!tokenResponse.ok) {
        const error = await tokenResponse.text();
        console.error('LinkedIn token error:', error);
        return NextResponse.redirect(new URL('/dashboard?error=token_error', req.url));
      }

      const tokens = await tokenResponse.json();

      // Upsert the LinkedIn account using the user's ID we got from the email lookup
      await prisma.linkedinAccount.upsert({
        where: {
          userId: user.id, // Using the ID we got from the email lookup
        },
        update: {
          accessToken: tokens.access_token,
          expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        },
        create: {
          userId: user.id, // Using the ID we got from the email lookup
          accessToken: tokens.access_token,
          expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        },
      });

      // Fetch profile data immediately
      const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        
        // Update the LinkedIn account with profile data
        await prisma.linkedinAccount.update({
          where: { userId: user.id },
          data: {
            profileName: `${profileData.localizedFirstName} ${profileData.localizedLastName}`,
            // Add other profile fields you want to store
          },
        });
      }

      return NextResponse.redirect(new URL('/dashboard?success=true', req.url));
    }

    return NextResponse.redirect(new URL('/dashboard?error=invalid_platform', req.url));
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL('/dashboard?error=server_error', req.url));
  }
}