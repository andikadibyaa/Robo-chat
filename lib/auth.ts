import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// This would typically connect to a database
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin",
    password: "masuk123", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: "2",
    name: "Staff Manager",
    email: "manager@company.com",
    password: "password123",
    role: "manager",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find((user) => user.email === credentials.email)

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error", // Custom error page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
}
