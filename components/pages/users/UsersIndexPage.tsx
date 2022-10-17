import {Stack} from "@mui/material"
import {DisplayUsersStatistics} from "../../models/user/statistics/DisplayUsersStatistics"
import {DisplayUsersList} from "../../models/user/list/DisplayUsersList"

export const UsersIndexPage = () => {
  return <Stack spacing={3} alignItems={"center"}>
    <DisplayUsersStatistics />
    <DisplayUsersList />
  </Stack>
}