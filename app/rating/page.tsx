"use client"

import { useState, useMemo } from "react"
import {
  Trophy,
  ArrowUpDown,
  Info,
  Medal,
  ChevronUp,
  ChevronDown,
  Users,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type SortField = "rank" | "ideas" | "profitablePercent" | "betterThanBenchmark" | "avgReturn" | "hitRate" | "awards"
type SortDirection = "asc" | "desc"
type Category = "team" | "individual" | "tleague"

interface MedalCount {
  gold: number
  silver: number
  bronze: number
}

interface Participant {
  id: number
  rank: number
  name: string
  company: string
  category: "institutional" | "influencer" | "tleague"
  ideas: number
  profitablePercent: number
  betterThanBenchmark: number
  avgReturn: number
  hitRate: number
  medals: MedalCount
}

const participantsData: Participant[] = [
  { id: 1, rank: 1, name: "Алексей Смирнов", company: "VTB Capital", category: "institutional", ideas: 24, profitablePercent: 78.5, betterThanBenchmark: 65.2, avgReturn: 18.4, hitRate: 72.3, medals: { gold: 2, silver: 2, bronze: 1 } },
  { id: 2, rank: 2, name: "Мария Петрова", company: "Sberbank CIB", category: "institutional", ideas: 31, profitablePercent: 74.2, betterThanBenchmark: 58.1, avgReturn: 15.7, hitRate: 68.9, medals: { gold: 2, silver: 1, bronze: 1 } },
  { id: 3, rank: 3, name: "InvestBlog", company: "Независимый", category: "influencer", ideas: 45, profitablePercent: 71.1, betterThanBenchmark: 52.4, avgReturn: 14.2, hitRate: 65.5, medals: { gold: 1, silver: 1, bronze: 1 } },
  { id: 4, rank: 4, name: "Дмитрий Козлов", company: "Alfa Capital", category: "institutional", ideas: 18, profitablePercent: 72.2, betterThanBenchmark: 61.1, avgReturn: 16.8, hitRate: 70.1, medals: { gold: 1, silver: 1, bronze: 1 } },
  { id: 5, rank: 5, name: "FinanceGuru", company: "YouTube", category: "influencer", ideas: 52, profitablePercent: 68.3, betterThanBenchmark: 48.5, avgReturn: 12.1, hitRate: 62.4, medals: { gold: 1, silver: 1, bronze: 0 } },
  { id: 21, rank: 6, name: "Кирилл Орлов", company: "Т-Инвестиции", category: "tleague", ideas: 29, profitablePercent: 75.9, betterThanBenchmark: 62.1, avgReturn: 17.3, hitRate: 69.0, medals: { gold: 1, silver: 0, bronze: 1 } },
  { id: 6, rank: 7, name: "Елена Волкова", company: "Tinkoff Investments", category: "institutional", ideas: 27, profitablePercent: 70.4, betterThanBenchmark: 55.6, avgReturn: 13.9, hitRate: 64.8, medals: { gold: 1, silver: 0, bronze: 1 } },
  { id: 7, rank: 8, name: "StockMaster", company: "Telegram", category: "influencer", ideas: 38, profitablePercent: 66.7, betterThanBenchmark: 45.2, avgReturn: 11.5, hitRate: 60.2, medals: { gold: 0, silver: 2, bronze: 0 } },
  { id: 8, rank: 9, name: "Андрей Новиков", company: "Renaissance Capital", category: "institutional", ideas: 15, profitablePercent: 73.3, betterThanBenchmark: 60.0, avgReturn: 15.2, hitRate: 66.7, medals: { gold: 0, silver: 1, bronze: 0 } },
  { id: 22, rank: 10, name: "Виктория Соболева", company: "Т-Инвестиции", category: "tleague", ideas: 22, profitablePercent: 68.2, betterThanBenchmark: 54.5, avgReturn: 13.6, hitRate: 63.6, medals: { gold: 0, silver: 0, bronze: 1 } },
  { id: 9, rank: 11, name: "TradingPro", company: "Независимый", category: "influencer", ideas: 41, profitablePercent: 63.4, betterThanBenchmark: 43.9, avgReturn: 10.8, hitRate: 58.5, medals: { gold: 0, silver: 0, bronze: 1 } },
  { id: 10, rank: 12, name: "Ольга Иванова", company: "BCS Global Markets", category: "institutional", ideas: 22, profitablePercent: 68.2, betterThanBenchmark: 54.5, avgReturn: 12.7, hitRate: 63.6, medals: { gold: 0, silver: 0, bronze: 1 } },
  { id: 11, rank: 13, name: "MarketWatcher", company: "YouTube", category: "influencer", ideas: 33, profitablePercent: 60.6, betterThanBenchmark: 42.4, avgReturn: 9.8, hitRate: 57.6, medals: { gold: 0, silver: 0, bronze: 1 } },
  { id: 12, rank: 14, name: "Сергей Федоров", company: "Gazprombank", category: "institutional", ideas: 19, profitablePercent: 68.4, betterThanBenchmark: 52.6, avgReturn: 11.9, hitRate: 63.2, medals: { gold: 0, silver: 0, bronze: 1 } },
  { id: 13, rank: 15, name: "InvestorDaily", company: "Telegram", category: "influencer", ideas: 48, profitablePercent: 58.3, betterThanBenchmark: 39.6, avgReturn: 8.7, hitRate: 54.2, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 14, rank: 16, name: "Наталья Соколова", company: "Uralsib", category: "institutional", ideas: 14, profitablePercent: 71.4, betterThanBenchmark: 57.1, avgReturn: 13.2, hitRate: 64.3, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 23, rank: 17, name: "Максим Тарасов", company: "Т-Инвестиции", category: "tleague", ideas: 17, profitablePercent: 58.8, betterThanBenchmark: 41.2, avgReturn: 9.1, hitRate: 52.9, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 15, rank: 18, name: "FinTech Analyst", company: "Независимый", category: "influencer", ideas: 29, profitablePercent: 55.2, betterThanBenchmark: 37.9, avgReturn: 7.9, hitRate: 51.7, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 16, rank: 19, name: "Павел Михайлов", company: "Otkritie", category: "institutional", ideas: 21, profitablePercent: 61.9, betterThanBenchmark: 47.6, avgReturn: 10.1, hitRate: 57.1, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 17, rank: 20, name: "RussianStocks", company: "YouTube", category: "influencer", ideas: 36, profitablePercent: 52.8, betterThanBenchmark: 33.3, avgReturn: 6.5, hitRate: 47.2, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 18, rank: 21, name: "Анна Кузнецова", company: "Finam", category: "institutional", ideas: 17, profitablePercent: 64.7, betterThanBenchmark: 47.1, avgReturn: 9.4, hitRate: 58.8, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 19, rank: 22, name: "MoneyTalks", company: "Telegram", category: "influencer", ideas: 25, profitablePercent: 48.0, betterThanBenchmark: 28.0, avgReturn: 5.2, hitRate: 44.0, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 20, rank: 23, name: "Игорь Белов", company: "Aton", category: "institutional", ideas: 12, profitablePercent: 66.7, betterThanBenchmark: 50.0, avgReturn: 8.9, hitRate: 58.3, medals: { gold: 0, silver: 0, bronze: 0 } },
]

const columnInfo = {
  rank: "Место участника в общем зачете конкурса",
  ideas: "Общее количество инвестиционных идей, присланных участником",
  profitablePercent: "Процент идей, которые принесли положительную доходность",
  betterThanBenchmark: "Процент идей, которые показали доходность выше индекса МосБиржи",
  avgReturn: "Средняя доходность всех идей участника",
  hitRate: "Процент точных прогнозов по направлению движения цены",
  awards: "Количество полученных наград за всё время участия в конкурсе",
}

function MedalDisplay({ medals }: { medals: MedalCount }) {
  const hasAnyMedals = medals.gold > 0 || medals.silver > 0 || medals.bronze > 0
  
  if (!hasAnyMedals) {
    return <span className="text-muted-foreground">-</span>
  }

  return (
    <div className="flex items-center gap-1.5">
      {medals.gold > 0 && (
        <span className="inline-flex items-center gap-0.5 text-xs">
          <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500" />
          <span className="text-muted-foreground font-medium">{medals.gold}</span>
        </span>
      )}
      {medals.silver > 0 && (
        <span className="inline-flex items-center gap-0.5 text-xs">
          <span className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400" />
          <span className="text-muted-foreground font-medium">{medals.silver}</span>
        </span>
      )}
      {medals.bronze > 0 && (
        <span className="inline-flex items-center gap-0.5 text-xs">
          <span className="w-3 h-3 rounded-full bg-orange-400 border border-orange-500" />
          <span className="text-muted-foreground font-medium">{medals.bronze}</span>
        </span>
      )}
    </div>
  )
}

function MedalDisplayCompact({ medals }: { medals: MedalCount }) {
  const hasAnyMedals = medals.gold > 0 || medals.silver > 0 || medals.bronze > 0
  
  if (!hasAnyMedals) {
    return <span className="text-muted-foreground text-xs">-</span>
  }

  return (
    <div className="flex items-center gap-1">
      {medals.gold > 0 && (
        <span className="inline-flex items-center gap-0.5 text-[10px]">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500" />
          <span className="text-muted-foreground font-medium">{medals.gold}</span>
        </span>
      )}
      {medals.silver > 0 && (
        <span className="inline-flex items-center gap-0.5 text-[10px]">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400" />
          <span className="text-muted-foreground font-medium">{medals.silver}</span>
        </span>
      )}
      {medals.bronze > 0 && (
        <span className="inline-flex items-center gap-0.5 text-[10px]">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 border border-orange-500" />
          <span className="text-muted-foreground font-medium">{medals.bronze}</span>
        </span>
      )}
    </div>
  )
}

export default function RatingPage() {
  const [category, setCategory] = useState<Category>("team")
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const filteredAndSortedData = useMemo(() => {
    let data = [...participantsData]
    
    if (category === "individual") {
      data = data.filter(p => p.category === "influencer")
    } else if (category === "tleague") {
      data = data.filter(p => p.category === "tleague")
    }
    
    // Sort
    data.sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1
      
      if (sortField === "awards") {
        // 1. Total medals count
        const aTotalMedals = a.medals.gold + a.medals.silver + a.medals.bronze
        const bTotalMedals = b.medals.gold + b.medals.silver + b.medals.bronze
        if (aTotalMedals !== bTotalMedals) return (aTotalMedals > bTotalMedals ? 1 : -1) * direction
        
        // 2. Gold count
        if (a.medals.gold !== b.medals.gold) return (a.medals.gold > b.medals.gold ? 1 : -1) * direction
        
        // 3. Silver count
        if (a.medals.silver !== b.medals.silver) return (a.medals.silver > b.medals.silver ? 1 : -1) * direction
        
        // 4. Bronze count
        if (a.medals.bronze !== b.medals.bronze) return (a.medals.bronze > b.medals.bronze ? 1 : -1) * direction
        
        // 5. Average return (always higher is better, ignore sort direction for tiebreaker)
        return b.avgReturn - a.avgReturn
      }
      
      const aVal = a[sortField] as number
      const bVal = b[sortField] as number
      return (aVal > bVal ? 1 : -1) * direction
    })
    
    return data
  }, [category, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection(field === "rank" ? "asc" : "desc")
    }
  }

  const SortableHeader = ({ field, children, className }: { field: SortField; children: React.ReactNode; className?: string }) => (
    <TableHead className={`font-medium text-foreground ${className ?? ""}`}>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 hover:bg-transparent font-medium"
          onClick={() => handleSort(field)}
        >
          {children}
          {sortField === field ? (
            sortDirection === "asc" ? (
              <ChevronUp className="w-4 h-4 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-1" />
            )
          ) : (
            <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
          )}
        </Button>
        {field !== "rank" && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{columnInfo[field]}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TableHead>
  )

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold">1</span>
    if (rank === 2) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-400 text-white text-xs font-bold">2</span>
    if (rank === 3) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-700 text-white text-xs font-bold">3</span>
    return <span className="text-sm text-muted-foreground font-medium">{rank}</span>
  }

  return (
    <DashboardLayout>
      <TooltipProvider>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                <span>Рейтинг чемпионов</span>
              </h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                Лучшие аналитики за все время
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {([
              { key: "team", label: "Командный зачет", icon: <Users className="w-4 h-4" /> },
              { key: "individual", label: "Индивидуальный зачет", icon: <User className="w-4 h-4" /> },
              { key: "tleague", label: "Т-лига", icon: <span className="inline-flex items-center justify-center w-5 h-5 rounded text-xs font-black bg-yellow-400 text-black">Т</span> },
            ] as { key: Category; label: string; icon: React.ReactNode }[]).map(({ key, label, icon }) => {
              const isActive = category === key
              return (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    isActive
                      ? "bg-foreground text-background border-foreground shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  <span className={isActive ? "text-background" : "text-muted-foreground"}>{icon}</span>
                  {label}
                </button>
              )
            })}
          </div>

          {/* Table */}
          <Card className="border-border max-w-full">
            <CardContent className="p-0 max-w-full">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <Table className="min-w-[860px]">
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <SortableHeader field="rank" className="w-10 px-2 text-center"><span className="text-xs">#</span></SortableHeader>
                      <TableHead className="font-medium text-foreground">Аналитик</TableHead>
                      <SortableHeader field="ideas" className="w-16 px-2">Идей</SortableHeader>
                      <SortableHeader field="profitablePercent" className="w-28 px-2">Прибыльных</SortableHeader>
                      <SortableHeader field="betterThanBenchmark" className="w-36 px-2">Лучше бенчмарка</SortableHeader>
                      <SortableHeader field="avgReturn" className="w-36 px-2">Ср. доходность</SortableHeader>
                      <SortableHeader field="hitRate" className="w-28 px-2">Hit Rate</SortableHeader>
                      <SortableHeader field="awards" className="w-24 px-2">Награды</SortableHeader>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedData.map((participant) => (
                      <TableRow key={participant.id} className="hover:bg-secondary/30">
                        <TableCell className="w-10 px-2 text-center">{getRankBadge(participant.rank)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-7 h-7 shrink-0">
                              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                <User className="w-3.5 h-3.5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <button className="font-medium text-foreground truncate hover:text-primary hover:underline transition-colors text-left">
                                {participant.name}
                              </button>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="truncate">{participant.company}</span>
                                <span className="shrink-0">
                                  {participant.category === "institutional" ? (
                                    <BriefcaseBusiness className="w-3 h-3 text-blue-500" />
                                  ) : participant.category === "tleague" ? (
                                    <span className="inline-flex items-center justify-center w-3 h-3 rounded bg-yellow-400 text-black text-[8px] font-black">Т</span>
                                  ) : (
                                    <Palmtree className="w-3 h-3 text-violet-500" />
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-2 font-medium">{participant.ideas}</TableCell>
                        <TableCell className="px-2">
                          <span className={participant.profitablePercent > 50 ? "text-green-600" : "text-foreground"}>
                            {Math.round(participant.profitablePercent)}%
                          </span>
                        </TableCell>
                        <TableCell className="px-2">
                          <span className={participant.betterThanBenchmark > 50 ? "text-green-600" : "text-foreground"}>
                            {Math.round(participant.betterThanBenchmark)}%
                          </span>
                        </TableCell>
                        <TableCell className="px-2">
                          <span className={participant.avgReturn > 50 ? "text-green-600 font-medium" : "text-foreground"}>
                            +{Math.round(participant.avgReturn)}%
                          </span>
                        </TableCell>
                        <TableCell className="px-2">
                          <span className={participant.hitRate > 50 ? "text-green-600" : "text-foreground"}>
                            {Math.round(participant.hitRate)}%
                          </span>
                        </TableCell>
                        <TableCell className="px-2">
                          <MedalDisplay medals={participant.medals} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-border">
                {filteredAndSortedData.map((participant) => (
                  <div key={participant.id} className="p-4 space-y-3">
                    {/* Header with rank and analyst info */}
                    <div className="flex items-start gap-3">
                      {getRankBadge(participant.rank)}
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <button className="font-medium text-foreground truncate hover:text-primary hover:underline transition-colors text-left block w-full">
                          {participant.name}
                        </button>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                          {participant.company}
                          <span className="ml-1">
                            {participant.category === "institutional" ? (
                              <BriefcaseBusiness className="w-3.5 h-3.5 text-blue-500" />
                            ) : participant.category === "tleague" ? (
                              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-yellow-400 text-black text-[9px] font-black">Т</span>
                            ) : (
                              <Palmtree className="w-3.5 h-3.5 text-violet-500" />
                            )}
                          </span>
                        </div>
                        <MedalDisplayCompact medals={participant.medals} />
                      </div>
                    </div>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between bg-secondary/30 rounded px-2 py-1.5">
                        <span className="text-muted-foreground">Идей</span>
                        <span className="font-medium">{participant.ideas}</span>
                      </div>
                      <div className="flex justify-between bg-secondary/30 rounded px-2 py-1.5">
                        <span className="text-muted-foreground">Прибыльных</span>
                        <span className={participant.profitablePercent > 50 ? "text-green-600 font-medium" : "font-medium"}>
                          {Math.round(participant.profitablePercent)}%
                        </span>
                      </div>
                      <div className="flex justify-between bg-secondary/30 rounded px-2 py-1.5">
                        <span className="text-muted-foreground">Лучше бенчм.</span>
                        <span className={participant.betterThanBenchmark > 50 ? "text-green-600 font-medium" : "font-medium"}>
                          {Math.round(participant.betterThanBenchmark)}%
                        </span>
                      </div>
                      <div className="flex justify-between bg-secondary/30 rounded px-2 py-1.5">
                        <span className="text-muted-foreground">Ср. дох-сть</span>
                        <span className={participant.avgReturn > 50 ? "text-green-600 font-medium" : "font-medium"}>
                          +{Math.round(participant.avgReturn)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TooltipProvider>
    </DashboardLayout>
  )
}
