import {NextApiHandler} from "next"
import {cosmosDBClient} from "../../../../lib/cosmosdb/cosmosDBClient"
import {unstable_getServerSession} from "next-auth"
import {nextAuthOptions} from "../../auth/[...nextauth]"

const handler: NextApiHandler = async (req, res) => {
  // check if the request was dispatched by a logged-in user.
  const session = await unstable_getServerSession(req, res, nextAuthOptions)
  if (!session) {
    res.status(401).json({error: "unauthorized."})
    return
  }
  
  // CosmosDBからリンク情報をすべて取得
  const {resources: accountLinksData} = await cosmosDBClient
    .database("line")
    .container("AccountLinkTempData")
    .items
    .readAll()
    .fetchAll()
  res.status(200).json({accountLinksData: accountLinksData})
}

export default handler