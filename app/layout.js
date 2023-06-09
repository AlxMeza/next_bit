import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

/*---- PrimeReact -----*/
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css"     
//core
import "primereact/resources/primereact.min.css"
import 'primeicons/primeicons.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
