
'use client'
import { SessionProvider } from "next-auth/react"



// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>

          {children}

        </SessionProvider>

      </body>


    </html>
  )
}

