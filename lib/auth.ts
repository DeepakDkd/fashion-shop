import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { UserRole } from "@/types/next-auth";

export const authOptions: NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        const { email, password } = credentials;
        console.log("credentials", credentials);
        const user = await User.findOne({ email });

        if (!user) {
          console.log(`[AUTH_ERROR_CREDENTIALS]: No user found with email ${email}`);
          throw new Error("User not found");
        }

        if (!user.password) {
          console.log(`[AUTH_ERROR_CREDENTIALS]: User ${email} does not have a password hash`);
          throw new Error("This account does not support password login");
        }

        const isValid = await user.comparePassword(password);
        if (!isValid) {
          console.log(`[AUTH_ERROR_CREDENTIALS]: Invalid password for email ${email}`);
          throw new Error("Invalid email or password");
        }

        return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };

      },
    }),
  ],
  callbacks: {

    async signIn({ user, account, profile,email :emailFromProvider }) {
      if (account?.provider != "google") {
        return true;
      }
      await connectDB();

      const email = user.email;
      const name = user.name;
      const image = user.image;
      const googleId = account.providerAccountId;

      if (!email) {
        return false;
      }

      // already linked with this google account 
      let existingUser = await User.findOne({ googleId });
      if (existingUser) {
        return true;
      }

      // same email already exists --> link google account to that user
      existingUser = await User.findOne({ email });
      if (existingUser && emailFromProvider?.verificationRequest) {
        existingUser.googleId = googleId;
        existingUser.image = image || existingUser.image;
        if (!existingUser.name && name) {
          existingUser.name = name;
        }
        await existingUser.save();
        return true;
      }

      // create new user with google account
      await User.create({
        email,
        name,
        image,
        googleId,
        role: "admin"
      })
      return true;

    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          role: token.role as UserRole,
        };
      }
      return session;
    }
  }
  , session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};
