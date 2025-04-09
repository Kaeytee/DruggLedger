export interface Avatar {
  id: string
  nickname: string
  avatarUrl: string
}

export const avatars: Avatar[] = [
  {
    id: "avatar1",
    nickname: "CryptoWizard",
    avatarUrl: "/avatars/wizard.svg",
  },
  {
    id: "avatar2",
    nickname: "BlockMaster",
    avatarUrl: "/avatars/robot.svg",
  },
  {
    id: "avatar3",
    nickname: "ChainNavigator",
    avatarUrl: "/avatars/astronaut.svg",
  },
  {
    id: "avatar4",
    nickname: "DigitalNomad",
    avatarUrl: "/avatars/traveler.svg",
  },
  {
    id: "avatar5",
    nickname: "TechSage",
    avatarUrl: "/avatars/scientist.svg",
  },
  {
    id: "avatar6",
    nickname: "QuantumQueen",
    avatarUrl: "/avatars/queen.svg",
  },
  {
    id: "avatar7",
    nickname: "CyberSamurai",
    avatarUrl: "/avatars/samurai.svg",
  },
  {
    id: "avatar8",
    nickname: "DataDruid",
    avatarUrl: "/avatars/druid.svg",
  },
  {
    id: "avatar9",
    nickname: "NetRunner",
    avatarUrl: "/avatars/runner.svg",
  },
  {
    id: "avatar10",
    nickname: "CodePhoenix",
    avatarUrl: "/avatars/phoenix.svg",
  },
]

// Placeholder SVGs for avatars
export const avatarPlaceholders = {
  "wizard.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#6366f1"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">🧙</text></svg>`,
  "robot.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#8b5cf6"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">🤖</text></svg>`,
  "astronaut.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#ec4899"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">👨‍🚀</text></svg>`,
  "traveler.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#14b8a6"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">🧳</text></svg>`,
  "scientist.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#f59e0b"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">👨‍🔬</text></svg>`,
  "queen.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#ef4444"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">👑</text></svg>`,
  "samurai.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#10b981"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">⚔️</text></svg>`,
  "druid.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#6b7280"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">🌿</text></svg>`,
  "runner.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#3b82f6"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">🏃</text></svg>`,
  "phoenix.svg": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#f97316"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white">🔥</text></svg>`,
}

// Function to get avatar SVG content
export function getAvatarSvg(avatarUrl: string): string {
  const filename = avatarUrl.split("/").pop() || ""
  return avatarPlaceholders[filename as keyof typeof avatarPlaceholders] || ""
}

// Function to get avatar by ID
export function getAvatarById(id: string): Avatar | undefined {
  return avatars.find((avatar) => avatar.id === id)
}

