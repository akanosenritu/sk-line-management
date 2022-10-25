import {Box, Paper} from "@mui/material"
import {NextPage} from "next"
import {useRouter} from "next/router"
import {Loading} from "../../../../components/ui/Loading"

const Page: NextPage = () => {
  // lineUserId をDynamic routeから取得する。
  const router = useRouter()
  let {requestId} = router.query
  if (!requestId) return <Loading />
  if (Array.isArray(requestId)) {
    if (requestId.length === 1) requestId = requestId[0]
    else return <Loading/>
  }
  
  return <Paper elevation={0} sx={{height: "100%"}}>
    <Box sx={{marginRight: "auto", marginLeft: "auto", maxWidth: 500, p: 2}}>
    
    </Box>
  </Paper>
}

export default Page