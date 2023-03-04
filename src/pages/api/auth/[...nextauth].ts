import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import prisma  from "lib/prisma"
import { compare } from "bcrypt"

export default NextAuth ({
  // Configure one or more authentication providers
  providers: [
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
    signIn: "/auth"
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  }
  
})
