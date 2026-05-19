import './globals.css'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'

export const metadata = {
  title: 'Beyond Reach',
  description: 'Precision Engineering & Design',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700&family=Caveat:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
