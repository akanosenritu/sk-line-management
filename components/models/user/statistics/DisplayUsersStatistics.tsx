import {Box, CircularProgress, Stack} from "@mui/material"
import {UsersStatisticsItem} from "./UsersStatisticsItem"
import useSwr from "swr"

export const DisplayUsersStatistics = () => {
  const {data} = useSwr("/api/users/getStatistics")
  
  if (!data) {
    return <Box sx={{height: 100, display: "flex", justifyContent: "center", alignItems: "center"}}>
      <CircularProgress />
    </Box>
  }
  
  return <Stack direction={"row"} spacing={2} alignItems={"center"}>
    <UsersStatisticsItem name={"移行済み"} main={data.numberOfUsersDataMoved} />
    <UsersStatisticsItem name={"紐づけ済"} main={data.numberOfUsersLineAccountLinked} />
  </Stack>
}