"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { ConnectButton } from '@mysten/dapp-kit'
import { useCurrentAccount } from '@mysten/dapp-kit'

// Define wallet addresses for each role
const WALLET_ROLES: Record<string, string> = {
  "0x123": "admin",
  "0x456": "manufacturer",
  "0x789": "regulator",
  "0xabc": "distributor",
  // Default public role for other addresses
}

export default function LoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [manualAddress, setManualAddress] = useState("")
  const [error, setError] = useState("")
  const [connectionMethod, setConnectionMethod] = useState<"auto" | "manual">("auto")
  const router = useRouter()
  const { toast } = useToast()
  
  // Get the current connected account from Sui
  const currentAccount = useCurrentAccount()
  
  // Update wallet connection state when Sui wallet connects
  useEffect(() => {
    if (currentAccount && connectionMethod === "auto") {
      const suiAddress = currentAccount.address
      setWalletAddress(suiAddress)
      setIsConnected(true)
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${suiAddress.substring(0, 6)}...${suiAddress.substring(suiAddress.length - 4)}`,
      })
      
      // Detect role based on address
      detectAndRedirect(suiAddress)
    }
  }, [currentAccount])

  // Function to detect role and redirect user
  const detectAndRedirect = (address: string) => {
    try {
      // Check if it's one of our predefined addresses
      const role = WALLET_ROLES[address] || "public"

      // Store the role in localStorage for persistence across page refreshes
      if (typeof window !== "undefined") {
        localStorage.setItem("userRole", role)
      }

      toast({
        title: "Role Detected",
        description: `You have been identified as: ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      })

      // Redirect to the appropriate dashboard
      setTimeout(() => {
        router.push(`/${role}/dashboard`)
      }, 1000)
    } catch (error) {
      console.error("Error during role detection:", error)
      toast({
        title: "Error Detecting Role",
        description: "There was a problem detecting your role. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Simulate wallet connection and role detection for manual mode
  const connectWallet = async () => {
    setError("")
    setIsConnecting(true)

    // Determine which address to use
    const addressToUse = manualAddress

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setWalletAddress(addressToUse)
    setIsConnected(true)
    setIsConnecting(false)

    toast({
      title: "Wallet Connected",
      description: `Connected to ${addressToUse.substring(0, 6)}...${addressToUse.substring(addressToUse.length - 4)}`,
    })

    // Detect role based on address
    setTimeout(() => {
      detectAndRedirect(addressToUse)
    }, 1000)
  }

  // Validate manual address
  const validateAddress = () => {
    if (!manualAddress) {
      setError("Please enter a wallet address")
      return false
    }

    // Basic validation - in a real app, you'd have more robust validation
    if (!manualAddress.startsWith("0x") || manualAddress.length < 4) {
      setError("Please enter a valid wallet address")
      return false
    }

    setError("")
    return true
  }

  // Handle manual connection
  const handleManualConnect = () => {
    if (validateAddress()) {
      connectWallet()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <GlassContainer className="max-w-md w-full p-8">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-cyan-400">Connect Your Wallet</h1>
          <p className="text-slate-300">
            Connect your wallet to access the DrugLedger platform. Your role will be automatically detected.
          </p>

          <div className="flex justify-center space-x-2 mb-4">
            <Button
              variant={connectionMethod === "auto" ? "default" : "outline"}
              onClick={() => setConnectionMethod("auto")}
              className={
                connectionMethod === "auto" ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "border-slate-700"
              }
            >
              Auto Connect
            </Button>
            <Button
              variant={connectionMethod === "manual" ? "default" : "outline"}
              onClick={() => setConnectionMethod("manual")}
              className={
                connectionMethod === "manual" ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "border-slate-700"
              }
            >
              Manual Connect
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 blur-xl"></div>
            {isConnected ? (
              <div className="space-y-4 relative">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-300">Connected Wallet</p>
                  <p className="font-mono text-cyan-400">
                    {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button disabled className="relative">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Detecting Role...
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative space-y-4">
                {connectionMethod === "manual" && (
                  <div className="space-y-2">
                    <div className="text-left">
                      <label className="text-sm font-medium text-slate-300">Enter Wallet Address</label>
                      <Input
                        placeholder="0x..."
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 mt-1"
                      />
                      {error && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {error}
                        </p>
                      )}
                    </div>

                    <div className="text-left">
                      <p className="text-xs text-slate-400 mb-1">Quick Access (for demo):</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setManualAddress("0x123")}
                          className="text-xs justify-start border-slate-700 h-7"
                        >
                          Admin (0x123)
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setManualAddress("0x456")}
                          className="text-xs justify-start border-slate-700 h-7"
                        >
                          Manufacturer (0x456)
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setManualAddress("0x789")}
                          className="text-xs justify-start border-slate-700 h-7"
                        >
                          Regulator (0x789)
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setManualAddress("0xabc")}
                          className="text-xs justify-start border-slate-700 h-7"
                        >
                          Distributor (0xabc)
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {connectionMethod === "auto" ? (
                  <div className="flex justify-center">
                    <div className="transform transition-all hover:scale-105">
                      <ConnectButton connectText="Connect Sui Wallet" 
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all hover:shadow-[0_0_15px_rgba(0,194,214,0.5)]" />
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={handleManualConnect}
                    disabled={isConnecting}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,194,214,0.5)]"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Connect Manually"
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          <p className="text-sm text-slate-400">By connecting, you agree to the terms of service and privacy policy.</p>
        </div>
      </GlassContainer>
    </div>
  )
}