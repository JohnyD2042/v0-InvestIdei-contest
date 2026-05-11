"use client"

import { useEffect, useState } from "react"
import { Clock, Timer, Medal, Zap, Rocket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"

interface AwardCard {
  id: string
  type: "gold" | "silver" | "bronze" | "active" | "avgReturn"
  analyst: string
  asset?: string
  returnPercent?: number
  ideasCount?: number
  profitableCount?: number
  avgReturnPercent?: number
}

interface MonthData {
  month: string
  year: number
  isLive: boolean
  awards: AwardCard[]
}

const timelineData: MonthData[] = [
  {
    month: "Май",
    year: 2026,
    isLive: true,
    awards: [
      { id: "may-gold", type: "gold", analyst: "VTB Capital", asset: "Яндекс", returnPercent: 24.5 },
      { id: "may-silver", type: "silver", analyst: "Sberbank CIB", asset: "Газпром", returnPercent: 19.2 },
      { id: "may-bronze", type: "bronze", analyst: "InvestBlog", asset: "Лукойл", returnPercent: 15.8 },
      { id: "may-active", type: "active", analyst: "FinanceGuru", ideasCount: 5, profitableCount: 3 },
      { id: "may-avg", type: "avgReturn", analyst: "Alfa Capital", ideasCount: 3, avgReturnPercent: 8.5 },
    ],
  },
  {
    month: "Апрель",
    year: 2026,
    isLive: false,
    awards: [
      { id: "apr-gold", type: "gold", analyst: "Tinkoff Investments", asset: "Сбербанк", returnPercent: 28.3 },
      { id: "apr-silver", type: "silver", analyst: "StockMaster", asset: "Норникель", returnPercent: 21.7 },
      { id: "apr-bronze", type: "bronze", analyst: "Renaissance Capital", asset: "Роснефть", returnPercent: 17.4 },
      { id: "apr-active", type: "active", analyst: "TradingPro", ideasCount: 7, profitableCount: 4 },
      { id: "apr-avg", type: "avgReturn", analyst: "BCS Global Markets", ideasCount: 4, avgReturnPercent: 9.2 },
    ],
  },
  {
    month: "Март",
    year: 2026,
    isLive: false,
    awards: [
      { id: "mar-gold", type: "gold", analyst: "Alfa Capital", asset: "МТС", returnPercent: 32.1 },
      { id: "mar-silver", type: "silver", analyst: "VTB Capital", asset: "Полюс", returnPercent: 25.4 },
      { id: "mar-bronze", type: "bronze", analyst: "MarketWatcher", asset: "Магнит", returnPercent: 18.9 },
      { id: "mar-active", type: "active", analyst: "InvestBlog", ideasCount: 6, profitableCount: 5 },
      { id: "mar-avg", type: "avgReturn", analyst: "Sberbank CIB", ideasCount: 5, avgReturnPercent: 11.3 },
    ],
  },
]

const getAwardTitle = (type: AwardCard["type"]) => {
  switch (type) {
    case "gold":      return "Самая доходная идея — Золото"
    case "silver":    return "Самая доходная идея — Серебро"
    case "bronze":    return "Самая доходная идея — Бронза"
    case "active":    return "Самый активный участник"
    case "avgReturn": return "Лучшая средняя доходность"
  }
}

// Animated typing badge with faster speed
function TypingBadge() {
  const phrases = ["Кандидаты на победу", "Итоги не финальные", "Расклад может измениться"]
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 35)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 15)
    } else {
      setDeleting(false)
      setPhraseIndex((i) => (i + 1) % phrases.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, phraseIndex])

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-semibold min-w-[230px]">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] shrink-0" />
      <span>
        {displayed}
        <span className="animate-[pulse_0.5s_ease-in-out_infinite]">|</span>
      </span>
    </div>
  )
}

function AwardIcon({ type }: { type: AwardCard["type"] }) {
  const iconClasses = "w-5 h-5"
  switch (type) {
    case "gold":
      return <Medal className={`${iconClasses} text-amber-500`} />
    case "silver":
      return <Medal className={`${iconClasses} text-slate-400`} />
    case "bronze":
      return <Medal className={`${iconClasses} text-orange-600`} />
    case "active":
      return <Zap className={`${iconClasses} text-blue-500`} />
    case "avgReturn":
      return <Rocket className={`${iconClasses} text-green-500`} />
  }
}

function AwardCardComponent({ award, isLive }: { award: AwardCard; isLive: boolean }) {
  const accentColor = {
    gold:      "bg-amber-400",
    silver:    "bg-slate-400",
    bronze:    "bg-orange-600",
    active:    "bg-primary",
    avgReturn: "bg-emerald-500",
  }[award.type]

  const getStatValue = () => {
    if (award.type === "active") {
      return `${award.ideasCount} идей`
    } else if (award.type === "avgReturn") {
      return `+${award.avgReturnPercent}%`
    } else {
      return `+${Math.round(award.returnPercent!)}%`
    }
  }

  const getSuffix = () => {
    if (award.type === "avgReturn") return null
    return "за май"
  }

  const statColor = {
    gold:      "text-amber-600",
    silver:    "text-slate-500",
    bronze:    "text-orange-700",
    active:    "text-primary",
    avgReturn: "text-emerald-600",
  }[award.type]

  return (
    <div className={`flex flex-col rounded-xl border border-border bg-card hover:shadow-md transition-all overflow-hidden h-full ${!isLive ? "opacity-75" : ""}`}>
      {/* Accent bar */}
      <div className={`h-1 w-full ${accentColor}`} />

      <div className="flex flex-col flex-1 p-4">
        {/* Top row: icon + nomination label — fixed height for alignment */}
        <div className="h-[52px] flex items-start gap-2 mb-2">
          <div className="shrink-0 mt-0.5">
            <AwardIcon type={award.type} />
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight pt-1">
            {getAwardTitle(award.type)}
          </div>
        </div>

        {/* Analyst name — always at same vertical position */}
        <div className="font-bold text-foreground text-sm leading-snug flex-1">
          {award.analyst}
        </div>

        {/* Asset name for medal types */}
        {(award.type === "gold" || award.type === "silver" || award.type === "bronze") && award.asset && (
          <div className="text-xs text-muted-foreground truncate mt-1 mb-2">{award.asset}</div>
        )}

        {/* Stat row — on one line without wrap */}
        <div className="pt-3 mt-auto border-t border-border/60">
          <div className="flex items-baseline gap-1 whitespace-nowrap text-sm">
            <span className={`font-bold ${statColor}`}>{getStatValue()}</span>
            {getSuffix() && <span className="text-muted-foreground text-xs">{getSuffix()}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TimelinePage() {
  // Calculate days until June 1st deadline
  const [daysLeft, setDaysLeft] = useState(0)
  
  useEffect(() => {
    const deadline = new Date("2026-06-01T00:00:00")
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()
    setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))))
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <span>Таймлайн конкурса</span>
          </h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            История побед и текущие кандидаты на награды
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-border via-border/60 to-border hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {timelineData.map((monthData, index) => {
              const awardNumber = timelineData.length - index
              return (
                <div
                  key={`${monthData.month}-${monthData.year}`}
                  className={`relative md:pl-16 pb-8 ${index === timelineData.length - 1 ? "pb-0" : ""}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 hidden md:flex items-center justify-center">
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                      monthData.isLive
                        ? "bg-card border-primary text-primary shadow-md"
                        : "bg-card border-border text-muted-foreground"
                    }`}>
                      <span className="text-sm font-bold">{awardNumber}</span>
                    </div>
                    <div className={`absolute left-12 w-4 h-0.5 ${monthData.isLive ? "bg-primary" : "bg-border"}`} />
                  </div>

                  {/* Month Content Card */}
                  <Card className={`border-2 transition-all ${
                    monthData.isLive
                      ? "border-primary/20 bg-card shadow-md"
                      : "border-border bg-card/50 hover:bg-card hover:border-border"
                  }`}>
                    <CardContent className="p-6">
                      {/* Month Header */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg border bg-secondary border-border text-foreground">
                          {monthData.isLive && (
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shrink-0" />
                          )}
                          <span>{monthData.month} {monthData.year}</span>
                        </div>

                        {monthData.isLive ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <TypingBadge />
                            {/* Neutral deadline chip */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary text-muted-foreground text-xs font-medium">
                              <Timer className="w-3.5 h-3.5 shrink-0" />
                              <span>Награждение 1 июня</span>
                              <span className="text-foreground font-semibold">· {daysLeft} {daysLeft === 1 ? "день" : daysLeft < 5 ? "дня" : "дней"}</span>
                            </div>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            Победители объявлены
                          </Badge>
                        )}
                      </div>

                      {/* Awards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {monthData.awards.map((award, awardIndex) => (
                          <div
                            key={award.id}
                            className="animate-in fade-in slide-in-from-bottom-2 h-full"
                            style={{ animationDelay: `${awardIndex * 50}ms`, animationFillMode: "both" }}
                          >
                            <AwardCardComponent award={award} isLive={monthData.isLive} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
