import { PrismaAdapter } from "@next-auth/prisma-adapter"

import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email"
import prisma from "lib/prisma"
import { compare } from "bcrypt"
import NextAuth, { Session } from "next-auth"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT as string),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        },
      },
      from: process.env.EMAIL_FROM,

    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },

      async authorize(credentials) {
        await prisma.$connect()

        // Finding user that correspond with the email
        const user: any = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        })

        // If email not found
        if (!user) {
          console.log("No email")
          throw new Error("Email is unregistered")
        }

        // Check hashed password with the database hashed password
        const isPasswordCorrect = await compare(
          credentials!.password, user.password
        )

        // If password incorrect
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect")
        }

        return user
      }
    })
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verification",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }: any) {
      if (token && session.user) {
        session.user.role = token.role
      }
      return session
    }

  }

})
