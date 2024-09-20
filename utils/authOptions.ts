import connectDB from "@/config/database";
import UserModel from "@/models/User";
import { Profile, User, Account, NextAuthOptions } from "next-auth";
import { CredentialInput } from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface GoogleProfile extends Profile {
  name: string;
  email: string;
  picture: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked when the user is successfully sign-in
    async signIn({
      profile,
      user,
      account,
      email,
      credentials,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
      email?: {
        verificationRequest?: boolean;
      };
      credentials?: Record<string, CredentialInput>;
    }) {
      console.log({ profile, user, account, email, credentials });
      const googleProfile = profile as GoogleProfile | undefined;

      // 1. connect to the database
      await connectDB();
      // 2. check if user exist
      const userExist = await UserModel.findOne({
        email: googleProfile?.email,
      });
      // 3. if not, create a new user
      if (!userExist) {
        // truncate username if too long
        const username = googleProfile?.name?.slice(0, 20);
        await UserModel.create({
          email: googleProfile?.email,
          username,
          image: googleProfile?.picture,
        });
      }
      // 4. return true to allow sing in
      return true;
    },

    // session callback func that modifies the session object
    async session({ session }) {
      // 1. get the user from the database
      const user = await UserModel.findOne({ email: session.user.email });
      // 2. assign user id from session
      session.user.id = user?._id.toString() ?? "";
      // 3. return session
      return session;
    },
  },
};
