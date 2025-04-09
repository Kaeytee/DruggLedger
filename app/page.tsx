import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { GlassCard } from "@/components/glass-card"
import { GlassContainer } from "@/components/glass-container"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Shield,
  FileText,
  FlaskRoundIcon as Flask,
  Truck,
  ClipboardCheck,
  CheckCircle,
  BarChart3,
  Lock,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[80vh] space-y-12">
      {/* Hero Section */}
      <div className="relative">
        {/* Background gradient effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 py-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-2">
              Blockchain-Powered Supply Chain
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                DrugLedger
              </span>
              <span className="text-white"> Platform</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              A secure, transparent, and decentralized pharmaceutical supply chain tracking platform that ensures
              product integrity from manufacturer to consumer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ConnectWalletButton />
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 rounded-lg text-lg"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4 text-sm text-slate-400">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                Secure
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                Transparent
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                Immutable
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                Compliant
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 blur-xl"></div>
            <GlassContainer className="relative p-0 overflow-hidden rounded-2xl border-slate-700/50 shadow-xl">
              <div className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-lg text-white">DrugLedger</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Live Demo</div>
                  </div>
                </div>
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="DrugLedger Platform Dashboard"
                  className="w-full h-auto rounded-lg border border-slate-700/50 shadow-lg"
                />
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/30 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-cyan-400">42</div>
                    <div className="text-xs text-slate-400">Products</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/30 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-cyan-400">18</div>
                    <div className="text-xs text-slate-400">Shipments</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/30 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-cyan-400">96%</div>
                    <div className="text-xs text-slate-400">Verified</div>
                  </div>
                </div>
              </div>
            </GlassContainer>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Comprehensive Supply Chain Management</h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            DrugLedger provides end-to-end visibility and control across the entire pharmaceutical supply chain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,194,214,0.2)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-2">
                <Flask className="h-6 w-6 text-cyan-400" />
              </div>
              <CardTitle className="text-cyan-400">Manufacturers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Register products and manage their lifecycle from production to recall.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Product registration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Batch tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Quality assurance
                </li>
              </ul>
            </CardContent>
          </GlassCard>

          <GlassCard className="transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,194,214,0.2)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center mb-2">
                <ClipboardCheck className="h-6 w-6 text-green-400" />
              </div>
              <CardTitle className="text-green-400">Regulators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">Monitor compliance, track issues, and verify product authenticity.</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Compliance monitoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Issue tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Audit trails
                </li>
              </ul>
            </CardContent>
          </GlassCard>

          <GlassCard className="transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,194,214,0.2)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center mb-2">
                <Truck className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-purple-400">Distributors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Track shipments and ensure product integrity throughout distribution.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Shipment tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Temperature monitoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Chain of custody
                </li>
              </ul>
            </CardContent>
          </GlassCard>

          <GlassCard className="transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,194,214,0.2)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center mb-2">
                <Globe className="h-6 w-6 text-amber-400" />
              </div>
              <CardTitle className="text-amber-400">Public</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">Verify product authenticity and report quality or safety concerns.</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Product verification
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Issue reporting
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Recall notifications
                </li>
              </ul>
            </CardContent>
          </GlassCard>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <GlassContainer className="p-6 h-full">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Why Choose DrugLedger?</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <Lock className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Enhanced Security</h3>
                      <p className="text-slate-300">
                        Immutable blockchain records ensure data integrity and prevent tampering.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Real-time Analytics</h3>
                      <p className="text-slate-300">
                        Comprehensive dashboards provide actionable insights across the supply chain.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Regulatory Compliance</h3>
                      <p className="text-slate-300">
                        Built-in compliance features help meet industry regulations and standards.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                    Explore Features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </GlassContainer>
          </div>

          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 blur-xl"></div>
              <GlassContainer className="relative p-6 border-slate-700/50">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">Try DrugLedger Today</h3>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Demo Available</div>
                  </div>

                  <p className="text-slate-300">
                    Experience the future of pharmaceutical supply chain management with our secure, transparent
                    platform.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/30">
                      <div className="text-lg font-semibold text-white mb-1">For Enterprises</div>
                      <p className="text-sm text-slate-400 mb-4">
                        Complete supply chain solution with custom integration
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      >
                        Contact Sales
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/30">
                      <div className="text-lg font-semibold text-white mb-1">For Developers</div>
                      <p className="text-sm text-slate-400 mb-4">
                        API access and developer tools to build on our platform
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      >
                        View Documentation
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <ConnectWalletButton />
                  </div>
                </div>
              </GlassContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              DrugLedger
            </span>
          </div>

          <div className="flex gap-6 text-slate-400 text-sm">
            <Link href="#" className="hover:text-white">
              About
            </Link>
            <Link href="#" className="hover:text-white">
              Features
            </Link>
            <Link href="#" className="hover:text-white">
              Documentation
            </Link>
            <Link href="#" className="hover:text-white">
              Contact
            </Link>
          </div>

          <div className="text-slate-500 text-sm">© 2023 DrugLedger. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

