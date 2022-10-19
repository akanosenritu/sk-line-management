import {Paper, Stack, Typography} from "@mui/material"
import {UserChatScreen} from "../../../../models/chat/userChatScreen"

export const IndexPage = (props: {lineUserId: string}) => {
  return <Stack spacing={2}>
    <Paper sx={{display: "flex", alignItems: "center", justifyContent: "center", height: 500}}>
      <Typography variant={"h5"}>ユーザー情報 (未実装)</Typography>
    </Paper>
    <Stack direction={"row"} spacing={2}>
      <Paper sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "50%"}}>
        <Typography variant={"h5"}>PLACEHOLDER</Typography>
      </Paper>
      <UserChatScreen userId={props.lineUserId} />
    </Stack>
  </Stack>
}