import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    error?: string;
    user: {
      id: string;
      email: string;
      name: string;
      username: string;
      roles: string[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    email: string;
    fullName: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      username: string;
      roles: string[];
    };
    error?: string;
  }
}
