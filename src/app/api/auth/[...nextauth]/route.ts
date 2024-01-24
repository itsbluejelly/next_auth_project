import prisma from "@/src/lib/prisma"
import {AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import NextAuth from "next-auth/next"
import { User } from "@prisma/client"

export const authOptions: AuthOptions = {
    pages: { signIn: "/auth/signIn" },

    providers: [CredentialsProvider({ 
        name: "Credentials",

        credentials: {
            username: { 
                label: "User Name",
                type: "text",
                placeholder: "Your User Name"
            },

            password : { 
                label: "Password",
                type: "password"
            }
        },

        async authorize(credentials){
            const user = await prisma.user.findUnique({ where: { email: credentials?.username }})

            if(!user){
                throw new Error("User name or password is invalid ")
            }else if(!credentials?.password){
                throw new Error("Please provide the password")  
            }

            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

            if(!isPasswordCorrect){
                throw new Error("Please provide the right password or username")
            }

            const {password, ...otherDetails} = user
            return otherDetails
        }
    })],

    callbacks: {
        async jwt({token, user}){
            if(user){
                token.user = user as User
            }
            
            return token
        },

        async session({token, session}){
            session.user = token.user
            return session
        }
    }
}

const handler = NextAuth(authOptions)
export default handler