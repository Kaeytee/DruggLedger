import type React from "react"
import { cookies } from "next/headers"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { LanguageProvider } from "@/lib/i18n/index"
// Import the AvatarProvider
import { AvatarProvider } from "@/lib/avatar-context"
import "./globals.css"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the sidebar state from cookies for SSR
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value !== "false"

  // Update the return statement to include AvatarProvider
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>DrugLedger - Pharmaceutical Supply Chain Tracking</title>
        <meta name="description" content="Decentralized pharmaceutical supply chain tracking application" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LanguageProvider>
            <AvatarProvider>
              <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <SidebarInset className="bg-transparent">
                  <main className="container mx-auto p-4 md:p-6">{children}</main>
                </SidebarInset>
              </SidebarProvider>
              <Toaster />
            </AvatarProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
