import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import {Controller, useForm} from "react-hook-form"
import React from "react"
import HelpIcon from '@mui/icons-material/Help'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

type DataToBeSent = {
  lineUserIdSendTo: string,
  messageText: string,
  requestConfirmation: boolean
}

const OptionListItem = (props: {text: string, description: string, onChange: (v: any) => void, checked: boolean, disabled?: boolean}) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = React.useState(false)
  
  return <ListItem
    secondaryAction={<IconButton edge={"end"} onClick={() => setIsDescriptionOpen(true)}>
      <HelpIcon />
    </IconButton>}
  >
    <ListItemIcon>
      <Checkbox
        edge={"start"}
        disableRipple={true}
        onChange={props.onChange}
        checked={props.checked}
        disabled={!!props.disabled}
      />
    </ListItemIcon>
    <ListItemText>{props.text}</ListItemText>
    <Dialog open={isDescriptionOpen}>
      <DialogTitle>{props.text}</DialogTitle>
      <DialogContent>
        {props.description}
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"info"} onClick={()=>setIsDescriptionOpen(false)}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  </ListItem>
}

const SendConfirmationDialog = (props: {data: DataToBeSent, sendTo: {lineUserId: string, displayName: string}, onClose: () => void}) => {
  return <Dialog open={true} maxWidth={"md"}>
    <DialogTitle>送信内容を確認してください</DialogTitle>
    <DialogContent>
      <Stack sx={{width: 500, p: 1}} spacing={2}>
        <Stack direction={"row"} spacing={1} sx={{alignItems: "center"}}>
          <Chip
            label={props.sendTo.displayName}
          />
          <Typography variant={"body1"}>に以下のメッセージを送信する</Typography>
        </Stack>
        <TextField
          multiline={true}
          rows={10}
          disabled={true}
          value={props.data.messageText}
          fullWidth={true}
        />
        <List>
          <OptionListItem
            text={"確認を求める"}
            description={"「確認を求める」にチェックを入れて送信すると、メッセージ本文が送信された直後に確認を求めるボタンがユーザーに表示されます。" +
              "ユーザーがボタンを押して確認したことがシステム上把握できます。"}
            onChange={()=>{}}
            checked={props.data.requestConfirmation}
            disabled={true}
          />
        </List>
        <Typography variant={"body2"} sx={{color: "red", fontWeight: "bold"}}>
          一度送信されたメッセージを取り消すことはできません。送信の前に十分確認してください。
        </Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} sx={{p: 1}}>
        <Button variant={"contained"} onClick={props.onClose}>戻る</Button>
        <Button variant={"contained"} color={"success"} disabled={true}>送信する</Button>
      </Stack>
    </DialogContent>
  </Dialog>
}

const schema = yup.object({
  messageText: yup.string().required("本文は必須です").min(1, "本文は必須です"),
  requestConfirmation: yup.boolean(),
})

export const SendMessageTab = (props: {lineUserId: string}) => {
  const {register, handleSubmit, formState: {errors}, control} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      requestConfirmation: false,
      messageText: "",
    }
  })
  const onSubmit = (data: any) => {
    setDataToBeSent(data)
  }
  const [dataToBeSent, setDataToBeSent] = React.useState<DataToBeSent|null>(null)
  const onConfirmationDialogClose = () => setDataToBeSent(null)
  
  return <Stack spacing={2} sx={{p: 2}}>
    <Typography variant={"body1"}>
      {props.lineUserId} さんにメッセージを送信します。
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <TextField
          InputLabelProps={{
            shrink: true
          }}
          label={"メッセージ本文"}
          fullWidth={true}
          multiline={true}
          minRows={10}
          {...register("messageText")}
          error={!!errors.messageText}
          helperText={errors.messageText?.message as string}
        />
      </Stack>
      <Stack pt={2}>
        <Typography variant={"body1"} sx={{fontWeight: "bold"}}>オプション</Typography>
        <List>
          <Controller
            name={"requestConfirmation"}
            control={control}
            render={({field}) => (
              <OptionListItem
                text={"確認を求める"}
                description={"「確認を求める」にチェックを入れて送信すると、メッセージ本文が送信された直後に確認を求めるボタンがユーザーに表示されます。" +
                  "ユーザーがボタンを押して確認したことがシステム上把握できます。"}
                onChange={field.onChange}
                checked={field.value}
              />
            )}
          />
        </List>
      </Stack>
      <Box sx={{display: "flex", justifyContent: "end"}}>
        <Button variant={"contained"} color={"success"} type={"submit"}>送信</Button>
      </Box>
    </form>
    {dataToBeSent && <SendConfirmationDialog
        data={dataToBeSent}
        sendTo={{
          lineUserId: props.lineUserId,
          displayName: "unknown"
        }}
        onClose={onConfirmationDialogClose}
    />}
  </Stack>
}