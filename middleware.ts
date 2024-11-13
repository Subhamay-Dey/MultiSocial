import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ token }) => {
      // Only allow access if there is a valid token (i.e., the user is logged in)
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard"],
};
