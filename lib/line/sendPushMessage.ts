import fetch from "cross-fetch"
import {getEnvironmentVariableValue} from "../getEnvironmentVariables"

const ENDPOINT = "https://func-sk-line-management.azurewebsites.net/api/send-message"

export const sendPushMessage = async (destination: {type: "user", userId: string}, messages: any[]) => {
  return fetch(ENDPOINT, {
    method: "POST",
    body: JSON.stringify({userId: destination.userId, messages}),
    headers: {
      "Content-Type": "application/json",
      "x-functions-key": getEnvironmentVariableValue("AZURE_FUNCTIONS_HOST_KEY")
    }
  })
}



