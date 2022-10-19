import {Button, Stack, Paper, TextField, Typography, Box} from "@mui/material"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import useSwr from "swr"
import {useSnackbar} from "notistack"

const schema = yup.object({
  name: yup.string().required(),
  phoneNumber: yup.string().required().matches(/[0-9]{10,11}/)
})

const fetcher = (key: string) => fetch(key).then(res => res.json())

export const LinkAccountPage = (props: {userId: string}) => {
  // react-hook-form を初期化、validationにyupを使用。
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema)
  })

  // CosmosDBに記録されている前のデータがあればそれを取得。
  const {data: oldEntryData} = useSwr<{
    result: {userId: string, name: string, phoneNumber: string, id: string}[]
  }>(`/api/users/${props.userId}/retrieveAccountLinkData`, fetcher, {
    onSuccess: data => {
      // データの読み込みが完了したとき、前のデータが存在すればそれをデフォルト値として設定する。
      const result = data.result
      if (result.length > 0) {
        enqueueSnackbar("保存されていたデータを読み込みました", {variant: "info"})
        reset({name: result[0].name, phoneNumber: result[0].phoneNumber})
      }
    }
  })

  // notistack
  const {enqueueSnackbar} = useSnackbar()
  
  // フォームがsubmitされた場合
  const onSubmit = async (data: any) => {
    // snackbarを提示 「登録中です...」
    enqueueSnackbar("登録中です...", {variant: "info"})
    let res
    if (oldEntryData && oldEntryData.result.length > 0) {
      // 前のデータがあれば、そのデータを上書きする
      res = await fetch(`/api/users/${props.userId}/updateAccountLinkData`, {
        method: "POST",
        body: JSON.stringify({name: data.name, phoneNumber: data.phoneNumber, oldEntryId: oldEntryData.result[0].id}),
        headers: {
          "Content-Type": "application/json",
        }
      })
    } else {
      res = await fetch(`/api/users/${props.userId}/submitAccountLinkData`, {
        method: "POST",
        body: JSON.stringify({name: data.name, phoneNumber: data.phoneNumber}),
        headers: {
          "Content-Type": "application/json",
        }
      })
    }
    if (res.ok) {
      enqueueSnackbar("登録されました", {variant: "success"})
    } else {
      enqueueSnackbar("登録に失敗しました", {variant: "error"})
    }
  }

  return <Paper sx={{width: "100%", height: "100%"}} elevation={0}>
    <Stack spacing={2}>
      <Box>
        <Typography variant={"h6"}>LINEアカウント 紐づけ設定</Typography>
        <Typography variant={"body1"}>LINEアカウントとスタッフ登録情報の紐づけを行います。紐づけることでお仕事の詳細確認などがLINE上にてできるようになります。</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            variant={"outlined"}
            InputLabelProps={{
              shrink: true
            }}
            label={"名前"}
            fullWidth={true}
            error={!!errors.name}
            helperText={errors.name? "名前の入力は必須です": ""}
            {...register("name")}
          />
          <TextField
            variant={"outlined"}
            label={"電話番号"}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth={true}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber? "電話番号の入力は必須です。ハイフン無しの数字のみ、10か11桁で入力してください。": ""}
            {...register("phoneNumber")}
          />
          <Button variant={"contained"} color={"success"} type={"submit"}>登録する</Button>
        </Stack>
        
      </form>
    </Stack>
  </Paper>
}
