import {NextApiHandler} from "next"
import {cosmosDBClient} from "../../../../lib/cosmosdb/cosmosDBClient"
import {sendPushMessage} from "../../../../lib/line/sendPushMessage"

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
      return
    }
  }

  // get name, userId, oldEntryId and phone number from the request
  const data = req.body
  const name = data.name
  const phoneNumber = data.phoneNumber
  const oldEntryId = data.oldEntryId
  if (!name || !phoneNumber || !oldEntryId) {
    res.status(400).json({error: "name, oldEntryId and phoneNumber must be provided in the payload."})
    return
  }

  await cosmosDBClient
    .database("line")
    .container("AccountLinkTempData")
    .items
    .upsert({id: oldEntryId, name, userId, phoneNumber})
  
  await sendPushMessage({type: "user", userId}, [
    {
      "type": "text",
      "text": "紐付け情報を更新しました。"
    }
  ])
  
  res.status(201).json({name, userId, phoneNumber})
}

export default handler