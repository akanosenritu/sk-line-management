import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react'
import useSwr, {useSWRConfig} from "swr"
import {CircularProgress} from "@mui/material"
import {
  CosmosDBLineMessageItemV1,
} from "../../../types/copied/skLineAzureFunctions/cosmosdb/CosmosDBLineMessageItem"
import {format} from "date-fns"
import {MessageObject} from "../../../types/copied/skLineAzureFunctions/line/webhookEvents/messageEvent"
import {OutboundMessageObject} from "../../../types/copied/skLineAzureFunctions/line/messages/message"

const fetcher = (key: string) => fetch(key).then(res => res.json())

const getText = (message: MessageObject | OutboundMessageObject) => {
  switch(message.type) {
    case "text":
      return message.text
    case "flex":
      return `Flexメッセージ: ${message.altText}`
    default:
      return "表示できない形式のメッセージです。"
  }
}

const convertMessage = (message: CosmosDBLineMessageItemV1) => {
  const text = getText(message.message)
  const sender = message.direction === "in"? "ユーザー": "スタッフ"
  const direction: "incoming" | "outgoing" = message.direction === "in"? "incoming": "outgoing"
  return {
    message: text,
    sentTime: format(new Date(message.timestamp), "MM/dd hh:mm"),
    sender,
    direction,
    position: "single" as const,
    id: message.id
  }
}

const sendMessage = async (text: string, userId: string) => {
  await fetch(`/api/chats/send/${userId}`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      messages: [{
        type: "text",
        text
      }]
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })

  return await fetch(`/api/chats/retrieve/${userId}`).then(res => res.json())
}

export const UserChatScreen = (props: {userId: string}) => {
  const {mutate} = useSWRConfig()
  const {data} = useSwr<{messages: CosmosDBLineMessageItemV1[]}>(`/api/chats/retrieve/${props.userId}`, fetcher, {refreshInterval: 1000})

  if (!data || !data.messages) return <CircularProgress />

  const messages = data.messages
    .map(convertMessage)

  const onSend = (innerHtml: string, textContent: string) => {
    mutate(`/api/chats/retrieve/${props.userId}`, sendMessage(textContent, props.userId), {revalidate: true})
  }

  return <div style={{ position:"relative", height: "500px", width: "500px"}}>
    <MainContainer>
      <ChatContainer>
        <MessageList>
          {messages.map(message => (<Message key={message.id} model={message} />))}
        </MessageList>
        <MessageInput placeholder="メッセージを入力" sendOnReturnDisabled={true} onSend={onSend} />
      </ChatContainer>
    </MainContainer>
  </div>
}