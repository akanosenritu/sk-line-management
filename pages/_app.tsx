import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {Session} from "next-auth"
import {SnackbarProvider} from "notistack"

function MyApp({ Component, pageProps: {
  session, ...pageProps
} }: AppProps<{session: Session}>) {
  return <SessionProvider session={session}>
    <SnackbarProvider maxSnack={3} dense={true}>
      <Component {...pageProps} />
    </SnackbarProvider>
  </SessionProvider>
}

export default MyApp