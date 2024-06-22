import { User } from "@/models/User"
import  CredentialsProvider  from "next-auth/providers/credentials"
import { SessionStrategy } from "next-auth"
import bcrypt from "bcrypt"

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { 
                    label: "Email", 
                    type: "email",
                    placeholder: "e-mail"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password"
                },
            },
            async authorize(credentials) {
                try {
                    const foundUser = await User.findOne({email: credentials?.email})
            
                    if(foundUser) {
                        console.log("User exists")
                        const match = credentials?.password ? bcrypt.compare(credentials.password, foundUser.password) : false;
                    
                        if(match) {
                            console.log("Good Pass")
                            delete foundUser.password
                        }
                    }
            
                    return foundUser || null; // Return the foundUser or null
                } catch(err) {
                    console.log(err);
                    return null; // Return null in case of error
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy, 
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}