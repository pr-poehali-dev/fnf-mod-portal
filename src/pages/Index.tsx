import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Mod {
  id: number;
  title: string;
  author: string;
  downloads: number;
  rating: number;
  category: string;
  thumbnail: string;
  verified: boolean;
}

const MOCK_MODS: Mod[] = [
  {
    id: 1,
    title: "Neon Beats",
    author: "FunkMaster",
    downloads: 12450,
    rating: 4.8,
    category: "Character",
    thumbnail: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400",
    verified: true
  },
  {
    id: 2,
    title: "Cyber Rhythm",
    author: "BeatCoder",
    downloads: 8920,
    rating: 4.6,
    category: "Song",
    thumbnail: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400",
    verified: true
  },
  {
    id: 3,
    title: "Pixel Party",
    author: "RetroGamer",
    downloads: 15300,
    rating: 4.9,
    category: "Visual",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
    verified: true
  },
  {
    id: 4,
    title: "Funky Fresh",
    author: "MusicMod",
    downloads: 6780,
    rating: 4.5,
    category: "Character",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    verified: false
  }
];

const FAQ_ITEMS = [
  {
    question: "Какие форматы файлов поддерживаются?",
    answer: "Мы принимаем только архивы в форматах ZIP, RAR и 7Z. Это обеспечивает безопасность и стандартизацию загрузок."
  },
  {
    question: "Как работает проверка на вирусы?",
    answer: "Каждый загруженный мод автоматически сканируется нашей системой безопасности перед публикацией. Моды с подозрительным содержимым отклоняются."
  },
  {
    question: "Могу ли я загрузить мод без регистрации?",
    answer: "Нет, для загрузки модов необходимо зарегистрироваться. Это помогает нам поддерживать качество контента и связываться с авторами."
  },
  {
    question: "Что делать, если мой мод отклонили?",
    answer: "Вы получите уведомление с причиной отклонения. Обычно это связано с обнаруженными угрозами безопасности или нарушением правил."
  },
  {
    question: "Как получить статус верифицированного автора?",
    answer: "Загрузите минимум 3 мода без нарушений, получите положительные отзывы от сообщества. Верификация происходит автоматически."
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [faqSearch, setFaqSearch] = useState('');

  const filteredMods = MOCK_MODS.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mod.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredFaq = FAQ_ITEMS.filter(item =>
    item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    item.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">ModsForFNF V-Slice</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden md:flex items-center gap-2">
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button variant="ghost" className="hidden md:flex items-center gap-2">
                <Icon name="HelpCircle" size={18} />
                FAQ
              </Button>
              {isAuthenticated ? (
                <Button variant="default" className="flex items-center gap-2">
                  <Icon name="User" size={18} />
                  Профиль
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="flex items-center gap-2">
                      <Icon name="LogIn" size={18} />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Регистрация / Вход</DialogTitle>
                      <DialogDescription>
                        Создайте аккаунт для загрузки модов
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder="your@email.com" />
                      </div>
                      <div>
                        <Label>Пароль</Label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <Button className="w-full" onClick={() => setIsAuthenticated(true)}>
                        Войти
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Badge className="mb-4" variant="secondary">
              <Icon name="Shield" size={14} className="mr-1" />
              Защита от вирусов
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
              Безопасные моды для FNF V-Slice
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Загружайте и делитесь модами с автоматической проверкой безопасности. Только проверенный контент.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg hover-scale">
                    <Icon name="Upload" size={20} className="mr-2" />
                    Загрузить мод
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Загрузка мода</DialogTitle>
                    <DialogDescription>
                      Поддерживаются форматы: ZIP, RAR, 7Z
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>Название мода</Label>
                      <Input placeholder="Введите название" />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Input placeholder="Character / Song / Visual" />
                    </div>
                    <div>
                      <Label>Файл архива</Label>
                      <Input type="file" accept=".zip,.rar,.7z" />
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                      <Icon name="ShieldCheck" size={20} className="text-primary mt-1" />
                      <p className="text-sm text-muted-foreground">
                        Ваш файл будет проверен антивирусом перед публикацией
                      </p>
                    </div>
                    <Button className="w-full">
                      Загрузить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="text-lg hover-scale">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Правила публикации
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 pt-8 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Download" size={18} className="text-primary" />
                <span className="text-muted-foreground">43,450 загрузок</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={18} className="text-secondary" />
                <span className="text-muted-foreground">12,300 пользователей</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheck" size={18} className="text-primary" />
                <span className="text-muted-foreground">100% безопасно</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 space-y-4">
            <h3 className="text-3xl font-bold">Каталог модов</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск модов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="Character">Персонажи</TabsTrigger>
                  <TabsTrigger value="Song">Песни</TabsTrigger>
                  <TabsTrigger value="Visual">Визуал</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMods.map((mod) => (
              <Card key={mod.id} className="hover-scale cursor-pointer overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={mod.thumbnail}
                    alt={mod.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {mod.verified && (
                    <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm">
                      <Icon name="ShieldCheck" size={14} className="mr-1" />
                      Проверено
                    </Badge>
                  )}
                  <Badge className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm">
                    {mod.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{mod.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Icon name="User" size={14} />
                    {mod.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Download" size={14} />
                      {mod.downloads.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Icon name="Star" size={14} />
                      {mod.rating}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center space-y-2">
              <h3 className="text-3xl font-bold">Вопросы и ответы</h3>
              <p className="text-muted-foreground">Найдите ответы на частые вопросы</p>
            </div>
            
            <div className="mb-6 relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск в FAQ..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4 bg-card">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-start gap-3 text-left">
                      <Icon name="HelpCircle" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <span className="font-semibold">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-9 text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🎵</span>
                ModsForFNF V-Slice
              </h4>
              <p className="text-muted-foreground text-sm">
                Безопасная платформа для обмена модами Friday Night Funkin' V-Slice
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Правила</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-primary" />
                  Только архивы ZIP, RAR, 7Z
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-primary" />
                  Автоматическая проверка на вирусы
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-primary" />
                  Запрет на вредоносный контент
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-primary" />
                  Уважение к авторским правам
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Безопасность</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="ShieldCheck" size={18} className="text-primary" />
                  <span className="text-muted-foreground">Все моды проверены</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Lock" size={18} className="text-primary" />
                  <span className="text-muted-foreground">SSL шифрование</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="UserCheck" size={18} className="text-primary" />
                  <span className="text-muted-foreground">Модерация контента</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ModsForFNF V-Slice. Безопасная платформа для модов FNF.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
