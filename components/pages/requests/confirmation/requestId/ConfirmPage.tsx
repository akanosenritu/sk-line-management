import {Box, Stack, Typography} from "@mui/material"
import useSwr from "swr"
import {Loading} from "../../../../ui/Loading"

const Error = (props: {requestId: string}) => {
  return <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Typography variant={"body1"}>
      確認リクエスト (id: {props.requestId}) は見つかりませんでした。
    </Typography>
  </Box>
}

export const ConfirmPage = (props: {requestId: string}) => {
  const {data, error} = useSwr(`/api/requests/confirmation/${props.requestId}/retrieve`)
  
  return <Stack spacing={2}>
    <Box>
      <Typography variant={"h6"}>メッセージを確認済みにする</Typography>
      <Typography variant={"body1"}>以下のメッセージの確認が求められています。問題がなければ、確認済みにするボタンを押してください。</Typography>
    </Box>
    <Box sx={{px: 2}}>
      {error && <Error requestId={props.requestId} />}
      {!error && !data && <Loading />}
      
    </Box>
  </Stack>
}