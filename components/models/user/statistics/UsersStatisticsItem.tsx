import {Paper, Typography} from "@mui/material"

export const UsersStatisticsItem = (props: {name: string, main: number}) => {
  return <Paper elevation={2} sx={{display: "flex", alignItems: "center", flexDirection: "column", p: 2, width: 120, height: 100}}>
    <Typography variant={"body2"}>{props.name}</Typography>
    <Typography variant={"h4"}>{props.main}</Typography>
  </Paper>
}