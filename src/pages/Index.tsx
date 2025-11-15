import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
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
  studio?: string;
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
    verified: true,
    studio: "Funk Studios"
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
    verified: true,
    studio: "Retro Games"
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

type Language = 'en' | 'ru';

const translations = {
  en: {
    title: "Mods for FNF V-Slice",
    nav: {
      home: "Home",
      faq: "FAQ",
      profile: "Profile",
      signIn: "Sign In"
    },
    hero: {
      badge: "Virus Protection",
      title: "Safe Mods for FNF V-Slice",
      subtitle: "Upload and share mods with automatic security verification. Only verified content.",
      uploadMod: "Upload Mod",
      rules: "Publishing Rules",
      stats: {
        downloads: "downloads",
        users: "users",
        safe: "100% safe"
      }
    },
    catalog: {
      title: "Mod Catalog",
      search: "Search mods...",
      all: "All",
      characters: "Characters",
      songs: "Songs",
      visual: "Visual",
      verified: "Verified",
      download: "Download"
    },
    upload: {
      title: "Upload Mod",
      description: "Supported formats: ZIP, RAR, 7Z",
      modName: "Mod Name*",
      modNamePlaceholder: "Enter mod name",
      category: "Category*",
      description2: "Description",
      descriptionPlaceholder: "Describe your mod...",
      studio: "Studio (optional)",
      studioPlaceholder: "Your studio name",
      thumbnail: "Thumbnail Image*",
      archiveFile: "Mod Archive*",
      securityNote: "Your file will be scanned by antivirus before publication",
      required: "All fields marked with * are required",
      uploadButton: "Upload"
    },
    auth: {
      title: "Registration / Sign In",
      subtitle: "Create an account to upload mods",
      email: "Email",
      password: "Password",
      signIn: "Sign In"
    },
    rules: {
      title: "Publishing Rules",
      description: "Follow these rules to keep the platform safe and clean",
      list: [
        "Only real mods - no fake uploads allowed",
        "Thumbnail image is required for every mod",
        "No fake accounts or bot users",
        "Archive file (ZIP/RAR/7Z) is mandatory",
        "No duplicate or stolen content",
        "Accurate mod descriptions required",
        "Respect copyrights and credits"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions",
      search: "Search FAQ...",
      items: [
        {
          question: "What file formats are supported?",
          answer: "We only accept archives in ZIP, RAR, and 7Z formats. This ensures security and standardization of uploads."
        },
        {
          question: "How does virus scanning work?",
          answer: "Every uploaded mod is automatically scanned by our security system before publication. Mods with suspicious content are rejected."
        },
        {
          question: "Why is a thumbnail required?",
          answer: "Thumbnail images help users quickly browse and find mods. It prevents fake or empty uploads and improves search experience."
        },
        {
          question: "What if my mod is rejected?",
          answer: "You will receive a notification with the reason for rejection. Usually, it's related to detected security threats or rule violations."
        },
        {
          question: "How do I get verified author status?",
          answer: "Upload at least 3 mods without violations and receive positive feedback from the community. Verification happens automatically."
        }
      ]
    },
    footer: {
      description: "Safe platform for sharing Friday Night Funkin' V-Slice mods",
      rulesTitle: "Rules",
      rules: [
        "Only ZIP, RAR, 7Z archives",
        "Automatic virus scanning",
        "No malicious content",
        "Respect copyright"
      ],
      securityTitle: "Security",
      security: [
        "All mods verified",
        "SSL encryption",
        "Content moderation"
      ],
      copyright: "© 2024 Mods for FNF V-Slice. Safe platform for FNF mods."
    }
  },
  ru: {
    title: "Моды для FNF V-Slice",
    nav: {
      home: "Главная",
      faq: "FAQ",
      profile: "Профиль",
      signIn: "Войти"
    },
    hero: {
      badge: "Защита от вирусов",
      title: "Безопасные моды для FNF V-Slice",
      subtitle: "Загружайте и делитесь модами с автоматической проверкой безопасности. Только проверенный контент.",
      uploadMod: "Загрузить мод",
      rules: "Правила публикации",
      stats: {
        downloads: "загрузок",
        users: "пользователей",
        safe: "100% безопасно"
      }
    },
    catalog: {
      title: "Каталог модов",
      search: "Поиск модов...",
      all: "Все",
      characters: "Персонажи",
      songs: "Песни",
      visual: "Визуал",
      verified: "Проверено",
      download: "Скачать"
    },
    upload: {
      title: "Загрузка мода",
      description: "Поддерживаются форматы: ZIP, RAR, 7Z",
      modName: "Название мода*",
      modNamePlaceholder: "Введите название мода",
      category: "Категория*",
      description2: "Описание",
      descriptionPlaceholder: "Опишите ваш мод...",
      studio: "Студия (опционально)",
      studioPlaceholder: "Название вашей студии",
      thumbnail: "Обложка*",
      archiveFile: "Архив мода*",
      securityNote: "Ваш файл будет проверен антивирусом перед публикацией",
      required: "Все поля с * обязательны",
      uploadButton: "Загрузить"
    },
    auth: {
      title: "Регистрация / Вход",
      subtitle: "Создайте аккаунт для загрузки модов",
      email: "Email",
      password: "Пароль",
      signIn: "Войти"
    },
    rules: {
      title: "Правила публикации",
      description: "Следуйте этим правилам для безопасности платформы",
      list: [
        "Только настоящие моды - фейковые загрузки запрещены",
        "Обложка обязательна для каждого мода",
        "Запрещены фейковые аккаунты и боты",
        "Файл архива (ZIP/RAR/7Z) обязателен",
        "Запрещены дубликаты и краденый контент",
        "Требуется точное описание мода",
        "Уважайте авторские права и указывайте авторов"
      ]
    },
    faq: {
      title: "Вопросы и ответы",
      subtitle: "Найдите ответы на частые вопросы",
      search: "Поиск в FAQ...",
      items: [
        {
          question: "Какие форматы файлов поддерживаются?",
          answer: "Мы принимаем только архивы в форматах ZIP, RAR и 7Z. Это обеспечивает безопасность и стандартизацию загрузок."
        },
        {
          question: "Как работает проверка на вирусы?",
          answer: "Каждый загруженный мод автоматически сканируется нашей системой безопасности перед публикацией. Моды с подозрительным содержимым отклоняются."
        },
        {
          question: "Почему обложка обязательна?",
          answer: "Обложки помогают пользователям быстро находить моды. Это предотвращает фейковые загрузки и улучшает поиск."
        },
        {
          question: "Что делать, если мой мод отклонили?",
          answer: "Вы получите уведомление с причиной отклонения. Обычно это связано с обнаруженными угрозами безопасности или нарушением правил."
        },
        {
          question: "Как получить статус верифицированного автора?",
          answer: "Загрузите минимум 3 мода без нарушений, получите положительные отзывы от сообщества. Верификация происходит автоматически."
        }
      ]
    },
    footer: {
      description: "Безопасная платформа для обмена модами Friday Night Funkin' V-Slice",
      rulesTitle: "Правила",
      rules: [
        "Только архивы ZIP, RAR, 7Z",
        "Автоматическая проверка на вирусы",
        "Запрет на вредоносный контент",
        "Уважение к авторским правам"
      ],
      securityTitle: "Безопасность",
      security: [
        "Все моды проверены",
        "SSL шифрование",
        "Модерация контента"
      ],
      copyright: "© 2024 Моды для FNF V-Slice. Безопасная платформа для модов FNF."
    }
  }
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [faqSearch, setFaqSearch] = useState('');
  const [lang, setLang] = useState<Language>('en');
  const [showRules, setShowRules] = useState(false);

  const t = translations[lang];

  const filteredMods = MOCK_MODS.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mod.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredFaq = t.faq.items.filter(item =>
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
              <h1 className="text-2xl font-bold gradient-text">{t.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1 bg-muted rounded-lg p-1">
                <Button 
                  size="sm" 
                  variant={lang === 'en' ? 'default' : 'ghost'}
                  onClick={() => setLang('en')}
                  className="text-xs"
                >
                  EN
                </Button>
                <Button 
                  size="sm" 
                  variant={lang === 'ru' ? 'default' : 'ghost'}
                  onClick={() => setLang('ru')}
                  className="text-xs"
                >
                  RU
                </Button>
              </div>
              <Button variant="ghost" className="hidden md:flex items-center gap-2">
                <Icon name="Home" size={18} />
                {t.nav.home}
              </Button>
              <Button variant="ghost" className="hidden md:flex items-center gap-2">
                <Icon name="HelpCircle" size={18} />
                {t.nav.faq}
              </Button>
              {isAuthenticated ? (
                <Button variant="default" className="flex items-center gap-2">
                  <Icon name="User" size={18} />
                  {t.nav.profile}
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="flex items-center gap-2">
                      <Icon name="LogIn" size={18} />
                      {t.nav.signIn}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t.auth.title}</DialogTitle>
                      <DialogDescription>
                        {t.auth.subtitle}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label>{t.auth.email}</Label>
                        <Input type="email" placeholder="your@email.com" />
                      </div>
                      <div>
                        <Label>{t.auth.password}</Label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <Button className="w-full" onClick={() => setIsAuthenticated(true)}>
                        {t.auth.signIn}
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
              {t.hero.badge}
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
              {t.hero.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg hover-scale">
                    <Icon name="Upload" size={20} className="mr-2" />
                    {t.hero.uploadMod}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t.upload.title}</DialogTitle>
                    <DialogDescription>
                      {t.upload.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>{t.upload.modName}</Label>
                      <Input placeholder={t.upload.modNamePlaceholder} />
                    </div>
                    <div>
                      <Label>{t.upload.category}</Label>
                      <Input placeholder="Character / Song / Visual" />
                    </div>
                    <div>
                      <Label>{t.upload.description2}</Label>
                      <Textarea placeholder={t.upload.descriptionPlaceholder} rows={4} />
                    </div>
                    <div>
                      <Label>{t.upload.studio}</Label>
                      <Input placeholder={t.upload.studioPlaceholder} />
                    </div>
                    <div>
                      <Label>{t.upload.thumbnail}</Label>
                      <Input type="file" accept="image/*" />
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF (max 5MB)</p>
                    </div>
                    <div>
                      <Label>{t.upload.archiveFile}</Label>
                      <Input type="file" accept=".zip,.rar,.7z" />
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                      <Icon name="ShieldCheck" size={20} className="text-primary mt-1" />
                      <p className="text-sm text-muted-foreground">
                        {t.upload.securityNote}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <Icon name="AlertCircle" size={20} className="text-destructive mt-1" />
                      <p className="text-sm text-destructive">
                        {t.upload.required}
                      </p>
                    </div>
                    <Button className="w-full">
                      {t.upload.uploadButton}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={showRules} onOpenChange={setShowRules}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="text-lg hover-scale">
                    <Icon name="BookOpen" size={20} className="mr-2" />
                    {t.hero.rules}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t.rules.title}</DialogTitle>
                    <DialogDescription>
                      {t.rules.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 pt-4">
                    {t.rules.list.map((rule, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{rule}</p>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center justify-center gap-8 pt-8 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Download" size={18} className="text-primary" />
                <span className="text-muted-foreground">43,450 {t.hero.stats.downloads}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={18} className="text-secondary" />
                <span className="text-muted-foreground">12,300 {t.hero.stats.users}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheck" size={18} className="text-primary" />
                <span className="text-muted-foreground">{t.hero.stats.safe}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 space-y-4">
            <h3 className="text-3xl font-bold">{t.catalog.title}</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t.catalog.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">{t.catalog.all}</TabsTrigger>
                  <TabsTrigger value="Character">{t.catalog.characters}</TabsTrigger>
                  <TabsTrigger value="Song">{t.catalog.songs}</TabsTrigger>
                  <TabsTrigger value="Visual">{t.catalog.visual}</TabsTrigger>
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
                      {t.catalog.verified}
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
                    {mod.studio && (
                      <span className="text-xs ml-2 text-muted-foreground">• {mod.studio}</span>
                    )}
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
                    {t.catalog.download}
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
              <h3 className="text-3xl font-bold">{t.faq.title}</h3>
              <p className="text-muted-foreground">{t.faq.subtitle}</p>
            </div>
            
            <div className="mb-6 relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t.faq.search}
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
                {t.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {t.footer.description}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.footer.rulesTitle}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.footer.rules.map((rule, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-primary" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.footer.securityTitle}</h4>
              <div className="space-y-3">
                {t.footer.security.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Icon name="ShieldCheck" size={18} className="text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
