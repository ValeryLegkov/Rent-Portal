import NextAuth from "next-auth";
import { UserType } from "@models/User";

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
    };
  }

  export interface User extends UserType {
    id: string;
  }
}
