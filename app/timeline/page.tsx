"use client"

import { Clock, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Idea {
  id: number
  rank: number
  analyst: string
  stock: string
  returnPercent: number
  closeDate: string | null
  startDate: string
  status: "active" | "closed"
}

interface Category {
  name: string
  description: string
  ideas: Idea[]
}

const categoriesData: Category[] = [
  {
    name: "Идеи на акции",
    description: "Лучшие идеи по российским акциям",
    ideas: [
      { id: 1, rank: 1, analyst: "VTB Capital", stock: "Яндекс", returnPercent: 24.5, closeDate: "15.05.2026", startDate: "10.04.2026", status: "closed" },
      { id: 2, rank: 2, analyst: "Sberbank CIB", stock: "Газпром", returnPercent: 19.2, closeDate: null, startDate: "18.04.2026", status: "active" },
      { id: 3, rank: 3, analyst: "Альфа Капитал", stock: "Лукойл", returnPercent: 15.8, closeDate: null, startDate: "22.04.2026", status: "active" },
    ],
  },
  {
    name: "Идеи на БПИФ",
    description: "Лучшие идеи по биржевым фондам",
    ideas: [
      { id: 4, rank: 1, analyst: "Тинькофф Инвестиции", stock: "TMOS", returnPercent: 12.3, closeDate: "12.05.2026", startDate: "05.04.2026", status: "closed" },
      { id: 5, rank: 2, analyst: "БКС Мир Инвестиций", stock: "SBMX", returnPercent: 9.7, closeDate: null, startDate: "08.04.2026", status: "active" },
      { id: 6, rank: 3, analyst: "Финам", stock: "FXRL", returnPercent: 7.2, closeDate: null, startDate: "15.04.2026", status: "active" },
    ],
  },
  {
    name: "Идеи на OTC",
    description: "Лучшие идеи на внебиржевом рынке",
    ideas: [
      { id: 7, rank: 1, analyst: "Ренессанс Капитал", stock: "Делимобиль", returnPercent: 31.4, closeDate: "10.05.2026", startDate: "01.04.2026", status: "closed" },
      { id: 8, rank: 2, analyst: "Газпромбанк", stock: "Самокат", returnPercent: 18.9, closeDate: null, startDate: "12.04.2026", status: "active" },
      { id: 9, rank: 3, analyst: "Атон", stock: "Вкусвилл", returnPercent: 14.2, closeDate: null, startDate: "20.04.2026", status: "active" },
    ],
  },
]

const getRankDisplay = (rank: number) => {
  if (rank === 1) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold">1</span>
  if (rank === 2) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-400 text-white text-xs font-bold">2</span>
  if (rank === 3) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-700 text-white text-xs font-bold">3</span>
  return <span className="text-sm text-muted-foreground font-medium">{rank}</span>
}

function StatusBadge({ status }: { status: "active" | "closed" }) {
  if (status === "active") {
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 font-medium text-xs">
        Активная
      </Badge>
    )
  }
  return (
    <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted font-medium text-xs">
      Закрыта
    </Badge>
  )
}

export default function TimelinePage() {
  return (
    <DashboardLayout>
      <TooltipProvider>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <span>Таймлайн конкурса</span>
            </h1>
            <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
              Лучшие идеи по номинациям
            </p>
          </div>

          {/* Categories */}
          {categoriesData.map((category) => (
            <Card key={category.name} className="border-border">
              <CardContent className="p-0">
                {/* Category Header */}
                <div className="px-4 py-3 border-b border-border bg-secondary/30">
                  <h2 className="font-bold text-foreground">{category.name}</h2>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead className="w-12 px-3 text-center font-medium text-foreground">#</TableHead>
                        <TableHead className="font-medium text-foreground">Идея</TableHead>
                        <TableHead className="font-medium text-foreground w-28">Доходность</TableHead>
                        <TableHead className="font-medium text-foreground w-32">
                          <div className="flex items-center gap-1.5">
                            <span>Дата фиксации</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3.5 h-3.5 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Дата закрытия идеи</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableHead>
                        <TableHead className="font-medium text-foreground w-28">Дата старта</TableHead>
                        <TableHead className="font-medium text-foreground w-24">Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.ideas.map((idea) => (
                        <TableRow key={idea.id} className="hover:bg-secondary/30">
                          <TableCell className="w-12 px-3 text-center">
                            {getRankDisplay(idea.rank)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">{idea.analyst}</div>
                              <div className="text-xs text-muted-foreground">{idea.stock}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-green-600 font-semibold">+{idea.returnPercent}%</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-foreground">
                              {idea.closeDate || "—"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{idea.startDate}</span>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={idea.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-border">
                  {category.ideas.map((idea) => (
                    <div key={idea.id} className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        {getRankDisplay(idea.rank)}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm truncate">{idea.analyst}</div>
                          <div className="text-xs text-muted-foreground truncate">{idea.stock}</div>
                        </div>
                        <StatusBadge status={idea.status} />
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground text-xs block">Доходность</span>
                          <span className="text-green-600 font-semibold">+{idea.returnPercent}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs block">Старт</span>
                          <span className="text-foreground text-sm">{idea.startDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs block">Фиксация</span>
                          <span className="text-foreground text-sm">{idea.closeDate || "—"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TooltipProvider>
    </DashboardLayout>
  )
}
