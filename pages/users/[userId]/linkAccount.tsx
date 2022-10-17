import {NextPage} from "next"
import {Box} from "@mui/material"
import {useRouter} from "next/router"
import {LinkAccountPage} from "../../../components/pages/users/userId/LinkAccountPage"

const Page: NextPage = () => {

  // retrieve userId from the dynamic route
  const router = useRouter()
  let {userId} = router.query
  if (!userId) return <div>Error.</div>
  if (Array.isArray(userId)) {
    if (userId.length === 1) userId = userId[0]
    else return <div>Error.</div>
  }

  return <Box sx={{marginRight: "auto", marginLeft: "auto", maxWidth: 500, p: 2}}>
    <LinkAccountPage userId={userId} />
  </Box>
}

export default Page