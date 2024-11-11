import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  console.log("API endpoint hit");
  const session = await getServerSession(authOptions);
  console.log("Session:", session);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { platform, url } = await req.json();

  if (!platform || !url) {
    return NextResponse.json({ message: 'Platform and URL are required' }, { status: 400 });
  }

  try {
    await prisma.socialProfile.create({
      data: {
        platform,
        url,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ message: 'Profile linked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error linking profile:', error);
    return NextResponse.json({ error: 'Error linking profile' }, { status: 500 });
  }
}