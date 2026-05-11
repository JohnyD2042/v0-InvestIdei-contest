"use client"

import { useState } from "react"
import {
  Save,
  Bell,
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  FileText,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    newAwards: true,
    weeklyReport: true,
    newIdeas: false,
    securityAlerts: true,
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Настройки</h1>
            <p className="text-muted-foreground mt-1">Управление аккаунтом и параметрами конкурса</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
            <TabsTrigger value="contest">Конкурс</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Информация профиля</CardTitle>
                <CardDescription>Обновите вашу персональную информацию</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">AC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="gap-2">
                      Загрузить фото
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG или GIF. Макс. 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input id="firstName" defaultValue="Администратор" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input id="lastName" defaultValue="Analyst Cup" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@analystcup.ru" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" defaultValue="+7 (999) 123-45-67" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">О себе</Label>
                  <Textarea
                    id="bio"
                    placeholder="Расскажите о себе..."
                    defaultValue="Администратор конкурса финансовых аналитиков Analyst Cup 2026"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Часовой пояс</Label>
                  <Select defaultValue="msk">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="msk">Москва (MSK, UTC+3)</SelectItem>
                      <SelectItem value="spb">Санкт-Петербург (MSK, UTC+3)</SelectItem>
                      <SelectItem value="ekb">Екатеринбург (UTC+5)</SelectItem>
                      <SelectItem value="nsk">Новосибирск (UTC+7)</SelectItem>
                      <SelectItem value="vlad">Владивосток (UTC+10)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Сохранить изменения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
                <CardDescription>Выберите, о каких событиях вы хотите получать уведомления</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Каналы уведомлений</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Email уведомления</div>
                          <div className="text-sm text-muted-foreground">Получать уведомления на email</div>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(value) => handleNotificationChange("email", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Push-уведомления</div>
                          <div className="text-sm text-muted-foreground">Получать браузерные уведомления</div>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(value) => handleNotificationChange("push", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">События конкурса</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Новые награды</div>
                        <div className="text-sm text-muted-foreground">Когда объявляются победители месяца</div>
                      </div>
                      <Switch
                        checked={notifications.newAwards}
                        onCheckedChange={(value) => handleNotificationChange("newAwards", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Еженедельный отчет</div>
                        <div className="text-sm text-muted-foreground">Сводка по конкурсу за неделю</div>
                      </div>
                      <Switch
                        checked={notifications.weeklyReport}
                        onCheckedChange={(value) => handleNotificationChange("weeklyReport", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Новые идеи</div>
                        <div className="text-sm text-muted-foreground">Когда участники присылают новые идеи</div>
                      </div>
                      <Switch
                        checked={notifications.newIdeas}
                        onCheckedChange={(value) => handleNotificationChange("newIdeas", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Оповещения безопасности</div>
                        <div className="text-sm text-muted-foreground">Важные уведомления о безопасности</div>
                      </div>
                      <Switch
                        checked={notifications.securityAlerts}
                        onCheckedChange={(value) => handleNotificationChange("securityAlerts", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Сохранить настройки
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Настройки безопасности</CardTitle>
                <CardDescription>Управление безопасностью аккаунта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Пароль</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Текущий пароль</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Введите текущий пароль"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Новый пароль</Label>
                      <Input id="newPassword" type="password" placeholder="Введите новый пароль" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                      <Input id="confirmPassword" type="password" placeholder="Подтвердите новый пароль" />
                    </div>

                    <Button variant="outline" className="gap-2">
                      <Lock className="w-4 h-4" />
                      Обновить пароль
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Двухфакторная аутентификация</h3>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <div className="font-medium">Приложение аутентификации</div>
                      <div className="text-sm text-muted-foreground">Используйте приложение для дополнительной защиты</div>
                    </div>
                    <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                      Отключено
                    </Badge>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Shield className="w-4 h-4" />
                    Включить 2FA
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Активные сессии</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Текущая сессия</div>
                        <div className="text-sm text-muted-foreground">Chrome на Windows - Москва</div>
                        <div className="text-xs text-muted-foreground">Последняя активность: Сейчас</div>
                      </div>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                        Текущая
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contest" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Настройки конкурса</CardTitle>
                <CardDescription>Параметры конкурса Analyst Cup 2026</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Основная информация</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <div className="font-medium">Правила конкурса</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Документ с правилами участия</p>
                      <Button variant="outline" size="sm">Скачать PDF</Button>
                    </div>
                    
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="w-5 h-5 text-primary" />
                        <div className="font-medium">Публичная страница</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">analystcup.ru</p>
                      <Button variant="outline" size="sm">Открыть сайт</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Параметры конкурса</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Дата начала</div>
                        <div className="text-sm text-muted-foreground">1 апреля 2026</div>
                      </div>
                      <Badge variant="outline">Активен</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Дата окончания</div>
                        <div className="text-sm text-muted-foreground">25 декабря 2026</div>
                      </div>
                      <Badge variant="outline">269 дней</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Призовой фонд</div>
                        <div className="text-sm text-muted-foreground">$100,000</div>
                      </div>
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">25% разыграно</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
