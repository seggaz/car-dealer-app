import './globals.css'

export const Metadata = {
  title: 'Car Dealer App',
  description: 'Discover the best cars in the world.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">{children}</body>
    </html>
  )
}
