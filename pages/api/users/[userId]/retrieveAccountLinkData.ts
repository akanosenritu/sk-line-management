import {NextApiHandler} from "next"
import {cosmosDBClient} from "../../../../lib/cosmosdb/cosmosDBClient"
import {SqlQuerySpec} from "@azure/cosmos"

const handler: NextApiHandler = async (req, res) => {
  // retrieve user id and check it
  // userId must be a single string
  let {userId} = req.query
  if (!userId) {
    res.status(400).json({error: "userId was not provided."})
    return
  } else if (Array.isArray(userId)) {
    if (userId.length === 1) {
      userId = userId[0]
    } else {
      res.status(400).json({error: "multiple userIds were provided."})
    }
  }

  const querySpec: SqlQuerySpec = {
    query: "Select * from c where c.userId = @userId",
    parameters: [
      {
        name: "@userId",
        value: userId
      }
    ]
  }
  const {resources} = await cosmosDBClient
    .database("line")
    .container("AccountLinkTempData")
    .items
    .query(querySpec)
    .fetchAll()

  res.status(200).json({result: resources})
}

export default handler