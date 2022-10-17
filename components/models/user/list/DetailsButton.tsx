import {Button} from "@mui/material"
import {useRouter} from "next/router"

export const DetailsButton = (props: {lineUserId: string}) => {
  const router = useRouter()
  const onClick = async () => {
    await router.push(`users/line/${props.lineUserId}`)
  }
  return <Button size={"small"} variant={"contained"} onClick={onClick}>詳細</Button>
}