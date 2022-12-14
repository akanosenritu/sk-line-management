import {JWT} from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      email: string,
      name: string,
    },
    token: {
      accessToken: JWT,
      accessTokenExpires: number,
      refreshToken: JWT,
    }
  }
}