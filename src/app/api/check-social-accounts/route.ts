
import prisma from '@/lib/prisma';  // Your prisma client import
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response('Not authenticated', { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      youtubeAccount: true,
      twitterAccount: true,
      linkedinAccount: true,
    },

  });

  const hasLinkedAccounts = {
    hasYouTube: !!user?.youtubeAccount,
    hasTwitter: !!user?.twitterAccount,
    hasLinkedIn: !!user?.linkedinAccount,
  };

  return new Response(JSON.stringify(hasLinkedAccounts));
}
