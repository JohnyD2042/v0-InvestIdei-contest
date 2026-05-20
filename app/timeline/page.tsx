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
  closeDate: string
  startDate: string
  status: "active" | "closed"
  link?: string
}

interface Category {
  name: string
  icon: "triangle" | "butterfly" | "circle"
  ideas: Idea[]
}

const categoriesData: Category[] = [
  {
    name: "Лучшие идеи на акции",
    icon: "triangle",
    ideas: [
      { id: 1, rank: 1, analyst: "VTB Capital", stock: "Яндекс", returnPercent: 24.5, closeDate: "15.05.26", startDate: "30.04.26", status: "closed", link: "#" },
      { id: 2, rank: 2, analyst: "Sberbank CIB", stock: "Газпром", returnPercent: 19.2, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
      { id: 3, rank: 3, analyst: "Альфа Капитал", stock: "Лукойл", returnPercent: 15.8, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
    ],
  },
  {
    name: "Лучшие идеи на БПИФ",
    icon: "butterfly",
    ideas: [
      { id: 4, rank: 1, analyst: "Тинькофф Инвестиции", stock: "TMOS", returnPercent: 12.3, closeDate: "12.05.26", startDate: "30.04.26", status: "closed", link: "#" },
      { id: 5, rank: 2, analyst: "БКС Мир Инвестиций", stock: "SBMX", returnPercent: 9.7, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
      { id: 6, rank: 3, analyst: "Финам", stock: "FXRL", returnPercent: 7.2, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
    ],
  },
  {
    name: "Лучшие идеи на ОТС",
    icon: "circle",
    ideas: [
      { id: 7, rank: 1, analyst: "Ренессанс Капитал", stock: "Делимобиль", returnPercent: 31.4, closeDate: "10.05.26", startDate: "30.04.26", status: "closed", link: "#" },
      { id: 8, rank: 2, analyst: "Газпромбанк", stock: "Самокат", returnPercent: 18.9, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
      { id: 9, rank: 3, analyst: "Атон", stock: "Вкусвилл", returnPercent: 14.2, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
    ],
  },
]

// Icons from the awards section
const CategoryIcon = ({ icon }: { icon: "triangle" | "butterfly" | "circle" }) => {
  if (icon === "triangle") {
    return (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
        <defs>
          <linearGradient id="gradTriangleTl" x1="56" y1="440" x2="456" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F2A7D5"/>
            <stop offset="100%" stopColor="#D899F0"/>
          </linearGradient>
        </defs>
        <polygon points="256,52 40,426 472,426" fill="url(#gradTriangleTl)" stroke="url(#gradTriangleTl)" strokeWidth="28" strokeLinejoin="round"/>
      </svg>
    )
  }
  if (icon === "butterfly") {
    return (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
        <defs>
          <linearGradient id="gradBpifTl" x1="18" y1="256" x2="494" y2="256" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F6A000"/>
            <stop offset="52%" stopColor="#F6B08F"/>
            <stop offset="100%" stopColor="#E08FEF"/>
          </linearGradient>
        </defs>
        <path d="M 18 78 Q 18 42 46 30 L 84 12 Q 104 2 124 20 L 256 148 L 388 20 Q 408 2 428 12 L 466 30 Q 494 42 494 78 L 494 434 Q 494 470 466 482 L 428 500 Q 408 510 388 492 L 256 364 L 124 492 Q 104 510 84 500 L 46 482 Q 18 470 18 434 Z" fill="url(#gradBpifTl)"/>
      </svg>
    )
  }
  return (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
      <defs>
        <radialGradient id="gradCircleTl" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(368 136) rotate(134.105) scale(430)">
          <stop offset="0%" stopColor="#FFC33A"/>
          <stop offset="55%" stopColor="#FFA20A"/>
          <stop offset="100%" stopColor="#F3981C"/>
        </radialGradient>
      </defs>
      <circle cx="256" cy="256" r="256" fill="url(#gradCircleTl)"/>
    </svg>
  )
}

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
      Завершена
    </Badge>
  )
}

export default function TimelinePage() {
  return (
    <DashboardLayout>
      <TooltipProvider delayDuration={0}>
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
                  <div className="flex items-center gap-2">
                    <CategoryIcon icon={category.icon} />
                    <h2 className="font-bold text-foreground">{category.name}</h2>
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead className="w-12 px-3 text-center font-medium text-foreground">#</TableHead>
                        <TableHead className="font-medium text-foreground">Идея</TableHead>
                        <TableHead className="font-medium text-foreground w-28">Доходность</TableHead>
                        <TableHead className="font-medium text-foreground w-40">
                          <div className="flex items-center gap-1.5">
                            <span>Дата фиксации прибыли</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p>Для закрытых идей берется дата закрытия. Для активных идей берется доходность за текущий этап конкурса (текущий месяц)</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableHead>
                        <TableHead className="font-medium text-foreground w-32">
                          <div className="flex items-center gap-1.5">
                            <span>Дата старта</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p>Для идей в статусе «активная» берется доходность за текущий этап конкурса (текущий месяц)</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableHead>
                        <TableHead className="font-medium text-foreground w-28">
                          <div className="flex items-center gap-1.5">
                            <span>Статус</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p>Приоритет отдаётся идеям, которые были закрыты в текущем месяце</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.ideas.map((idea) => (
                        <TableRow key={idea.id} className="hover:bg-secondary/30">
                          <TableCell className="w-12 px-3 text-center">
                            {getRankDisplay(idea.rank)}
                          </TableCell>
                          <TableCell>
                            <a 
                              href={idea.link || "#"} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block hover:opacity-80 transition-opacity"
                            >
                              <div className="font-medium text-foreground hover:text-primary transition-colors">{idea.analyst}</div>
                              <div className="text-xs text-muted-foreground">{idea.stock}</div>
                            </a>
                          </TableCell>
                          <TableCell>
                            <span className="text-green-600 font-semibold">+{idea.returnPercent}%</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-foreground">{idea.closeDate}</span>
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
                        <a 
                          href={idea.link || "#"} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 min-w-0"
                        >
                          <div className="font-medium text-foreground text-sm truncate hover:text-primary transition-colors">{idea.analyst}</div>
                          <div className="text-xs text-muted-foreground truncate">{idea.stock}</div>
                        </a>
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
                          <span className="text-foreground text-sm">{idea.closeDate}</span>
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
