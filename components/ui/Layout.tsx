import {Box, Paper} from "@mui/material"
import {AppBar} from "./AppBar"
import React from "react"

export const Layout = (props: {children: React.ReactNode}) => {
  return <Box sx={{backgroundColor: "gainsboro", minHeight: "100vh"}}>
    <AppBar />
    <Paper sx={{maxWidth: 1200, marginLeft: "auto", marginRight: "auto", p: 1}} elevation={0}>
      {props.children}
    </Paper>
  </Box>
}