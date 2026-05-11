"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Users,
  BriefcaseBusiness,
  Palmtree,
  Lightbulb,
  Layers,
  TrendingUp,
  Calendar,
  FileText,
  ArrowRight,
  Medal,
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
  prizeFund: 8000000,
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
                    <BriefcaseBusiness className="w-3 h-3 text-primary shrink-0" />
                    <span className="whitespace-nowrap">{statsData.brokers} брокеров</span>
                  </div>
                  <span className="hidden sm:inline">·</span>
                  <div className="flex items-center gap-1">
                    <Palmtree className="w-3 h-3 text-amber-500 shrink-0" />
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
                  <BriefcaseBusiness className="w-3 h-3 text-primary shrink-0" />
                  <span className="whitespace-nowrap">{statsData.ideasFromBrokers} от брокеров</span>
                </div>
                <div className="flex items-center gap-1">
                  <Palmtree className="w-3 h-3 text-amber-500 shrink-0" />
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
                    <span className="whitespace-nowrap">{statsData.baseAssets - statsData.stocks} прочее</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Ideas Per Day */}
          <Card className="border-border h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-foreground">{statsData.ideasPerDay}</div>
              <div className="text-sm text-muted-foreground mt-1">Идей / день</div>
              <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="whitespace-nowrap">Средняя активность</span>
                </div>
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

        {/* Monthly Awards */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-400/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <CardHeader className="text-center pb-2 relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                <Medal className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Ежемесячные награды
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Главные номинации конкурса
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Award 1: Лучшая идея по акциям */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-border/50 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/10 group">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Лучшая идея по акциям</h3>
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      500 тыс. ₽
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Trophy className="w-4 h-4 text-amber-500/30" />
                </div>
              </div>

              {/* Award 2: Лучшая идея по БПИФ */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-border/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Лучшая идея по БПИФ</h3>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                      350 тыс. ₽
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Trophy className="w-4 h-4 text-blue-500/30" />
                </div>
              </div>

              {/* Award 3: Лучшая идея ОТС */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-border/50 hover:border-emerald-500/30 transition-all hover:shadow-lg hover:shadow-emerald-500/10 group">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Лучшая идея ОТС</h3>
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                      50 тыс. ₽
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Trophy className="w-4 h-4 text-emerald-500/30" />
                </div>
              </div>
            </div>
            
            {/* Live indicator */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-600">Конкурс идет</span>
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

        {/* Participant CTA Block */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Хотите участвовать?</h2>
                  <p className="text-muted-foreground">
                    Присоединяйтесь к конкурсу финансовых аналитиков и покажите свои навыки прогнозирования
                  </p>
                </div>

                <div className="flex flex-wrap gap-6">
                  {/* Timeline */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Сроки конкурса</div>
                      <div className="text-xs text-muted-foreground">1 апреля - 25 декабря 2026</div>
                    </div>
                  </div>

                  {/* Rules */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Правила</div>
                      <a href="#" className="text-xs text-primary hover:underline">Читать правила</a>
                    </div>
                  </div>
                </div>
              </div>

              <Button size="lg" className="gap-2 shrink-0">
                Хочу участвовать
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
