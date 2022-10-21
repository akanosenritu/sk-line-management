import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {Session} from "next-auth"
import {SnackbarProvider} from "notistack"
import {createTheme, ThemeProvider} from "@mui/material"
import {SWRConfig} from "swr"

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
        <SWRConfig value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>
          <Component {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </SnackbarProvider>
  </SessionProvider>
}

export default MyApp