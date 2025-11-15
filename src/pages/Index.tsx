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
    question: "What file formats are supported?",
    answer: "We only accept archives in ZIP, RAR, and 7Z formats. This ensures security and standardization of uploads."
  },
  {
    question: "How does virus scanning work?",
    answer: "Every uploaded mod is automatically scanned by our security system before publication. Mods with suspicious content are rejected."
  },
  {
    question: "Can I upload a mod without registration?",
    answer: "No, registration is required to upload mods. This helps us maintain content quality and contact authors."
  },
  {
    question: "What should I do if my mod is rejected?",
    answer: "You will receive a notification with the reason for rejection. Usually, it's related to detected security threats or rule violations."
  },
  {
    question: "How do I get verified author status?",
    answer: "Upload at least 3 mods without violations and receive positive feedback from the community. Verification happens automatically."
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
              <h1 className="text-2xl font-bold gradient-text">Mods for FNF V-Slice</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden md:flex items-center gap-2">
                <Icon name="Home" size={18} />
                Home
              </Button>
              <Button variant="ghost" className="hidden md:flex items-center gap-2">
                <Icon name="HelpCircle" size={18} />
                FAQ
              </Button>
              {isAuthenticated ? (
                <Button variant="default" className="flex items-center gap-2">
                  <Icon name="User" size={18} />
                  Profile
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="flex items-center gap-2">
                      <Icon name="LogIn" size={18} />
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registration / Sign In</DialogTitle>
                      <DialogDescription>
                        Create an account to upload mods
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder="your@email.com" />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <Button className="w-full" onClick={() => setIsAuthenticated(true)}>
                        Sign In
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
              Virus Protection
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
              Safe Mods for FNF V-Slice
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload and share mods with automatic security verification. Only verified content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg hover-scale">
                    <Icon name="Upload" size={20} className="mr-2" />
                    Upload Mod
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Mod</DialogTitle>
                    <DialogDescription>
                      Supported formats: ZIP, RAR, 7Z
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>Mod Name</Label>
                      <Input placeholder="Enter name" />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input placeholder="Character / Song / Visual" />
                    </div>
                    <div>
                      <Label>Archive File</Label>
                      <Input type="file" accept=".zip,.rar,.7z" />
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                      <Icon name="ShieldCheck" size={20} className="text-primary mt-1" />
                      <p className="text-sm text-muted-foreground">
                        Your file will be automatically scanned for viruses before publication
                      </p>
                    </div>
                    <Button className="w-full">
                      Upload and Verify
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="text-lg hover-scale">
                <Icon name="Download" size={20} className="mr-2" />
                Browse Mods
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
          <div className="relative flex-1 w-full">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search mods by name or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Character">Characters</TabsTrigger>
              <TabsTrigger value="Song">Songs</TabsTrigger>
              <TabsTrigger value="Visual">Visual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMods.map((mod) => (
            <Card key={mod.id} className="hover-glow overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={mod.thumbnail}
                  alt={mod.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {mod.verified && (
                  <Badge className="absolute top-2 right-2 bg-primary/90">
                    <Icon name="CheckCircle2" size={14} className="mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span>{mod.title}</span>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Icon name="Star" size={16} fill="currentColor" />
                    {mod.rating}
                  </div>
                </CardTitle>
                <CardDescription>by {mod.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Download" size={16} />
                    {mod.downloads.toLocaleString()}
                  </div>
                  <Badge variant="secondary">{mod.category}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMods.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">Nothing found</h3>
            <p className="text-muted-foreground">Try changing your search query or filters</p>
          </div>
        )}
      </section>

      <section className="bg-card/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Frequently Asked Questions</h2>
            <p className="text-center text-muted-foreground mb-8">Find answers to common questions</p>
            
            <div className="mb-6">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left font-semibold">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaq.length === 0 && (
              <div className="text-center py-8">
                <Icon name="HelpCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No questions found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">Made with love for the FNF community</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
