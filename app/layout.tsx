import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AGC NewsNet - Latest News from Africa and Beyond",
  description:
    "Stay updated with the latest news from Africa, politics, business, sports, health, technology and more.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
