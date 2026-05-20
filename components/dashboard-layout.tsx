"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Trophy, Clock, Layers, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Обзор", href: "/", icon: Home },
  { name: "Пьедестал", href: "/rating", icon: Trophy },
  { name: "Таймлайн", href: "/timeline", icon: Clock },
  { name: "Покрытие", href: "/coverage", icon: Layers },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getCurrentPageName = () => {
    const current = navigation.find((item) => item.href === pathname)
    return current?.name || "Обзор"
  }

  const SidebarContent = () => (
    <>
      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center w-full justify-start px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Competition Info Card */}
      <div className="mt-8 p-4 bg-secondary rounded-xl">
        <div className="text-xs text-muted-foreground mb-2">Конкурс активен</div>
        <div className="text-sm font-medium text-foreground mb-1">1 апреля - 25 декабря</div>
        <div className="text-xs text-muted-foreground">2026 год</div>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-600 font-medium">Live</span>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4">
              <div className="flex items-center gap-3 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Logo" width={40} height={40} className="rounded-lg shrink-0" />
                <div>
                  <span className="font-bold text-foreground text-base">Олимпиада Аналитиков 2026</span>
                  <span className="text-xs text-muted-foreground block">Конкурс инвест-идей</span>
                </div>
              </div>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo" width={40} height={40} className="rounded-lg shrink-0" />
            <div>
              <span className="hidden sm:block font-bold text-foreground text-sm">Олимпиада Аналитиков 2026</span>
              <span className="sm:hidden font-bold text-foreground text-sm">ОлА 2026</span>
              <span className="text-xs text-muted-foreground block">Конкурс инвест-идей</span>
            </div>
          </div>
          <div className="h-6 w-px bg-border mx-2 hidden md:block" />
          <div className="text-sm text-muted-foreground hidden md:block">
            {getCurrentPageName()}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-64 border-r border-border bg-card h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4">
            <SidebarContent />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 md:p-8 bg-background overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="max-w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
