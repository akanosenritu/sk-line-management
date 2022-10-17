import {Stack} from "@mui/material"
import {UsersStatisticsItem} from "./UsersStatisticsItem"

export const DisplayUsersStatistics = () => {
  return <Stack direction={"row"} spacing={2} alignItems={"center"}>
    <UsersStatisticsItem name={"登録者"} main={100} />
    <UsersStatisticsItem name={"紐づけ済"} main={80} />
    <UsersStatisticsItem name={"メッセージ数"} main={1000} />
  </Stack>
}