import {NextApiHandler} from "next"
import {unstable_getServerSession} from "next-auth"
import {nextAuthOptions} from "../../auth/[...nextauth]"
import {SqlQuerySpec} from "@azure/cosmos"
import {cosmosDBClient} from "../../../../lib/cosmosdb/cosmosDBClient"

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

  // check if the request was dispatched by a logged-in user.
  const session = await unstable_getServerSession(req, res, nextAuthOptions)
  if (!session) {
    res.status(401).json({error: "unauthorized."})
    return
  }

  // retrieve the user's chats from cosmosdb
  const querySpec: SqlQuerySpec = {
    query: "Select * from c Where c.source.userId = @userId or c.to = @userId",
    parameters: [
      {name: "@userId", value: userId}
    ]
  }
  const {resources} = await cosmosDBClient
    .database("sk")
    .container("LineMessages")
    .items
    .query(querySpec)
    .fetchAll()

  res.status(200).json({
    messages: resources
  })
}

export default handler