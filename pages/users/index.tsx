import {NextPage} from "next"
import {Layout} from "../../components/ui/Layout"
import {UsersIndexPage} from "../../components/pages/users/UsersIndexPage"
import {ProperUserRequiredPage} from "../../components/functional/ProperUserRequiredPage"

const Page: NextPage = () => {
  return <Layout>
    <ProperUserRequiredPage>
      <UsersIndexPage />
    </ProperUserRequiredPage>
  </Layout>
}

export default Page