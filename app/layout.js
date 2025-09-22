import './globals.css'

export const metadata = {
  title: 'ZERKER - Autonomous Trust for the Digital Age',
  description: 'Interactive investor pitch deck for ZERKER',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}