import NextAuth, {NextAuthOptions} from "next-auth"
import AzureAD from "next-auth/providers/azure-ad"
import {getEnvironmentVariableValue} from "../../../lib/getEnvironmentVariables"

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    AzureAD({
      clientId: getEnvironmentVariableValue("AZURE_AD_CLIENT_ID"),
      clientSecret: getEnvironmentVariableValue("AZURE_AD_CLIENT_SECRET"),
      tenantId: getEnvironmentVariableValue("AZURE_AD_TENANT_ID"),
      authorization: {
        params: {
          scope: "openid profile email User.Read"
        }
      }
    })
  ],
  secret: getEnvironmentVariableValue("NEXT_AUTH_SECRET"),
  callbacks: {
    async session({session, token}) {
      // @ts-ignore
      session.token = token
      return session
    },
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  }
}

export default NextAuth(nextAuthOptions)