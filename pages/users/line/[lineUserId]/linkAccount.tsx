import {NextPage} from "next"
import {Box, CircularProgress, Paper} from "@mui/material"
import {useRouter} from "next/router"
import {LinkAccountPage} from "../../../../components/pages/users/line/userId/LinkAccountPage"

const Loading = () => {
  return <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    <CircularProgress />
  </Box>
}

const Page: NextPage = () => {
  // lineUserId をDynamic routeから取得する。
  const router = useRouter()
  let {lineUserId} = router.query
  if (!lineUserId) return <Loading />
  if (Array.isArray(lineUserId)) {
    if (lineUserId.length === 1) lineUserId = lineUserId[0]
    else return <Loading/>
  }

  return <Paper elevation={0} sx={{height: "100%"}}>
    <Box sx={{marginRight: "auto", marginLeft: "auto", maxWidth: 500, p: 2}}>
      <LinkAccountPage userId={lineUserId} />
    </Box>
  </Paper>
}

export default Page