import {NextApiHandler} from "next"
import {unstable_getServerSession} from "next-auth"
import {nextAuthOptions} from "../auth/[...nextauth]"
import {cosmosDBClient} from "../../../lib/cosmosdb/cosmosDBClient"

type ResponseData = {
  numberOfUsersDataMoved: number,
  numberOfUsersLineAccountLinked: number,
}

const handler: NextApiHandler = async (req, res) => {
  // リクエストがログインしているユーザーからのものか検証する。
  // check if the request was dispatched by a logged-in user.
  const session = await unstable_getServerSession(req, res, nextAuthOptions)
  if (!session) {
    res.status(401).json({error: "unauthorized."})
    return
  }
  
  // データ移行が完了しているユーザーの数を取得する。
  const {resources: numberOfUsersDataMovedFetchResult} = await cosmosDBClient
    .database("sk")
    .container("registeredStaffsBasicData")
    .items
    .query("select value count(1) from c")
    .fetchNext()
  
  // LINEのアカウント連携が完了しているユーザーの数を取得する。
  const {resources: numberOfUsersLineAccountLinkedFetchResult} = await cosmosDBClient
    .database("sk")
    .container("registeredStaffsBasicData")
    .items
    .query("select value count(1) from c where not IS_NULL(c.lineUserId)")
    .fetchNext()
  
  const responseData: ResponseData = {
    numberOfUsersDataMoved: numberOfUsersDataMovedFetchResult[0],
    numberOfUsersLineAccountLinked: numberOfUsersLineAccountLinkedFetchResult[0]
  }
  
  res.status(200).json(responseData)
}

export default handler