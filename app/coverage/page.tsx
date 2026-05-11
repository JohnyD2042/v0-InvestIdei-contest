"use client"

import { useState, useMemo } from "react"
import {
  Layers,
  ArrowUpDown,
  Info,
  ChevronUp,
  ChevronDown,
  Palmtree,
  BriefcaseBusiness,
  Target,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type SortField = "rank" | "ideas" | "analysts" | "awards"
type SortDirection = "asc" | "desc"

interface MedalCount {
  gold: number
  silver: number
  bronze: number
}

interface Analyst {
  name: string
  type: "broker" | "blogger"
}

interface Company {
  id: number
  rank: number
  name: string
  ticker: string
  ideas: number
  analysts: Analyst[]
  bestForecaster: string
  bestForecasterStats: string
  mostActiveAnalyst: string
  mostActiveIdeas: number
  medals: MedalCount
}

const companiesData: Company[] = [
  { id: 1, rank: 1, name: "Сбербанк", ticker: "SBER", ideas: 45, analysts: [{ name: "InvestBlog", type: "blogger" }, { name: "FinanceGuru", type: "blogger" }, { name: "StockMaster", type: "broker" }, { name: "TradingPro", type: "broker" }], bestForecaster: "InvestBlog", bestForecasterStats: "9/10", mostActiveAnalyst: "FinanceGuru", mostActiveIdeas: 12, medals: { gold: 3, silver: 2, bronze: 1 } },
  { id: 2, rank: 2, name: "Газпром", ticker: "GAZP", ideas: 38, analysts: [{ name: "InvestBlog", type: "blogger" }, { name: "FinanceGuru", type: "blogger" }, { name: "MarketWatcher", type: "broker" }], bestForecaster: "MarketWatcher", bestForecasterStats: "7/8", mostActiveAnalyst: "InvestBlog", mostActiveIdeas: 10, medals: { gold: 2, silver: 1, bronze: 2 } },
  { id: 3, rank: 3, name: "Лукойл", ticker: "LKOH", ideas: 32, analysts: [{ name: "StockMaster", type: "broker" }, { name: "InvestorDaily", type: "broker" }, { name: "TradingPro", type: "broker" }], bestForecaster: "StockMaster", bestForecasterStats: "5/6", mostActiveAnalyst: "InvestorDaily", mostActiveIdeas: 9, medals: { gold: 1, silver: 2, bronze: 3 } },
  { id: 4, rank: 4, name: "Яндекс", ticker: "YDEX", ideas: 29, analysts: [{ name: "FinTech Analyst", type: "broker" }, { name: "TradingPro", type: "broker" }, { name: "RussianStocks", type: "blogger" }, { name: "MoneyTalks", type: "blogger" }], bestForecaster: "FinTech Analyst", bestForecasterStats: "4/5", mostActiveAnalyst: "TradingPro", mostActiveIdeas: 8, medals: { gold: 1, silver: 2, bronze: 1 } },
  { id: 5, rank: 5, name: "Роснефть", ticker: "ROSN", ideas: 27, analysts: [{ name: "MarketWatcher", type: "broker" }, { name: "InvestBlog", type: "blogger" }], bestForecaster: "MarketWatcher", bestForecasterStats: "6/7", mostActiveAnalyst: "InvestBlog", mostActiveIdeas: 7, medals: { gold: 1, silver: 1, bronze: 2 } },
  { id: 6, rank: 6, name: "Норникель", ticker: "GMKN", ideas: 24, analysts: [{ name: "InvestorDaily", type: "broker" }, { name: "FinanceGuru", type: "blogger" }, { name: "StockMaster", type: "broker" }], bestForecaster: "InvestorDaily", bestForecasterStats: "3/4", mostActiveAnalyst: "FinanceGuru", mostActiveIdeas: 6, medals: { gold: 1, silver: 0, bronze: 3 } },
  { id: 7, rank: 7, name: "Полюс", ticker: "PLZL", ideas: 21, analysts: [{ name: "FinTech Analyst", type: "broker" }, { name: "RussianStocks", type: "blogger" }], bestForecaster: "RussianStocks", bestForecasterStats: "4/4", mostActiveAnalyst: "FinTech Analyst", mostActiveIdeas: 5, medals: { gold: 0, silver: 2, bronze: 2 } },
  { id: 8, rank: 8, name: "Магнит", ticker: "MGNT", ideas: 19, analysts: [{ name: "TradingPro", type: "broker" }, { name: "RussianStocks", type: "blogger" }, { name: "MoneyTalks", type: "blogger" }], bestForecaster: "MoneyTalks", bestForecasterStats: "2/3", mostActiveAnalyst: "RussianStocks", mostActiveIdeas: 5, medals: { gold: 0, silver: 2, bronze: 1 } },
  { id: 9, rank: 9, name: "МТС", ticker: "MTSS", ideas: 17, analysts: [{ name: "MoneyTalks", type: "blogger" }, { name: "InvestBlog", type: "blogger" }], bestForecaster: "InvestBlog", bestForecasterStats: "3/3", mostActiveAnalyst: "MoneyTalks", mostActiveIdeas: 4, medals: { gold: 0, silver: 1, bronze: 2 } },
  { id: 10, rank: 10, name: "ВТБ", ticker: "VTBR", ideas: 15, analysts: [{ name: "StockMaster", type: "broker" }, { name: "MarketWatcher", type: "broker" }, { name: "InvestorDaily", type: "broker" }], bestForecaster: "StockMaster", bestForecasterStats: "2/2", mostActiveAnalyst: "MarketWatcher", mostActiveIdeas: 4, medals: { gold: 0, silver: 1, bronze: 1 } },
  { id: 11, rank: 11, name: "Северсталь", ticker: "CHMF", ideas: 14, analysts: [{ name: "TradingPro", type: "broker" }, { name: "FinanceGuru", type: "blogger" }], bestForecaster: "TradingPro", bestForecasterStats: "3/4", mostActiveAnalyst: "FinanceGuru", mostActiveIdeas: 4, medals: { gold: 0, silver: 0, bronze: 3 } },
  { id: 12, rank: 12, name: "НЛМК", ticker: "NLMK", ideas: 12, analysts: [{ name: "MarketWatcher", type: "broker" }], bestForecaster: "MarketWatcher", bestForecasterStats: "2/3", mostActiveAnalyst: "MarketWatcher", mostActiveIdeas: 3, medals: { gold: 0, silver: 0, bronze: 2 } },
  { id: 13, rank: 13, name: "Татнефть", ticker: "TATN", ideas: 11, analysts: [{ name: "InvestorDaily", type: "broker" }, { name: "RussianStocks", type: "blogger" }], bestForecaster: "RussianStocks", bestForecasterStats: "2/2", mostActiveAnalyst: "InvestorDaily", mostActiveIdeas: 3, medals: { gold: 0, silver: 0, bronze: 1 } },
  { id: 14, rank: 14, name: "Алроса", ticker: "ALRS", ideas: 9, analysts: [{ name: "FinTech Analyst", type: "broker" }, { name: "MoneyTalks", type: "blogger" }], bestForecaster: "FinTech Analyst", bestForecasterStats: "1/1", mostActiveAnalyst: "MoneyTalks", mostActiveIdeas: 2, medals: { gold: 0, silver: 0, bronze: 1 } },
  { id: 15, rank: 15, name: "Мосбиржа", ticker: "MOEX", ideas: 8, analysts: [{ name: "StockMaster", type: "broker" }, { name: "InvestBlog", type: "blogger" }], bestForecaster: "StockMaster", bestForecasterStats: "1/2", mostActiveAnalyst: "InvestBlog", mostActiveIdeas: 2, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 16, rank: 16, name: "ФосАгро", ticker: "PHOR", ideas: 7, analysts: [{ name: "RussianStocks", type: "blogger" }], bestForecaster: "RussianStocks", bestForecasterStats: "1/1", mostActiveAnalyst: "RussianStocks", mostActiveIdeas: 2, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 17, rank: 17, name: "Русал", ticker: "RUAL", ideas: 6, analysts: [{ name: "MoneyTalks", type: "blogger" }, { name: "TradingPro", type: "broker" }], bestForecaster: "TradingPro", bestForecasterStats: "1/2", mostActiveAnalyst: "MoneyTalks", mostActiveIdeas: 2, medals: { gold: 0, silver: 0, bronze: 0 } },
  { id: 18, rank: 18, name: "Polymetal", ticker: "POLY", ideas: 5, analysts: [{ name: "InvestBlog", type: "blogger" }], bestForecaster: "InvestBlog", bestForecasterStats: "1/1", mostActiveAnalyst: "InvestBlog", mostActiveIdeas: 1, medals: { gold: 0, silver: 0, bronze: 0 } },
]

const columnInfo = {
  ideas: "Общее количество инвестиционных идей по данному эмитенту",
  analysts: "Количество аналитиков, публиковавших идеи по этому эмитенту",
  bestForecaster: "Аналитик с лучшими результатами прогнозов по данному эмитенту",
  mostActiveAnalyst: "Аналитик с наибольшим количеством идей по данному эмитенту",
  awards: "Количество наград, полученных за идеи по данному эмитенту",
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

export default function CoveragePage() {
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const sortedData = useMemo(() => {
    const data = [...companiesData]
    
    data.sort((a, b) => {
      let aVal: number
      let bVal: number
      
      if (sortField === "analysts") {
        aVal = a.analysts.length
        bVal = b.analysts.length
      } else if (sortField === "awards") {
        aVal = a.medals.gold * 3 + a.medals.silver * 2 + a.medals.bronze
        bVal = b.medals.gold * 3 + b.medals.silver * 2 + b.medals.bronze
      } else {
        aVal = a[sortField]
        bVal = b[sortField]
      }
      
      const direction = sortDirection === "asc" ? 1 : -1
      return (aVal > bVal ? 1 : -1) * direction
    })
    
    return data
  }, [sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection(field === "rank" ? "asc" : "desc")
    }
  }

  const SortableHeader = ({ field, children, showInfo = true }: { field: SortField; children: React.ReactNode; showInfo?: boolean }) => (
    <TableHead className={`font-medium text-foreground${field === "rank" ? " w-10 px-2 text-center" : ""}`}>
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
        {showInfo && columnInfo[field as keyof typeof columnInfo] && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{columnInfo[field as keyof typeof columnInfo]}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TableHead>
  )

  const getRankDisplay = (rank: number) => {
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
                <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                <span>Покрытие эмитентов</span>
              </h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                Рейтинг компаний по количеству инвестиционных идей
              </p>
            </div>
          </div>

          {/* Table */}
          <Card className="border-border max-w-full">
            <CardContent className="p-0 max-w-full">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <Table className="min-w-[900px]">
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <SortableHeader field="rank" showInfo={false}>
                        <span className="text-xs">#</span>
                      </SortableHeader>
                      <TableHead className="font-medium text-foreground">Эмитент</TableHead>
                      <SortableHeader field="ideas">Идей</SortableHeader>
                      <SortableHeader field="analysts">Аналитиков</SortableHeader>
                      <TableHead className="font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span>Лучший прогнозист</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-3.5 h-3.5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>{columnInfo.bestForecaster}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead className="font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span>Самый активный</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-3.5 h-3.5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>{columnInfo.mostActiveAnalyst}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableHead>
                      <SortableHeader field="awards">Награды</SortableHeader>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedData.map((company) => (
                      <TableRow key={company.id} className="hover:bg-secondary/30">
                        <TableCell className="w-10 px-2 text-center">{getRankDisplay(company.rank)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-foreground">{company.name}</div>
                            <div className="text-xs text-muted-foreground">{company.ticker}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <button className="font-medium text-foreground hover:text-primary hover:underline transition-colors">
                            {company.ideas}
                          </button>
                        </TableCell>
                        <TableCell className="px-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="font-medium cursor-pointer underline decoration-dotted underline-offset-2 hover:text-primary transition-colors">
                                {company.analysts.length}
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-3">
                              <div className="space-y-1.5">
                                <p className="font-medium text-xs mb-2 text-muted-foreground">Аналитики:</p>
                                {company.analysts.map((analyst, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 text-sm">
                                    {analyst.type === "blogger" ? (
                                      <Palmtree className="w-3.5 h-3.5 text-amber-500" />
                                    ) : (
                                      <BriefcaseBusiness className="w-3.5 h-3.5 text-primary" />
                                    )}
                                    <span>{analyst.name}</span>
                                  </div>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        <TableCell className="px-2">
                          <div>
                            <span className="text-sm">{company.bestForecaster}</span>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Target className="w-3 h-3 text-muted-foreground shrink-0" />
                              <span className="text-xs text-muted-foreground">{company.bestForecasterStats}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-2">
                          <div>
                            <span className="text-sm">{company.mostActiveAnalyst}</span>
                            <div className="text-xs text-muted-foreground">{company.mostActiveIdeas} идей</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <MedalDisplay medals={company.medals} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-border">
                {sortedData.map((company) => (
                  <div key={company.id} className="p-4 space-y-3">
                    {/* Header with rank and company info */}
                    <div className="flex items-start gap-3">
                      {getRankDisplay(company.rank)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate">{company.name}</div>
                        <div className="text-xs text-muted-foreground">{company.ticker}</div>
                      </div>
                      <MedalDisplayCompact medals={company.medals} />
                    </div>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between bg-secondary/30 rounded px-2 py-1.5">
                        <span className="text-muted-foreground">Идей</span>
                        <span className="font-medium">{company.ideas}</span>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex justify-between bg-secondary/30 rounded px-2 py-1.5 w-full text-left hover:bg-secondary/50 transition-colors">
                            <span className="text-muted-foreground">Аналитиков</span>
                            <span className="font-medium underline decoration-dotted underline-offset-2">{company.analysts.length}</span>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3">
                          <div className="space-y-1.5">
                            <p className="font-medium text-xs mb-2 text-muted-foreground">Аналитики:</p>
                            {company.analysts.map((analyst, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-sm">
                                {analyst.type === "blogger" ? (
                                  <Palmtree className="w-3.5 h-3.5 text-amber-500" />
                                ) : (
                                  <BriefcaseBusiness className="w-3.5 h-3.5 text-primary" />
                                )}
                                <span>{analyst.name}</span>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    {/* Best forecaster and most active */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-secondary/30 rounded px-2 py-1.5">
                        <span className="text-muted-foreground text-xs block">Лучший:</span>
                        <span className="font-medium truncate block">{company.bestForecaster}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Target className="w-3 h-3 text-muted-foreground shrink-0" />
                          <span className="text-xs text-muted-foreground">{company.bestForecasterStats}</span>
                        </div>
                      </div>
                      <div className="bg-secondary/30 rounded px-2 py-1.5">
                        <span className="text-muted-foreground text-xs block">Активный:</span>
                        <span className="font-medium truncate block">{company.mostActiveAnalyst}</span>
                        <span className="text-xs text-muted-foreground">{company.mostActiveIdeas} идей</span>
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
