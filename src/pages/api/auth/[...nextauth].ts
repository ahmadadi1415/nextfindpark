import { PrismaAdapter } from "@next-auth/prisma-adapter"

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email"
import prisma from "lib/prisma"
import { compare } from "bcrypt"
import NextAuth, { Account, Profile, User } from "next-auth"
import { signIn } from "next-auth/react"
import cloudinary from "@/utils/cloudinary"

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
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
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
    async jwt({ token, user, isNewUser }) {
      if (user) {
        token.role = user.role
        token.uid = user.id
      }
      return token
    },
    async session({ session, token, user }) {
      if (token && session.user) {
        session.user.role = token.role
        session.user.id = token.uid as string

        const profile = await prisma.profile.findUnique({
          where: {
            user_id: token.uid as string
          },
          select: {
            photo: true
          }
        })

        let photoUrl = null
        try {
          await cloudinary.api.resource(profile?.photo as string)
            .then((result) => {
              photoUrl = (JSON.parse(JSON.stringify(result))).secure_url
            })
        } catch (error) {
          console.log(error)
        }

        session.user.image = photoUrl
      }
      return session
    },
    
  }

})
