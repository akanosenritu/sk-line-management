import {NextPage} from "next"
import {Layout} from "../../components/ui/Layout"
import {ChatsIndexPage} from "../../components/pages/chats/ChatsIndexPage"

const Page: NextPage = () => {
  return <Layout>
    <ChatsIndexPage />
  </Layout>
}

export default Page
