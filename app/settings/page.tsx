"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlassContainer } from "@/components/glass-container"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage, type Language } from "@/lib/i18n"
import { AvatarSelector } from "@/components/avatar-selector"
import { avatars, type Avatar as AvatarType } from "@/lib/avatars"

export default function SettingsPage() {
  const { toast } = useToast()
  const { language, setLanguage, autoDetect, setAutoDetect, t, availableLanguages } = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language || 'en')
  const [autoDetectEnabled, setAutoDetectEnabled] = useState(autoDetect)
  
  // Fix: Check if avatars array exists and has elements before accessing [0]
  const defaultAvatar: AvatarType = {
    id: 'default',
    avatarUrl: '/default-avatar.png',
    nickname: 'Default'
  }
  
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>(
    avatars && avatars.length > 0 ? avatars[0] : defaultAvatar
  )

  useEffect(() => {
    if (language) {
      setSelectedLanguage(language)
    }
  }, [language])

  const handleSaveLanguageSettings = () => {
    if (autoDetectEnabled !== autoDetect) {
      setAutoDetect(autoDetectEnabled)
    }

    if (!autoDetectEnabled && selectedLanguage !== language) {
      setLanguage(selectedLanguage)
    }

    toast({
      title: t("settingsSaved"),
      description: t("languageSettingsSaved"),
    })
  }
  
  function handleAvatarChange(avatar: AvatarType): void {
    setSelectedAvatar(avatar)
    toast({
      title: t("avatarUpdated"),
      description: t("avatarChangeSuccess").replace("{nickname}", avatar.nickname),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{t("settings")}</h1>
        <p className="text-slate-300">{t("manageYourAccountSettings")}</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-[500px] bg-slate-800/50">
          <TabsTrigger value="account">{t("account")}</TabsTrigger>
          <TabsTrigger value="avatar">{t("avatar")}</TabsTrigger>
          <TabsTrigger value="language">{t("language")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="mt-6">
          <GlassContainer>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">{t("accountSettings")}</h2>
                <p className="text-slate-400 mt-1">{t("manageYourAccountInformation")}</p>
              </div>

              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedAvatar.avatarUrl} alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">John Doe</p>
                  <p className="text-sm text-slate-400">john.doe@example.com</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("name")}</Label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    defaultValue="John Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">{t("role")}</Label>
                  <select
                    id="role"
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    defaultValue="admin"
                  >
                    <option value="admin">{t("admin")}</option>
                    <option value="manufacturer">{t("manufacturer")}</option>
                    <option value="distributor">{t("distributor")}</option>
                    <option value="regulator">{t("regulator")}</option>
                  </select>
                </div>
              </div>

              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                onClick={() =>
                  toast({
                    title: t("settingsSaved"),
                    description: t("accountSettingsSaved"),
                  })
                }
              >
                {t("saveAccountSettings")}
              </Button>
            </div>
          </GlassContainer>
        </TabsContent>

        {/* Avatar Settings */}
        <TabsContent value="avatar" className="mt-6">
          <GlassContainer>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">{t("avatarSettings")}</h2>
                <p className="text-slate-400 mt-1">{t("chooseYourAvatar")}</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                {/* Fix: Check if AvatarSelector component exists before rendering */}
                {typeof AvatarSelector !== 'undefined' ? (
                  <AvatarSelector
                    selectedAvatarId={selectedAvatar.id}
                    onAvatarChange={handleAvatarChange}
                    className="mx-auto"
                  />
                ) : (
                  <div className="text-white">Avatar selector unavailable</div>
                )}
                <div className="text-center">
                  <h3 className="text-lg font-medium text-white">{selectedAvatar.nickname}</h3>
                  <p className="text-sm text-slate-400">{t("currentlySelected")}</p>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="font-medium text-white mb-2">{t("aboutAvatars")}</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• {t("avatarInfo1")}</li>
                  <li>• {t("avatarInfo2")}</li>
                  <li>• {t("avatarInfo3")}</li>
                </ul>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        {/* Language Settings */}
        <TabsContent value="language" className="mt-6">
          <GlassContainer>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">{t("languageSettings")}</h2>
                <p className="text-slate-400 mt-1">{t("chooseYourPreferredLanguage")}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-detect" checked={autoDetectEnabled} onCheckedChange={setAutoDetectEnabled} />
                  <Label htmlFor="auto-detect">{t("autoDetectLanguage")}</Label>
                </div>

                <div className={autoDetectEnabled ? "opacity-50 pointer-events-none" : ""}>
                  <Label className="block mb-3">{t("interfaceLanguage")}</Label>
                  <RadioGroup
                    value={selectedLanguage}
                    onValueChange={(value) => setSelectedLanguage(value as Language)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                  >
                    {/* Fix: Check if availableLanguages exists before mapping */}
                    {availableLanguages && Object.entries(availableLanguages).map(([code, name]) => (
                      <div
                        key={code}
                        className="flex items-center space-x-2 rounded-md border border-slate-700 p-3 bg-slate-800/50"
                      >
                        <RadioGroupItem value={code} id={`lang-${code}`} />
                        <Label htmlFor={`lang-${code}`} className="flex-1 cursor-pointer">
                          {name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <Button
                onClick={handleSaveLanguageSettings}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {t("saveLanguagePreferences")}
              </Button>
            </div>
          </GlassContainer>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6">
          <GlassContainer>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">{t("notificationSettings")}</h2>
                <p className="text-slate-400 mt-1">{t("manageYourNotificationPreferences")}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-md border border-slate-700 p-4 bg-slate-800/50">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t("emailNotifications")}</Label>
                    <p className="text-sm text-slate-400">{t("receiveEmailNotifications")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-md border border-slate-700 p-4 bg-slate-800/50">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t("systemAlerts")}</Label>
                    <p className="text-sm text-slate-400">{t("receiveSystemAlerts")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-md border border-slate-700 p-4 bg-slate-800/50">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t("marketingEmails")}</Label>
                    <p className="text-sm text-slate-400">{t("receiveMarketingEmails")}</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                onClick={() =>
                  toast({
                    title: t("settingsSaved"),
                    description: t("notificationSettingsSaved"),
                  })
                }
              >
                {t("saveNotificationSettings")}
              </Button>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}