import './globals.css'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'

export const metadata = {
  title: 'Beyond Reach',
  description: 'Precision Engineering & Design',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
