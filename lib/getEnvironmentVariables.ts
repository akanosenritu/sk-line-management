const ENVIRONMENT_VARIABLES = [
  "AZURE_AD_CLIENT_ID",
  "AZURE_AD_CLIENT_SECRET",
  "AZURE_AD_TENANT_ID",
  "NEXT_AUTH_SECRET",
  "NEXT_AUTH_URL",
  "AZURE_COSMOS_DB_CONNECTION_STRING",
  "AZURE_FUNCTIONS_HOST_KEY"
] as const

type EnvironmentVariable = typeof ENVIRONMENT_VARIABLES[number]

export const getEnvironmentVariableValue = (environmentVariable: EnvironmentVariable) => {
  const value = process.env[environmentVariable]
  if (!value) throw new Error(`Environment variable ${environmentVariable} was not found.`)
  return value
}