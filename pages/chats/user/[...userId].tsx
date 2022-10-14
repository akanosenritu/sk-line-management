import {NextPage} from "next"
import {Layout} from "../../../components/ui/Layout"
import {UserChatScreen} from "../../../components/models/chat/userChatScreen"
import {useRouter} from "next/router"

const Page: NextPage = () => {

  // retrieve userId from the dynamic route
  const router = useRouter()
  let {userId} = router.query
  if (!userId) return <div>Error.</div>
  if (Array.isArray(userId)) {
    if (userId.length === 1) userId = userId[0]
    else return <div>Error.</div>
  }

  return <Layout>
    <UserChatScreen userId={userId} />
  </Layout>
}

export default Page