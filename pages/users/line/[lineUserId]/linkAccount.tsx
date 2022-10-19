import {NextPage} from "next"
import {Box, Paper} from "@mui/material"
import {useRouter} from "next/router"
import {LinkAccountPage} from "../../../../components/pages/users/line/userId/LinkAccountPage"

const Page: NextPage = () => {
  // lineUserId をDynamic routeから取得する。
  const router = useRouter()
  let {lineUserId} = router.query
  if (!lineUserId) return <div>Error.</div>
  if (Array.isArray(lineUserId)) {
    if (lineUserId.length === 1) lineUserId = lineUserId[0]
    else return <div>Error.</div>
  }

  return <Paper elevation={0} sx={{height: "100%"}}>
    <Box sx={{marginRight: "auto", marginLeft: "auto", maxWidth: 500, p: 2}}>
      <LinkAccountPage userId={lineUserId} />
    </Box>
  </Paper>
}

export default Page