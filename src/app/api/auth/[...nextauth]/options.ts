import { User } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionStrategy } from "next-auth";
import bcrypt from "bcryptjs";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "e-mail",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials?.email });

          if (!foundUser) {
            return null;
          }

          const passswordMatch = credentials?.password
            ? await bcrypt.compare(credentials?.password, foundUser.password)
            : false;

          if (!passswordMatch) {
            return null;
          }

          return foundUser;
        } catch (err) {
          console.log(err);
          return null; // Return null in case of error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.nickname = user.nickname;
        token.userClass = user.userClass;
        token.currentListings = user.currentListings;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.nickname = token.nickname;
      session.user.userClass = token.userClass;
      session.user.currentListings = token.currentListings;
      session.user.phone = token.phone;

      return session;
    },
  },
};
