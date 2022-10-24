import {Paper, Stack, Tab, Tabs, Typography} from "@mui/material"
import {UserChatScreen} from "../../../../../models/chat/userChatScreen"
import React from "react"
import {SendMessageTab} from "./tabs/SendMessageTab"
import {TabPanel} from "../../../../../ui/TabPanel"

export const IndexPage = (props: {lineUserId: string}) => {
  const [tabIndex, setTabIndex] = React.useState<number>(0)
  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }
  
  return <Stack spacing={2}>
    <Paper sx={{display: "flex", alignItems: "center", justifyContent: "center", height: 500}}>
      <Typography variant={"h5"}>ユーザー情報 (未実装)</Typography>
    </Paper>
    <Stack direction={"row"} spacing={2}>
      <Paper sx={{width: "50%", p: 2}}>
        <Tabs
          value={tabIndex}
          onChange={onTabChange}
          variant={"scrollable"}
        >
          <Tab label={"メッセージを送信"} />
        </Tabs>
        <TabPanel tabIndex={0} currentIndex={tabIndex}>
          <SendMessageTab lineUserId={props.lineUserId} />
        </TabPanel>
      </Paper>
      <UserChatScreen userId={props.lineUserId} />
    </Stack>
  </Stack>
}