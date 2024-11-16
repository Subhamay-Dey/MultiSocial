import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Handle the OAuth callback
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const platform = req.url.split('/oauth/')[1].split('?')[0];

    if (error) {
      return NextResponse.json(
        { error: error },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: 'No code provided' },
        { status: 400 }
      );
    }

    // Handle different platforms
    switch (platform) {
      case 'linkedin':
        // Your LinkedIn token exchange logic here
        break;
      case 'twitter':
        // Your Twitter token exchange logic here
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid platform' },
          { status: 400 }
        );
    }

    return NextResponse.redirect(new URL('/dashboard', req.url));
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}