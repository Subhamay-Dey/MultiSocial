import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { twitterAccount: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete the Twitter account if it exists
    if (user.twitterAccount) {
      await prisma.twitterAccount.delete({
        where: { userId: user.id }
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Twitter disconnect error:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect Twitter account' },
      { status: 500 }
    );
  }
}