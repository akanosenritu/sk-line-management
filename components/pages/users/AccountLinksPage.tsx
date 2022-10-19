import {Box, Stack} from "@mui/material"
import useSwr from "swr"
import {DisplayAccountLinksList} from "../../models/user/list/DisplayAccountLinksList"

const fetcher = async (key: string) => fetch(key).then(res => res.json())

export const AccountLinksPage = () => {
  const {data} = useSwr("/api/users/accountLink/retrieveAll", fetcher)
  if (!data) return <Box>読み込み中...</Box>
  
  return <Stack spacing={2}>
    <DisplayAccountLinksList accountLinks={data.accountLinksData} />
  </Stack>
}