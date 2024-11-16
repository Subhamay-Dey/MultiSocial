type ConnectedAccount = {
    platform: string;
    connected: boolean;
    loading: boolean;
    profileData?: {
      name?: string;
      profilePicture?: string;
    };
  }

  import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { linkedinAccount: true }
    });

    if (!user?.linkedinAccount?.accessToken) {
      return NextResponse.json({ error: 'LinkedIn not connected' }, { status: 404 });
    }

    // First, get the user info using OpenID endpoint
    const userInfoResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${user.linkedinAccount.accessToken}`,
      },
    });

    if (!userInfoResponse.ok) {
      console.error('LinkedIn API Error:', await userInfoResponse.text());
      return NextResponse.json(
        { error: 'Failed to fetch LinkedIn profile' },
        { status: userInfoResponse.status }
      );
    }

    const userData = await userInfoResponse.json();

    return NextResponse.json({
      name: userData.name,
      profilePicture: userData.picture,
      email: userData.email,
    });

  } catch (error: unknown) {
    console.error('Error in LinkedIn profile fetch:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}