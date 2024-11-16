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
      include: { twitterAccount: true }
    });

    if (!user?.twitterAccount?.accessToken) {
      return NextResponse.json({ error: 'Twitter not connected' }, { status: 404 });
    }

    // Fetch Twitter profile
    const profileResponse = await fetch('https://api.twitter.com/2/users/me?user.fields=profile_image_url,name,username', {
      headers: {
        'Authorization': `Bearer ${user.twitterAccount.accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      console.error('Twitter API Error:', await profileResponse.text());
      return NextResponse.json(
        { error: 'Failed to fetch Twitter profile' },
        { status: profileResponse.status }
      );
    }

    const profileData = await profileResponse.json();

    return NextResponse.json({
      name: profileData.data.name,
      profilePicture: profileData.data.profile_image_url,
      username: profileData.data.username,
    });

  } catch (error) {
    console.error('Error in Twitter profile fetch:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error  },
      { status: 500 }
    );
  }
}