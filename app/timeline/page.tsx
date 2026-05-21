"use client"

import { useState } from "react"
import { Clock, Info, ChevronDown, ChevronUp, Trophy } from "lucide-react"
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

interface MonthArchive {
  month: string
  label: string
  finalDate: string
  categories: Category[]
}

// ---- CURRENT MONTH DATA (Май 2026) ----
const currentCategories: Category[] = [
  {
    name: "Номинация «Лучшая идея на акции»",
    icon: "triangle",
    ideas: [
      { id: 1, rank: 1, analyst: "VTB Capital", stock: "Яндекс", returnPercent: 24.5, closeDate: "15.05.26", startDate: "07.04.26", status: "closed", link: "#" },
      { id: 2, rank: 2, analyst: "Sberbank CIB", stock: "Газпром", returnPercent: 19.2, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
      { id: 3, rank: 3, analyst: "Альфа Капитал", stock: "Лукойл", returnPercent: 15.8, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
    ],
  },
  {
    name: "Номинация «Лучшая идея на БПИФ»",
    icon: "butterfly",
    ideas: [
      { id: 4, rank: 1, analyst: "Тинькофф Инвестиции", stock: "TMOS", returnPercent: 12.3, closeDate: "12.05.26", startDate: "30.04.26", status: "closed", link: "#" },
      { id: 5, rank: 2, analyst: "БКС Мир Инвестиций", stock: "SBMX", returnPercent: 9.7, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
      { id: 6, rank: 3, analyst: "Финам", stock: "FXRL", returnPercent: 7.2, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
    ],
  },
  {
    name: "Номинация «Лучшая идея на ОТС»",
    icon: "circle",
    ideas: [
      { id: 7, rank: 1, analyst: "Ренессанс Капитал", stock: "Делимобиль", returnPercent: 31.4, closeDate: "10.05.26", startDate: "30.04.26", status: "closed", link: "#" },
      { id: 8, rank: 2, analyst: "Газпромбанк", stock: "Самокат", returnPercent: 18.9, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
      { id: 9, rank: 3, analyst: "Атон", stock: "Вкусвилл", returnPercent: 14.2, closeDate: "20.05.26", startDate: "30.04.26", status: "active", link: "#" },
    ],
  },
]

// ---- ARCHIVE DATA ----
const archiveData: MonthArchive[] = [
  {
    month: "Апрель 2026",
    label: "apr",
    finalDate: "01.05.26",
    categories: [
      {
        name: "Номинация «Лучшая идея на акции»",
        icon: "triangle",
        ideas: [
          { id: 101, rank: 1, analyst: "Финам", stock: "Сбербанк", returnPercent: 18.3, closeDate: "28.04.26", startDate: "01.04.26", status: "closed", link: "#" },
          { id: 102, rank: 2, analyst: "VTB Capital", stock: "Роснефть", returnPercent: 12.7, closeDate: "25.04.26", startDate: "03.04.26", status: "closed", link: "#" },
          { id: 103, rank: 3, analyst: "Газпромбанк", stock: "Норникель", returnPercent: 9.4, closeDate: "30.04.26", startDate: "05.04.26", status: "closed", link: "#" },
        ],
      },
      {
        name: "Номинация «Лучшая идея на БПИФ»",
        icon: "butterfly",
        ideas: [
          { id: 104, rank: 1, analyst: "Sberbank CIB", stock: "SBRB", returnPercent: 8.1, closeDate: "29.04.26", startDate: "02.04.26", status: "closed", link: "#" },
          { id: 105, rank: 2, analyst: "Тинькофф Инвестиции", stock: "TMOS", returnPercent: 6.5, closeDate: "27.04.26", startDate: "04.04.26", status: "closed", link: "#" },
          { id: 106, rank: 3, analyst: "Альфа Капитал", stock: "AKMB", returnPercent: 5.2, closeDate: "26.04.26", startDate: "06.04.26", status: "closed", link: "#" },
        ],
      },
      {
        name: "Номинация «Лучшая идея на ОТС»",
        icon: "circle",
        ideas: [
          { id: 107, rank: 1, analyst: "БКС Мир Инвестиций", stock: "Whoosh", returnPercent: 22.6, closeDate: "30.04.26", startDate: "01.04.26", status: "closed", link: "#" },
          { id: 108, rank: 2, analyst: "Атон", stock: "Делимобиль", returnPercent: 15.3, closeDate: "28.04.26", startDate: "03.04.26", status: "closed", link: "#" },
          { id: 109, rank: 3, analyst: "Ренессанс Капитал", stock: "Вкусвилл", returnPercent: 11.8, closeDate: "25.04.26", startDate: "07.04.26", status: "closed", link: "#" },
        ],
      },
    ],
  },
  {
    month: "Март 2026",
    label: "mar",
    finalDate: "01.04.26",
    categories: [
      {
        name: "Номинация «Лучшая идея на акции»",
        icon: "triangle",
        ideas: [
          { id: 201, rank: 1, analyst: "Газпромбанк", stock: "OZON", returnPercent: 32.1, closeDate: "27.03.26", startDate: "01.03.26", status: "closed", link: "#" },
          { id: 202, rank: 2, analyst: "Альфа Капитал", stock: "Яндекс", returnPercent: 21.4, closeDate: "25.03.26", startDate: "03.03.26", status: "closed", link: "#" },
          { id: 203, rank: 3, analyst: "Открытие", stock: "Мосбиржа", returnPercent: 14.9, closeDate: "28.03.26", startDate: "05.03.26", status: "closed", link: "#" },
        ],
      },
      {
        name: "Номинация «Лучшая идея на БПИФ»",
        icon: "butterfly",
        ideas: [
          { id: 204, rank: 1, analyst: "Финам", stock: "FXRL", returnPercent: 11.2, closeDate: "29.03.26", startDate: "02.03.26", status: "closed", link: "#" },
          { id: 205, rank: 2, analyst: "БКС Мир Инвестиций", stock: "SBMX", returnPercent: 8.7, closeDate: "26.03.26", startDate: "04.03.26", status: "closed", link: "#" },
          { id: 206, rank: 3, analyst: "VTB Capital", stock: "VTBX", returnPercent: 6.3, closeDate: "24.03.26", startDate: "06.03.26", status: "closed", link: "#" },
        ],
      },
      {
        name: "Номинация «Лучшая идея на ОТС»",
        icon: "circle",
        ideas: [
          { id: 207, rank: 1, analyst: "Тинькофф Инвестиции", stock: "Самокат", returnPercent: 28.5, closeDate: "30.03.26", startDate: "01.03.26", status: "closed", link: "#" },
          { id: 208, rank: 2, analyst: "Sberbank CIB", stock: "Whoosh", returnPercent: 19.2, closeDate: "27.03.26", startDate: "03.03.26", status: "closed", link: "#" },
          { id: 209, rank: 3, analyst: "Ренессанс Капитал", stock: "Indriver", returnPercent: 13.7, closeDate: "25.03.26", startDate: "07.03.26", status: "closed", link: "#" },
        ],
      },
    ],
  },
]

// Icons from the awards section
const CategoryIcon = ({ icon, size = "md" }: { icon: "triangle" | "butterfly" | "circle"; size?: "sm" | "md" }) => {
  const cls = size === "sm" ? "w-4 h-4" : "w-5 h-5"
  if (icon === "triangle") {
    return (
      <svg className={cls} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
        <defs>
          <linearGradient id="gradTriangleTl" x1="56" y1="440" x2="456" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F2A7D5" /><stop offset="100%" stopColor="#D899F0" />
          </linearGradient>
        </defs>
        <polygon points="256,52 40,426 472,426" fill="url(#gradTriangleTl)" stroke="url(#gradTriangleTl)" strokeWidth="28" strokeLinejoin="round" />
      </svg>
    )
  }
  if (icon === "butterfly") {
    return (
      <svg className={cls} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
        <defs>
          <linearGradient id="gradBpifTl" x1="18" y1="256" x2="494" y2="256" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F6A000" /><stop offset="52%" stopColor="#F6B08F" /><stop offset="100%" stopColor="#E08FEF" />
          </linearGradient>
        </defs>
        <path d="M 18 78 Q 18 42 46 30 L 84 12 Q 104 2 124 20 L 256 148 L 388 20 Q 408 2 428 12 L 466 30 Q 494 42 494 78 L 494 434 Q 494 470 466 482 L 428 500 Q 408 510 388 492 L 256 364 L 124 492 Q 104 510 84 500 L 46 482 Q 18 470 18 434 Z" fill="url(#gradBpifTl)" />
      </svg>
    )
  }
  return (
    <svg className={cls} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
      <defs>
        <radialGradient id="gradCircleTl" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(368 136) rotate(134.105) scale(430)">
          <stop offset="0%" stopColor="#FFC33A" /><stop offset="55%" stopColor="#FFA20A" /><stop offset="100%" stopColor="#F3981C" />
        </radialGradient>
      </defs>
      <circle cx="256" cy="256" r="256" fill="url(#gradCircleTl)" />
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

// Reusable table for both current and archive
function CategoryTable({ category, compact = false }: { category: Category; compact?: boolean }) {
  return (
    <Card className="border-border">
      <CardContent className="p-0">
        <div className={`px-4 py-3 border-b border-border ${compact ? "bg-secondary/20" : "bg-secondary/30"}`}>
          <h3 className={`font-bold text-foreground ${compact ? "text-sm" : ""}`}>{category.name}</h3>
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="w-12 px-3 text-center font-medium text-foreground">#</TableHead>
                <TableHead className="font-medium text-foreground">Идея</TableHead>
                <TableHead className="font-medium text-foreground w-28">
                  <div className="flex items-center gap-1.5">
                    <span>Доходность</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p>Для завершенных идей — доходность уже зафиксирована. Для активных идей — доходность плавающая и может меняться</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="font-medium text-foreground w-40">
                  <div className="flex items-center gap-1.5">
                    <span>Дата фиксации прибыли</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p>Для завершенных идей — берется дата фактического закрытия. Для активных идей — берется дата «сегодня», так как идеи продолжаются</p>
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
                        <p>Для идей в статусе «активная» берется дата начала текущего этапа конкурса</p>
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
                  <TableCell className="w-12 px-3 text-center">{getRankDisplay(idea.rank)}</TableCell>
                  <TableCell>
                    <a href={idea.link || "#"} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                      <div className="font-medium text-foreground hover:text-primary transition-colors">{idea.analyst}</div>
                      <div className="text-xs text-muted-foreground">{idea.stock}</div>
                    </a>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600 font-semibold inline-flex items-center gap-1.5">
                      +{idea.returnPercent}%
                      {idea.status === "active" && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell><span className="text-sm text-foreground">{idea.closeDate}</span></TableCell>
                  <TableCell><span className="text-sm text-muted-foreground">{idea.startDate}</span></TableCell>
                  <TableCell><StatusBadge status={idea.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y divide-border">
          {category.ideas.map((idea) => (
            <div key={idea.id} className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                {getRankDisplay(idea.rank)}
                <a href={idea.link || "#"} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate hover:text-primary transition-colors">{idea.analyst}</div>
                  <div className="text-xs text-muted-foreground truncate">{idea.stock}</div>
                </a>
                <StatusBadge status={idea.status} />
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground text-xs block">Доходность</span>
                  <span className="text-green-600 font-semibold inline-flex items-center gap-1.5">
                    +{idea.returnPercent}%
                    {idea.status === "active" && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                    )}
                  </span>
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
  )
}

function ArchiveMonth({ archive }: { archive: MonthArchive }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      {/* Accordion header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-secondary/30 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left">
            <span className="font-bold text-foreground">{archive.month}</span>
            <span className="text-xs text-muted-foreground block">Итоги зафиксированы {archive.finalDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs hidden sm:flex">Завершён</Badge>
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {/* Accordion body */}
      {open && (
        <div className="p-4 space-y-4 bg-background">
          {archive.categories.map((cat) => (
            <CategoryTable key={cat.name} category={cat} compact />
          ))}
        </div>
      )}
    </div>
  )
}

export default function TimelinePage() {
  return (
    <DashboardLayout>
      <TooltipProvider delayDuration={0}>
        <div className="space-y-6">

          {/* Page Header */}
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <span>Таймлайн конкурса</span>
            </h1>
            <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
              Лучшие идеи по номинациям
            </p>
          </div>

          {/* Live month banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-green-500/30 bg-green-500/5 px-5 py-4">
            <div className="flex items-center gap-3">
              {/* Pulsing dot */}
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <div>
                <span className="font-semibold text-foreground text-sm sm:text-base">Текущий этап — Июнь 2026</span>
                <span className="text-xs text-muted-foreground block">Результаты предварительные и могут меняться</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">Окончательные итоги</span>
              <Badge className="bg-green-600 hover:bg-green-600 text-white font-semibold text-xs px-3 py-1">
                1 июля 2026
              </Badge>
            </div>
          </div>

          {/* Current month tables */}
          {currentCategories.map((category) => (
            <CategoryTable key={category.name} category={category} />
          ))}

          {/* Archive */}
          <div className="pt-2">
            <h2 className="text-lg font-bold text-foreground mb-4">Прошлые этапы конкурса</h2>
            <div className="space-y-3">
              {archiveData.map((archive) => (
                <ArchiveMonth key={archive.label} archive={archive} />
              ))}
            </div>
          </div>

        </div>
      </TooltipProvider>
    </DashboardLayout>
  )
}
