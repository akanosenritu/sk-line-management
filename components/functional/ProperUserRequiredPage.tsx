import {Box, CircularProgress, Typography} from "@mui/material"
import React from "react"
import {useUser} from "../../hooks/useUser"

export const ProperUserRequiredPage = (props: {children: React.ReactNode}) => {
  const {data: user, isLoggedOut, isLoading} = useUser()

  if (isLoggedOut) {
    return <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: 500}}>
      <Typography variant={"h4"}>ログインしてください。</Typography>
    </Box>
  }

  if (isLoading || !user) {
    return <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: 500}}>
      <CircularProgress />
    </Box>
  }

  if (user.isGuest) {
    return <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: 500}}>
      <Typography variant={"h4"}>ゲストユーザーの閲覧が許可されていないページです。</Typography>
    </Box>
  }

  return <>{props.children}</>
}