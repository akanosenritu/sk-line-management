import {CosmosClient} from "@azure/cosmos"
import {getEnvironmentVariableValue} from "../getEnvironmentVariables"

export const cosmosDBClient = new CosmosClient(getEnvironmentVariableValue("AZURE_COSMOS_DB_CONNECTION_STRING"))