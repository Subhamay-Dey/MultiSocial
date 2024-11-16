import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth'

export async function getUserSocialLinks() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      youtubeAccount: true,
      twitterAccount: true,
      linkedinAccount: true,
    },
  });

  return user;
}
