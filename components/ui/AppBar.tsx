import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material"
import {signIn, signOut} from "next-auth/react"
import Link from "next/link"
import {useUser} from "../../hooks/useUser"

export const AppBar = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  const {data: user} = useUser()
  return <Box sx={{display: "flex", alignItems: "center", width: "100%", backgroundColor: "#24292f", color: "white", height: "3rem"}}>
    <Box>
      <Typography variant={"h5"}>LINE 管理ツール v0.1</Typography>
    </Box>
    {matches && <Box sx={{flexGrow: 1, display: "flex", justifyContent: "start", "&>.MuiTypography-root": {mx: 5}}}>
      <Typography variant={"h6"} sx={{"&:hover": {borderBottom: "1px solid white"}}}>
        <Link href={"/users"}>ユーザー管理</Link>
      </Typography>
    </Box>}
    {matches && <Box sx={{display: "flex", alignItems: "center"}}>
      {!user && <Button variant={"contained"} color={"success"} size={"small"} onClick={()=>signIn()}>ログイン</Button>}
      {user && <Typography variant={"body2"} sx={{mx: 1}}>{user.mail}</Typography>}
      {user && <Button variant={"contained"} size={"small"} onClick={()=>signOut()}>ログアウト</Button>}
    </Box>}
  </Box>
}