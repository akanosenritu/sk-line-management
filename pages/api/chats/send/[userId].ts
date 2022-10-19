import {NextApiHandler} from "next"
import {unstable_getServerSession} from "next-auth"
import {nextAuthOptions} from "../../auth/[...nextauth]"
import {sendPushMessage} from "../../../../lib/line/sendPushMessage"

const handler: NextApiHandler = async (req, res) => {
  // TODO: implement validation for messages
  const messages = req.body.messages

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

  // check if the request was dispatched by a logged-in user.
  const session = await unstable_getServerSession(req, res, nextAuthOptions)
  if (!session) {
    res.status(401).json({error: "unauthorized."})
    return
  }

  // send the message
  const response = await sendPushMessage({type: "user", userId}, messages)

  res.status(response.status).send("")
}

export default handler