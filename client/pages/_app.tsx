import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ProtectedRoute } from '@/components';


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <>
      {
        router.pathname === "/" ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )
      }
    </>
  )
}
