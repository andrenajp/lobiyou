"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme/mode-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Plus, Search } from "lucide-react"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold">
            Lobi You
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/discover"
              className={`text-sm ${
                pathname === "/discover"
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Search className="w-4 h-4 inline-block mr-1" />
              Découvrir
            </Link>
            <Link
              href="/create"
              className={`text-sm ${
                pathname === "/create"
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Plus className="w-4 h-4 inline-block mr-1" />
              Créer un projet
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/favorites">
              <Heart className="w-5 h-5" />
              <span className="sr-only">Favoris</span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Connexion</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Inscription</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}