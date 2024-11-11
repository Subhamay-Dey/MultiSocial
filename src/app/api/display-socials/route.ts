import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const profiles = await prisma.socialProfile.findMany({
      where: { userId: session.user.id },
    });
    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Error fetching profiles' }, { status: 500 });
  }
}

// Method Not Allowed for unsupported methods
export async function OPTIONS() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    {
      status: 405,
      headers: {
        Allow: 'GET',
      },
    }
  );
}