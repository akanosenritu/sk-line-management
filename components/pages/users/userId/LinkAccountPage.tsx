import {Box, Button, Stack, TextField, Typography} from "@mui/material"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import useSwr from "swr"

const schema = yup.object({
  name: yup.string().required(),
  phoneNumber: yup.string().required().matches(/[0-9]{10,11}/)
})

const fetcher = (key: string) => fetch(key).then(res => res.json())

export const LinkAccountPage = (props: {userId: string}) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema)
  })

  const {data: oldEntryData} = useSwr<{
    result: {userId: string, name: string, phoneNumber: string, id: string}[]
  }>(`/api/users/${props.userId}/retrieveAccountLinkData`, fetcher, {
    onSuccess: data => {
      const result = data.result
      if (result.length > 0) {
        reset({name: result[0].name, phoneNumber: result[0].phoneNumber})
      }
    }
  })

  const onSubmit = async (data: any) => {
    if (oldEntryData && oldEntryData.result.length > 0) {
      const res = await fetch(`/api/users/${props.userId}/updateAccountLinkData`, {
        method: "POST",
        body: JSON.stringify({name: data.name, phoneNumber: data.phoneNumber, oldEntryId: oldEntryData.result[0].id}),
        headers: {
          "Content-Type": "application/json",
        }
      })
    } else {
      const res = await fetch(`/api/users/${props.userId}/submitAccountLinkData`, {
        method: "POST",
        body: JSON.stringify({name: data.name, phoneNumber: data.phoneNumber}),
        headers: {
          "Content-Type": "application/json",
        }
      })
    }
  }

  return <Stack spacing={2}>
    <div>
      <Typography variant={"h6"}>LINEアカウント 紐づけ設定</Typography>
      <Typography variant={"body1"}>LINEアカウントとスタッフ登録情報の紐づけを行います。紐づけることでお仕事の詳細確認などがLINE上にてできるようになります。</Typography>
    </div>
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
}

// TODO: correctly manage the form state and display it: loading, submitting, submitted...