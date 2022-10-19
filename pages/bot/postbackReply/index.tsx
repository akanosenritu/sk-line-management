import {NextPage} from "next"
import {PostbackReplyIndexPage} from "../../../components/pages/bot/postbackReply/PostbackReplyIndexPage"
import {Layout} from "../../../components/ui/Layout"

const Page: NextPage = () => {
  return <Layout>
    <PostbackReplyIndexPage />
  </Layout>
}

export default Page