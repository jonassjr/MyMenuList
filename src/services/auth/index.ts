import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "../database"
import { createPageName } from "@/lib/utils"
import { createStripeCustomer } from "../stripe"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    createUser: async ({ user }) => {

      try {
        const pageName = await createPageName(user.name || '')
        await prisma.user.update({
          where: { id: user.id },
          data: { pageName },
        });

        await createStripeCustomer({
          name: user.name as string,
          email: user.email as string,
        })

      } catch (error) {
        console.log(error)
      }
    }
  }
})