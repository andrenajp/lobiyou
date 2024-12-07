import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <p className="text-sm text-muted-foreground">
              Lobi You est une plateforme de financement participatif qui connecte
              les créateurs et leur communauté.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/discover" className="text-muted-foreground hover:text-primary">
                  Découvrir les projets
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-muted-foreground hover:text-primary">
                  Lancer un projet
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">
                  Comment ça marche
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Aide</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Inscrivez-vous à notre newsletter pour suivre nos actualités
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Lobi You. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}