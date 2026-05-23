import type { NextAuthConfig } from "next-auth";

import type { UserRole } from "@pulse/domain";

const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role as UserRole;
      }
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
