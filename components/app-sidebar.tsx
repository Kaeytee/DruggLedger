"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
  SidebarMenuBadge,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Home,
  Users,
  Settings,
  FlaskRoundIcon as Flask,
  ClipboardCheck,
  Truck,
  AlertTriangle,
  FileText,
  BarChart3,
  LogOut,
  Search,
  User,
  Bell,
  Shield,
  Database,
  HelpCircle,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { useAvatar } from "@/lib/avatar-context"
import { AvatarSelector } from "@/components/avatar-selector"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [role, setRole] = useState<string | null>(null)
  const { state, toggleSidebar } = useSidebar()
  const [unreadCount, setUnreadCount] = useState(3) // Mock unread notifications count
  const { currentAvatar, setCurrentAvatar } = useAvatar()
  const [profileData, setProfileData] = useState<{ name: string } | null>(null)

  // Determine user role based on URL path
  useEffect(() => {
    // Extract the first segment of the path to determine role
    const pathSegments = pathname.split("/").filter(Boolean)
    const possibleRole = pathSegments.length > 0 ? pathSegments[0] : null

    // Check if the possible role is one of our valid roles
    const validRoles = ["admin", "manufacturer", "regulator", "distributor", "public"]

    if (possibleRole && validRoles.includes(possibleRole)) {
      setRole(possibleRole)
      // Store the detected role in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("userRole", possibleRole)
      }
    } else {
      // If we're on a non-role specific page like settings or profile
      // Try to get the role from localStorage
      if (typeof window !== "undefined") {
        const storedRole = localStorage.getItem("userRole")
        if (storedRole && validRoles.includes(storedRole)) {
          setRole(storedRole)
        } else {
          setRole(null)
        }
      } else {
        setRole(null)
      }
    }

    // Load profile data from localStorage
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("userProfile")
      if (storedProfile) {
        try {
          setProfileData(JSON.parse(storedProfile))
        } catch (e) {
          console.error("Failed to parse profile data", e)
        }
      }
    }
  }, [pathname])

  // Don't show sidebar on login or home page
  if (pathname === "/" || pathname === "/login") {
    return null
  }

  const handleLogout = () => {
    // Clear the stored role
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole")
    }

    toast({
      title: t("loggedOutSuccessfully"),
      description: t("loggedOutDescription"),
    })

    // Redirect to home page
    router.push("/")
  }

  // Admin navigation links - always visible when in admin section
  const adminLinks = [
    { href: "/admin/dashboard", icon: <Home className="h-5 w-5" />, label: t("dashboard") },
    { href: "/admin/roles", icon: <Users className="h-5 w-5" />, label: t("roleManagement") },
    { href: "/admin/upgrades", icon: <Shield className="h-5 w-5" />, label: t("systemUpgrades") },
    { href: "/admin/analytics", icon: <BarChart3 className="h-5 w-5" />, label: t("analytics") },
    { href: "/admin/database", icon: <Database className="h-5 w-5" />, label: t("database") },
  ]

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 overflow-hidden rounded-md">
              <img src="/images/logo.png" alt="DrugLedger Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 group-data-[collapsible=icon]:hidden">
              DrugLedger
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hidden md:flex group-data-[state=expanded]:hidden"
              onClick={toggleSidebar}
              aria-label="Expand sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hidden md:flex group-data-[state=collapsed]:hidden"
              onClick={toggleSidebar}
              aria-label="Collapse sidebar"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="px-2 pb-2 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder={t("search")} className="pl-10 bg-slate-800/50 border-slate-700 h-9" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Common Navigation */}
        <SidebarMenu>
          <div className="px-3 py-2 group-data-[collapsible=icon]:hidden">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("general")}</h3>
          </div>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={role ? pathname === `/${role}/dashboard` : false}
              tooltip={t("dashboard")}
            >
              <Link href={role ? `/${role}/dashboard` : "/login"}>
                <Home className="h-5 w-5" />
                <span>{t("dashboard")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/profile"} tooltip={t("profile")}>
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span>{t("profile")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/notifications"} tooltip={t("notifications")}>
              <Link href="/notifications">
                <div className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge
                      className={cn(
                        "absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center bg-cyan-500 text-[10px]",
                        "group-data-[collapsible=icon]:top-0 group-data-[collapsible=icon]:right-0",
                      )}
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </div>
                <span>{t("notifications")}</span>
              </Link>
            </SidebarMenuButton>
            {state === "collapsed" && unreadCount > 0 && <SidebarMenuBadge>{unreadCount}</SidebarMenuBadge>}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip={t("settings")}>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span>{t("settings")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Admin Navigation - Always show all links when in admin section */}
        {role === "admin" && (
          <SidebarMenu>
            <div className="px-3 py-2 group-data-[collapsible=icon]:hidden">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("administration")}</h3>
            </div>
            {adminLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.label}>
                  <Link href={link.href}>
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}

        {/* Manufacturer Navigation */}
        {role === "manufacturer" && (
          <SidebarMenu>
            <div className="px-3 py-2 group-data-[collapsible=icon]:hidden">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("manufacturing")}</h3>
            </div>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/manufacturer/register"}
                tooltip={t("registerProduct")}
              >
                <Link href="/manufacturer/register">
                  <Flask className="h-5 w-5" />
                  <span>{t("registerProduct")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/manufacturer/products"} tooltip={t("myProducts")}>
                <Link href="/manufacturer/products">
                  <FileText className="h-5 w-5" />
                  <span>{t("myProducts")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/manufacturer/analytics"} tooltip={t("analytics")}>
                <Link href="/manufacturer/analytics">
                  <BarChart3 className="h-5 w-5" />
                  <span>{t("analytics")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        {/* Regulator Navigation */}
        {role === "regulator" && (
          <SidebarMenu>
            <div className="px-3 py-2 group-data-[collapsible=icon]:hidden">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("regulation")}</h3>
            </div>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/regulator/issues"} tooltip={t("issueTracker")}>
                <Link href="/regulator/issues">
                  <AlertTriangle className="h-5 w-5" />
                  <span>{t("issueTracker")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/regulator/audit"} tooltip={t("auditTrail")}>
                <Link href="/regulator/audit">
                  <ClipboardCheck className="h-5 w-5" />
                  <span>{t("auditTrail")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/regulator/analytics"} tooltip={t("analytics")}>
                <Link href="/regulator/analytics">
                  <BarChart3 className="h-5 w-5" />
                  <span>{t("analytics")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        {/* Distributor Navigation */}
        {role === "distributor" && (
          <SidebarMenu>
            <div className="px-3 py-2 group-data-[collapsible=icon]:hidden">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("distribution")}</h3>
            </div>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/distributor/track"} tooltip={t("shipmentTracking")}>
                <Link href="/distributor/track">
                  <Truck className="h-5 w-5" />
                  <span>{t("shipmentTracking")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/distributor/analytics"} tooltip={t("analytics")}>
                <Link href="/distributor/analytics">
                  <BarChart3 className="h-5 w-5" />
                  <span>{t("analytics")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        {/* Public Navigation */}
        {role === "public" && (
          <SidebarMenu>
            <div className="px-3 py-2 group-data-[collapsible=icon]:hidden">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("publicAccess")}</h3>
            </div>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/public/report"} tooltip={t("reportIssue")}>
                <Link href="/public/report">
                  <AlertTriangle className="h-5 w-5" />
                  <span>{t("reportIssue")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/public/search"} tooltip={t("searchProducts")}>
                <Link href="/public/search">
                  <Search className="h-5 w-5" />
                  <span>{t("searchProducts")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/public/faq"} tooltip={t("faq")}>
                <Link href="/public/faq">
                  <HelpCircle className="h-5 w-5" />
                  <span>{t("faq")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        {/* Help & Resources - Common for all roles */}
        <SidebarMenu>
          <div className="px-3 py-2 group-data-[collapsible=icon]:hidden">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("resources")}</h3>
          </div>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/help"} tooltip={t("help")}>
              <Link href="/help">
                <HelpCircle className="h-5 w-5" />
                <span>{t("help")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2 space-y-2">
          <div className="flex items-center gap-2 p-2 rounded-md bg-slate-800/50">
            <AvatarSelector
              selectedAvatarId={currentAvatar.id}
              onAvatarChange={setCurrentAvatar}
              size="sm"
              showEditOverlay={false}
            />
            <div className="flex-1 truncate group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium text-white truncate">{profileData?.name || "User"}</p>
              <p className="text-xs text-slate-400 truncate">{role ? t(role) : ""}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start border-slate-700 text-slate-300 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
            <span className="group-data-[collapsible=icon]:hidden">{t("logout")}</span>
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
