import {NextPage} from "next"
import {Layout} from "../../../../components/ui/Layout"
import {ProperUserRequiredPage} from "../../../../components/functional/ProperUserRequiredPage"
import {IndexPage} from "../../../../components/pages/users/line/userId/IndexPage"
import {useRouter} from "next/router"

const Page: NextPage = () => {
  // retrieve lineUserId from the dynamic route
  const router = useRouter()
  let {lineUserId} = router.query
  if (!lineUserId) return <div>Error.</div>
  if (Array.isArray(lineUserId)) {
    if (lineUserId.length === 1) lineUserId = lineUserId[0]
    else return <div>Error.</div>
  }
  
  return <Layout>
    <ProperUserRequiredPage>
      <IndexPage lineUserId={lineUserId} />
    </ProperUserRequiredPage>
  </Layout>
}

export default Page