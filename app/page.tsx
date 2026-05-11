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
  Gift,
  Calendar,
  FileText,
  ArrowRight,
  Medal,
  Target,
  Zap,
  Rocket,
  BarChart2,
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

const nominations = [
  { icon: Medal, name: "Лучшая идея — золото", color: "text-amber-500" },
  { icon: Medal, name: "Лучшая идея — серебро", color: "text-slate-400" },
  { icon: Medal, name: "Лучшая идея — бронза", color: "text-orange-600" },
  { icon: Zap, name: "Самый активный участник", color: "text-blue-500" },
  { icon: Rocket, name: "Лучшая средняя доходность", color: "text-green-500" },
]

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
              <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-medium">
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
            Конкурс инвест-идей сервиса Invest-idei.ru в партнерстве с ПАО Московская Биржа. Сделаем финансовую аналитику великой снова
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Participants */}
          <Link href="/rating">
            <Card className="border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{statsData.totalParticipants}</div>
                <div className="text-sm text-muted-foreground">Всего участников</div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
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
          <Card className="border-border hover:border-green-500/50 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{statsData.totalIdeas}</div>
              <div className="text-sm text-muted-foreground">Всего инвест-идей</div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BriefcaseBusiness className="w-3 h-3 text-primary shrink-0" />
                  <span className="whitespace-nowrap">{statsData.ideasFromBrokers} от брокеров</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1">
                  <Palmtree className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="whitespace-nowrap">{statsData.ideasFromInfluencers} от инфлюенсеров</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base Assets */}
          <Link href="/coverage">
            <Card className="border-border hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                    <Layers className="w-6 h-6 text-amber-500" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{statsData.baseAssets}</div>
                <div className="text-sm text-muted-foreground">Базовых активов</div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
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
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{statsData.ideasPerDay}</div>
              <div className="text-sm text-muted-foreground">Идей / день</div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="whitespace-nowrap">Средняя активность</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Prizes Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Ideas Chart */}
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Динамика идей по неделям</CardTitle>
              <CardDescription>Количество новых инвестиционных идей</CardDescription>
            </CardHeader>
            <CardContent>
              <VerticalBarChart />
            </CardContent>
          </Card>

          {/* Prizes Awarded */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                <div>
                  <CardTitle className="text-lg">Награды</CardTitle>
                  <CardDescription>Вручено {statsData.prizesAwarded} из {statsData.totalPrizes} призов</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={(statsData.prizesAwarded / statsData.totalPrizes) * 100} className="h-2" />
              </div>
              <div className="text-sm font-medium text-foreground mb-3">Ежемесячные номинации:</div>
              <div className="space-y-2">
                {nominations.map((nomination, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <nomination.icon className={`w-4 h-4 ${nomination.color}`} />
                    <span className="text-muted-foreground text-xs">{nomination.name}</span>
                  </div>
                ))}
              </div>
              {/* Live Badge and Next Date */}
              <div className="mt-6 pt-4 border-t border-border flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-600">Live</span>
                </div>
                <span className="text-xs text-muted-foreground">Следующее: 1 мая</span>
              </div>
            </CardContent>
          </Card>
        </div>

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
