import {NextPage} from "next"
import {Layout} from "../../components/ui/Layout"
import {ProperUserRequiredPage} from "../../components/functional/ProperUserRequiredPage"
import {AccountLinksPage} from "../../components/pages/users/AccountLinksPage"

const Page: NextPage = () => {
  return <Layout>
    <ProperUserRequiredPage>
      <AccountLinksPage />
    </ProperUserRequiredPage>
  </Layout>
}

export default Page
