"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Users,
  BriefcaseBusiness,
  Palmtree,
  Lightbulb,
  Layers,
  Timer,
  Calendar,
  ArrowRight,
  Target,
  Rocket,
  BarChart2,
  Trophy,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard-layout"

const weeklyIdeasData = [
  { week: "6 апр", brokers: 5, influencers: 3 },
  { week: "13 апр", brokers: 7, influencers: 5 },
  { week: "20 апр", brokers: 9, influencers: 6 },
  { week: "27 апр", brokers: 6, influencers: 4 },
  { week: "4 мая", brokers: 11, influencers: 7 },
  { week: "11 мая", brokers: 8, influencers: 6 },
  { week: "18 мая", brokers: 5, influencers: 4 },
  { week: "25 мая", brokers: 4, influencers: 2 },
]

const statsData = {
  totalParticipants: 22,
  brokers: 14,
  influencers: 8,
  totalIdeas: 92,
  ideasFromBrokers: 58,
  ideasFromInfluencers: 34,
  baseAssets: 36,
  stocks: 29,
  ideasPerDay: 3.5,
  prizesAwarded: 12,
  totalPrizes: 100,
  prizeFund: 5400000,
  prizeAwarded: 900000,
}

function VerticalBarChart() {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; item: (typeof weeklyIdeasData)[0] } | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const maxTotal = Math.max(...weeklyIdeasData.map((d) => d.brokers + d.influencers))

  return (
    <div className="relative" ref={containerRef}>
      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-10 pointer-events-none bg-popover border border-border rounded-lg shadow-lg px-3 py-2 text-xs"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -110%)",
          }}
        >
          <div className="font-medium text-foreground mb-1">{tooltip.item.week}</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block shrink-0" />
            <span className="text-muted-foreground">Брокеры:</span>
            <span className="font-medium text-foreground">{tooltip.item.brokers}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-violet-500 inline-block shrink-0" />
            <span className="text-muted-foreground">Инфлюенсеры:</span>
            <span className="font-medium text-foreground">{tooltip.item.influencers}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 border-t border-border pt-1">
            <span className="text-muted-foreground">Итого:</span>
            <span className="font-semibold text-foreground">{tooltip.item.brokers + tooltip.item.influencers}</span>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="flex items-end justify-between gap-2 h-48 px-1">
        {weeklyIdeasData.map((item) => {
          const total = item.brokers + item.influencers
          const brokersH = (item.brokers / maxTotal) * 100
          const influencersH = (item.influencers / maxTotal) * 100
          return (
            <div
              key={item.week}
              className="flex flex-col items-center gap-1 flex-1 h-full justify-end cursor-pointer group"
              onMouseEnter={(e) => {
                const containerEl = containerRef.current
                if (!containerEl) return
                const rect = e.currentTarget.getBoundingClientRect()
                const parentRect = containerEl.getBoundingClientRect()
                setTooltip({
                  x: rect.left + rect.width / 2 - parentRect.left,
                  y: rect.top - parentRect.top,
                  item,
                })
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <div className="text-[10px] text-muted-foreground font-medium">
                {total}
              </div>
              <div className="w-full flex flex-col justify-end rounded-sm overflow-hidden" style={{ height: "168px" }}>
                <div
                  className="w-full bg-violet-500 transition-all duration-300 group-hover:brightness-110"
                  style={{ height: `${influencersH}%` }}
                />
                <div
                  className="w-full bg-blue-500 transition-all duration-300 group-hover:brightness-110"
                  style={{ height: `${brokersH}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between gap-2 mt-2 px-1">
        {weeklyIdeasData.map((item) => (
          <div key={item.week} className="flex-1 text-center text-[10px] text-muted-foreground leading-tight">
            {item.week}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-500" />
          <BriefcaseBusiness className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-muted-foreground">Брокеры</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-violet-500" />
          <Palmtree className="w-3.5 h-3.5 text-violet-500" />
          <span className="text-muted-foreground">Инфлюенсеры</span>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const prizeProgress = (statsData.prizeAwarded / statsData.prizeFund) * 100

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)} млн`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)} тыс`
    }
    return value.toString()
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-foreground text-balance">
            Олимпиада Аналитиков 2026
          </h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base text-pretty">
            Сделаем финансовую аналитику великой снова
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Total Participants */}
          <Link href="/rating" className="h-full">
            <Card className="border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{statsData.totalParticipants}</div>
                <div className="text-sm text-muted-foreground mt-1">Участников</div>
                <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BriefcaseBusiness className="w-3 h-3 text-blue-500 shrink-0" />
                    <span className="whitespace-nowrap">{statsData.brokers} брокеров</span>
                  </div>
                  <span className="hidden sm:inline">·</span>
                  <div className="flex items-center gap-1">
                    <Palmtree className="w-3 h-3 text-violet-500 shrink-0" />
                    <span className="whitespace-nowrap">{statsData.influencers} инфлюенсеров</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Total Ideas */}
          <Card className="border-border hover:border-green-500/50 hover:shadow-md transition-all cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-foreground">{statsData.totalIdeas}</div>
              <div className="text-sm text-muted-foreground mt-1">Инвест-идей</div>
              <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BriefcaseBusiness className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="whitespace-nowrap">{statsData.ideasFromBrokers} от брокеров</span>
                </div>
                <div className="flex items-center gap-1">
                  <Palmtree className="w-3 h-3 text-violet-500 shrink-0" />
                  <span className="whitespace-nowrap">{statsData.ideasFromInfluencers} от инфлюенсеров</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base Assets */}
          <Link href="/coverage" className="h-full">
            <Card className="border-border hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-amber-500" />
                </div>
                <div className="text-3xl font-bold text-foreground">{statsData.baseAssets}</div>
                <div className="text-sm text-muted-foreground mt-1">Базовых активов</div>
                <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BarChart2 className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="whitespace-nowrap">{statsData.stocks} акций</span>
                  </div>
                  <span className="hidden sm:inline">·</span>
                  <div className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="whitespace-nowrap">{statsData.baseAssets - statsData.stocks} БПИФ</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Days Remaining */}
          <Card className="border-border h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4">
                <Timer className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-foreground">180</div>
              <div className="text-sm text-muted-foreground mt-1">Дней впереди</div>
              <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span>12 дней в пути</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Ideas Chart - Full Width */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Динамика идей по неделям</CardTitle>
            <CardDescription>Количество новых инвестиционных идей</CardDescription>
          </CardHeader>
          <CardContent>
            <VerticalBarChart />
          </CardContent>
        </Card>

        {/* Monthly Awards — Hipster minimal style */}
        <Card className="border-border/50 overflow-hidden relative bg-background">
          <CardHeader className="text-center pb-4 relative">
            <CardTitle className="text-2xl font-bold text-foreground tracking-tight">
              Ежемесячные награды
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Главные номинации конкурса
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Award 1 — Акции: треугольник */}
              <div className="relative p-8 group cursor-pointer">
                <div className="flex flex-col items-center text-center gap-6">
                  <svg className="w-28 h-28 group-hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
                    <defs>
                      <linearGradient id="gradTriangle" x1="56" y1="440" x2="456" y2="72" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#F2A7D5"/>
                        <stop offset="100%" stopColor="#D899F0"/>
                      </linearGradient>
                    </defs>
                    <polygon points="256,52 40,426 472,426" fill="url(#gradTriangle)" stroke="url(#gradTriangle)" strokeWidth="28" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h3 className="font-medium text-foreground mb-1 text-lg">Лучшая идея по акциям</h3>
                    <div className="text-xl font-bold text-fuchsia-400 whitespace-nowrap">
                      500 тыс. ₽
                    </div>
                  </div>
                </div>
              </div>

              {/* Award 2 — БПИФ: бабочка */}
              <div className="relative p-8 group cursor-pointer">
                <div className="flex flex-col items-center text-center gap-6">
                  <svg className="w-28 h-28 group-hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
                    <defs>
                      <linearGradient id="gradBpif" x1="18" y1="256" x2="494" y2="256" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#F6A000"/>
                        <stop offset="52%" stopColor="#F6B08F"/>
                        <stop offset="100%" stopColor="#E08FEF"/>
                      </linearGradient>
                    </defs>
                    <path d="M 18 78 Q 18 42 46 30 L 84 12 Q 104 2 124 20 L 256 148 L 388 20 Q 408 2 428 12 L 466 30 Q 494 42 494 78 L 494 434 Q 494 470 466 482 L 428 500 Q 408 510 388 492 L 256 364 L 124 492 Q 104 510 84 500 L 46 482 Q 18 470 18 434 Z" fill="url(#gradBpif)"/>
                  </svg>
                  <div>
                    <h3 className="font-medium text-foreground mb-1 text-lg">Лучшая идея по БПИФ</h3>
                    <div className="text-xl font-bold text-fuchsia-400 whitespace-nowrap">
                      350 тыс. ₽
                    </div>
                  </div>
                </div>
              </div>

              {/* Award 3 — ОТС: круг */}
              <div className="relative p-8 group cursor-pointer">
                <div className="flex flex-col items-center text-center gap-6">
                  <svg className="w-28 h-28 group-hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
                    <defs>
                      <radialGradient id="gradCircle" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(368 136) rotate(134.105) scale(430)">
                        <stop offset="0%" stopColor="#FFC33A"/>
                        <stop offset="55%" stopColor="#FFA20A"/>
                        <stop offset="100%" stopColor="#F3981C"/>
                      </radialGradient>
                    </defs>
                    <circle cx="256" cy="256" r="256" fill="url(#gradCircle)"/>
                  </svg>
                  <div>
                    <h3 className="font-medium text-foreground mb-1 text-lg">Лучшая идея ОТС</h3>
                    <div className="text-xl font-bold text-orange-400 whitespace-nowrap">
                      50 тыс. ₽
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Live indicator */}
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="text-xs font-medium text-green-600">Конкурс идёт</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Ближайшее награждение 1 июля</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prize Fund Block */}
        <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Призовой фонд</div>
                  <div className="text-3xl font-bold text-foreground">
                    {formatCurrency(statsData.prizeFund)} ₽
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="relative">
                  <Progress value={prizeProgress} className="h-4" />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{formatCurrency(statsData.prizeAwarded)} ₽ разыграно</span>
                  <span>{formatCurrency(statsData.prizeFund)} ₽</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Contest Banner */}
        <div className="relative overflow-hidden rounded-xl bg-violet-700 border border-violet-600/50">
          {/* Decorative background elements */}
          <div className="absolute right-0 top-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute right-20 bottom-0 w-48 h-48 bg-violet-500/20 rounded-full translate-y-1/2 pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-32 h-32 bg-violet-500/10 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 px-8 py-7 md:px-10 md:py-8">
            {/* Left: badge + title */}
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                <Trophy className="w-7 h-7 text-yellow-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold text-white/90 uppercase tracking-wide">Для профучастников и блогеров</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight text-balance">
                  Олимпиада Аналитиков 2026
                </h2>
              </div>
            </div>

            {/* Right: CTA */}
            <Link href="/about" className="shrink-0">
              <Button
                size="lg"
                className="gap-2 text-base font-bold px-8 py-6 bg-yellow-400 hover:bg-yellow-300 text-yellow-950 shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-all duration-200 hover:scale-105"
              >
                <Rocket className="w-5 h-5" />
                Подробнее о конкурсе
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
