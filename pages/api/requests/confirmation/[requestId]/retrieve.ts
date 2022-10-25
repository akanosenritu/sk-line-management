import {NextApiHandler} from "next"
import {cosmosDBClient} from "../../../../../lib/cosmosdb/cosmosDBClient"
import {SqlQuerySpec} from "@azure/cosmos"

const handler: NextApiHandler = async (req, res) => {
  // retrieve requestId and check it
  let {requestId} = req.query
  if (!requestId) {
    res.status(400).json({error: "requestId was not provided."})
    return
  } else if (Array.isArray(requestId)) {
    if (requestId.length === 1) {
      requestId = requestId[0]
    } else {
      res.status(400).json({error: "multiple requestIds were provided."})
      return
    }
  }
  
  const sqlQuerySpec: SqlQuerySpec = {
    query: "select * from c where c.id = @requestId",
    parameters: [
      {name: "@requestId", value: requestId}
    ]
  }
  
  const {resources} = await cosmosDBClient
    .database("requests")
    .container("Confirmation")
    .items
    .query(sqlQuerySpec)
    .fetchAll()
  
  if (resources.length === 0) {
    res.status(400).json({error: `Request Item (${requestId}) was not found.`})
    return
  } else {
    res.status(200).json({data: resources[0]})
  }
}

export default handler