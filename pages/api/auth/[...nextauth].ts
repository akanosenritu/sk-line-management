import NextAuth, {NextAuthOptions} from "next-auth"
import AzureAD from "next-auth/providers/azure-ad"
import {getEnvironmentVariableValue} from "../../../lib/getEnvironmentVariables"

const refreshAccessToken = async (token: any) => {
  try {
    const url = `https://login.microsoftonline.com/${getEnvironmentVariableValue("AZURE_AD_TENANT_ID")}/oauth2/v2.0/token`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: new URLSearchParams({
        client_id: getEnvironmentVariableValue("AZURE_AD_CLIENT_ID"),
        client_secret: getEnvironmentVariableValue("AZURE_AD_CLIENT_SECRET"),
        grant_type: "refresh_token",
        refresh_token: token.refreshToken
      })
    })
    
    const refreshedTokens = await response.json()
    
    if (!response.ok) {
      throw refreshedTokens
    }
    
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + 3600 * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    }
  } catch (error) {
    console.log(error)
    
    return {
      ...token,
      error: "RefreshAccessTokenError"
    }
  }
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    AzureAD({
      clientId: getEnvironmentVariableValue("AZURE_AD_CLIENT_ID"),
      clientSecret: getEnvironmentVariableValue("AZURE_AD_CLIENT_SECRET"),
      tenantId: getEnvironmentVariableValue("AZURE_AD_TENANT_ID"),
      authorization: {
        params: {
          scope: "openid profile email User.Read offline_access",
          grant_type: "authorization_code"
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
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + 3600 * 1000,
          refreshToken: account.refresh_token,
        }
      }
      
      // tokenが期限を迎えていないかチェック
      // @ts-ignore
      if (Date.now() < token.accessTokenExpires) {
        return token
      }
      
      return refreshAccessToken(token)
    }
  }
}

export default NextAuth(nextAuthOptions)