import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {Session} from "next-auth"
import {SnackbarProvider} from "notistack"
import {createTheme, ThemeProvider} from "@mui/material"

const theme = createTheme({
  palette: {
    mode: "light"
  }
})


function MyApp({ Component, pageProps: {
  session, ...pageProps
} }: AppProps<{session: Session}>) {
  return <SessionProvider session={session}>
    <SnackbarProvider maxSnack={3} dense={true}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SnackbarProvider>
  </SessionProvider>
}

export default MyApp