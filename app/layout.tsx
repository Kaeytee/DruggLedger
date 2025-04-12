"use client";

import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { LanguageProvider } from "@/lib/i18n";
import { AvatarProvider } from "@/lib/avatar-context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import '@mysten/dapp-kit/dist/index.css';
import "./globals.css";

// Create QueryClient instance outside component
const queryClient = new QueryClient();

// Define networks config outside component
const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Remove the async and direct cookie access
  // We'll need to handle this differently in a client component

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
          <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networks} defaultNetwork="devnet">
              <WalletProvider autoConnect>
                <LanguageProvider>
                  <AvatarProvider>
                    <SidebarProvider defaultOpen={true}>
                      <AppSidebar />
                      <SidebarInset className="bg-transparent">
                        <main className="container mx-auto p-4 md:p-6">{children}</main>
                      </SidebarInset>
                    </SidebarProvider>
                    <Toaster />
                  </AvatarProvider>
                </LanguageProvider>
              </WalletProvider>
            </SuiClientProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

