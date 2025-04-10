"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Building,
  MapPin,
  Phone,
  Shield,
  Key,
  Save,
  AlertTriangle,
  Bell,
  Eye,
  EyeOff,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AvatarSelector } from "@/components/avatar-selector"
import type { Avatar as AvatarType } from "@/lib/avatars"
import { useLanguage } from "@/lib/i18n"
import { useAvatar } from "@/lib/avatar-context"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()
  const { currentAvatar, setCurrentAvatar } = useAvatar()
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>(currentAvatar)

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "PharmaCorp Inc.",
    role: "Manufacturer",
    walletAddress: "0x456",
    phone: "+1 (555) 123-4567",
    address: "123 Pharma Street, New York, NY 10001",
    bio: "Senior Product Manager at PharmaCorp Inc. with over 10 years of experience in pharmaceutical manufacturing and distribution.",
    notifications: {
      email: true,
      push: true,
      shipments: true,
      updates: false,
      marketing: false,
    },
    security: {
      twoFactor: false,
      passwordLastChanged: "2023-09-15",
    },
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (field: string, value: string | boolean) => {
    setProfileData({
      ...profileData,
      [field]: value,
    })
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setProfileData({
      ...profileData,
      notifications: {
        ...profileData.notifications,
        [field]: value,
      },
    })
  }

  const handleSecurityChange = (field: string, value: boolean) => {
    setProfileData({
      ...profileData,
      security: {
        ...profileData.security,
        [field]: value,
      },
    })
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData({
      ...passwordData,
      [field]: value,
    })
  }

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Save profile data to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          role: profileData.role,
        }),
      )
    }

    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: t("profileUpdated"),
        description: t("profileUpdateSuccess"),
      })
      setIsSaving(false)
      setIsEditing(false)
    }, 1500)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: t("passwordsDontMatch"),
        description: t("passwordsDoNotMatch"),
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: t("passwordTooShort"),
        description: t("passwordMustBeAtLeast8Chars"),
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: t("passwordChanged"),
        description: t("passwordChangedSuccess"),
      })
      setIsSaving(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Update last changed date
      setProfileData({
        ...profileData,
        security: {
          ...profileData.security,
          passwordLastChanged: new Date().toISOString().split("T")[0],
        },
      })
    }, 1500)
  }

  const handleAvatarChange = (avatar: AvatarType) => {
    setSelectedAvatar(avatar)
    setCurrentAvatar(avatar)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{t("myProfile")}</h1>
          <p className="text-slate-300">{t("manageYourAccountSettings")}</p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
          disabled={isSaving}
          className={isEditing ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-slate-700"}
        >
          {isEditing ? (
            isSaving ? (
              <>{t("saving")}...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {t("saveChanges")}
              </>
            )
          ) : (
            t("editProfile")
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassContainer className="lg:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="bg-slate-800/50 mb-4">
              <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
                {t("profile")}
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-slate-700">
                {t("security")}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
                {t("notifications")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{t("fullName")}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder={t("yourFullName")}
                      value={profileData.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 bg-slate-800/50 border-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{t("emailAddress")}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="email"
                      placeholder={t("yourEmailAddress")}
                      value={profileData.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 bg-slate-800/50 border-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{t("company")}</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder={t("yourCompanyName")}
                      value={profileData.company}
                      onChange={(e) => handleProfileChange("company", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 bg-slate-800/50 border-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{t("phoneNumber")}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder={t("yourPhoneNumber")}
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 bg-slate-800/50 border-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-300">{t("address")}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Textarea
                      placeholder={t("yourAddress")}
                      value={profileData.address}
                      onChange={(e) => handleProfileChange("address", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 bg-slate-800/50 border-slate-700 min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-300">{t("bio")}</label>
                  <Textarea
                    placeholder={t("tellUsAboutYourself")}
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    disabled={!isEditing}
                    className="bg-slate-800/50 border-slate-700 min-h-[120px]"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-0 space-y-6">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-4">
                <h3 className="font-medium text-white">{t("changePassword")}</h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t("currentPassword")}</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("enterYourCurrentPassword")}
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                        className="pl-10 pr-10 bg-slate-800/50 border-slate-700"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-slate-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t("newPassword")}</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("enterYourNewPassword")}
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                        className="pl-10 bg-slate-800/50 border-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t("confirmNewPassword")}</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("confirmYourNewPassword")}
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                        className="pl-10 bg-slate-800/50 border-slate-700"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={
                        isSaving ||
                        !passwordData.currentPassword ||
                        !passwordData.newPassword ||
                        !passwordData.confirmPassword
                      }
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      {isSaving ? t("changingPassword") : t("changePassword")}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-4">
                <h3 className="font-medium text-white">{t("twoFactorAuthentication")}</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-slate-300">{t("enhanceYourAccountSecurity")}</p>
                    <p className="text-xs text-slate-400">{t("requireVerificationCode")}</p>
                  </div>
                  <Switch
                    checked={profileData.security.twoFactor}
                    onCheckedChange={(checked) => handleSecurityChange("twoFactor", checked)}
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-4">
                <h3 className="font-medium text-white">{t("securityInformation")}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">{t("walletAddress")}</span>
                    <span className="font-mono text-cyan-400">{profileData.walletAddress}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">{t("role")}</span>
                    <span className="text-slate-300">{t(profileData.role.toLowerCase())}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">{t("passwordLastChanged")}</span>
                    <span className="text-slate-300">{profileData.security.passwordLastChanged}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0 space-y-6">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-4">
                <h3 className="font-medium text-white">{t("notificationPreferences")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-300">{t("emailNotifications")}</Label>
                      <p className="text-xs text-slate-400">{t("receiveEmailNotifications")}</p>
                    </div>
                    <Switch
                      checked={profileData.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-300">{t("pushNotifications")}</Label>
                      <p className="text-xs text-slate-400">{t("receiveNotificationsOnDevice")}</p>
                    </div>
                    <Switch
                      checked={profileData.notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-300">{t("shipmentUpdates")}</Label>
                      <p className="text-xs text-slate-400">{t("receiveShipmentStatusNotifications")}</p>
                    </div>
                    <Switch
                      checked={profileData.notifications.shipments}
                      onCheckedChange={(checked) => handleNotificationChange("shipments", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-300">{t("systemUpdates")}</Label>
                      <p className="text-xs text-slate-400">{t("receiveSystemUpdateNotifications")}</p>
                    </div>
                    <Switch
                      checked={profileData.notifications.updates}
                      onCheckedChange={(checked) => handleNotificationChange("updates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-300">{t("marketingCommunications")}</Label>
                      <p className="text-xs text-slate-400">{t("receiveMarketingMaterials")}</p>
                    </div>
                    <Switch
                      checked={profileData.notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-4">
                <h3 className="font-medium text-white">{t("recentNotifications")}</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-500/20">
                      <Bell className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t("newShipmentAssigned")}</p>
                      <p className="text-xs text-slate-400">{t("shipmentAssignedMessage", { id: "SHP-2023-007" })}</p>
                      <p className="text-xs text-slate-500 mt-1">{t("hoursAgo", { hours: 2 })}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 flex items-start gap-3">
                    <div className="p-2 rounded-full bg-green-500/20">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t("shipmentDelivered")}</p>
                      <p className="text-xs text-slate-400">{t("shipmentDeliveredMessage", { id: "SHP-2023-002" })}</p>
                      <p className="text-xs text-slate-500 mt-1">{t("daysAgo", { days: 1 })}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 flex items-start gap-3">
                    <div className="p-2 rounded-full bg-amber-500/20">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t("systemMaintenance")}</p>
                      <p className="text-xs text-slate-400">{t("maintenanceMessage")}</p>
                      <p className="text-xs text-slate-500 mt-1">{t("daysAgo", { days: 3 })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </GlassContainer>

        <GlassContainer>
          <div className="flex flex-col items-center text-center space-y-4">
            <AvatarSelector selectedAvatarId={selectedAvatar.id} onAvatarChange={handleAvatarChange} size="lg" />

            <div>
              <h2 className="text-xl font-semibold text-white">{profileData.name}</h2>
              <p className="text-slate-400">{t(profileData.role.toLowerCase())}</p>
            </div>

            {isEditing && (
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                {t("changePhoto")}
              </Button>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2">
              <h3 className="font-medium text-white text-sm">{t("accountInformation")}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-slate-400" />
                  <span className="text-slate-300">{profileData.email}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-slate-400" />
                  <span className="text-slate-300">{profileData.company}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-slate-400" />
                  <span className="text-slate-300">{profileData.phone}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2">
              <h3 className="font-medium text-white text-sm">{t("recentActivity")}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <FileText className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-slate-300">{t("updatedProductInformation")}</p>
                    <p className="text-xs text-slate-500">{t("hoursAgo", { hours: 2 })}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-slate-300">{t("loggedInFromNewDevice")}</p>
                    <p className="text-xs text-slate-500">{t("yesterdayAt", { time: "3:45 PM" })}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-slate-300">{t("changedPassword")}</p>
                    <p className="text-xs text-slate-500">{t("daysAgo", { days: 3 })}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="outline" className="w-full justify-start border-slate-700 text-slate-300">
                <Clock className="mr-2 h-4 w-4" />
                {t("viewActivityLog")}
              </Button>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  )
}
