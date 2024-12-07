import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Zap, Gift, CreditCard, Calendar } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
          Donnez vie à vos projets avec Lobi You
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          La plateforme de financement participatif qui connecte les créateurs, 
          les associations et leur communauté pour réaliser des projets inspirants.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/create">
              Lancer votre projet <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/discover">
              Découvrir les projets
            </Link>
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Pour tous les créateurs</h3>
            <p className="text-muted-foreground">
              Artistes, associations, entrepreneurs sociaux - notre plateforme est ouverte à tous les porteurs de projets innovants.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Zap className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Simple et efficace</h3>
            <p className="text-muted-foreground">
              Créez votre campagne en quelques minutes et gérez vos dons facilement grâce à notre interface intuitive.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Heart className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Communauté engagée</h3>
            <p className="text-muted-foreground">
              Connectez-vous avec vos supporters et partagez votre aventure à travers du contenu exclusif.
            </p>
          </Card>
        </div>
      </section>

      {/* Donation Methods Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Comment soutenir un projet ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Gift className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Don gratuit</h3>
            <p className="text-muted-foreground mb-4">
              Soutenez les projets gratuitement en regardant des publicités. Chaque visionnage génère un micro-don pour le créateur.
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>✓ Aucun frais pour vous</li>
              <li>✓ Publicités courtes</li>
              <li>✓ Impact réel sur les projets</li>
            </ul>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CreditCard className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Don classique</h3>
            <p className="text-muted-foreground mb-4">
              Faites un don ponctuel du montant de votre choix. Paiement sécurisé et reçu fiscal pour les associations éligibles.
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>✓ Montant libre</li>
              <li>✓ Paiement sécurisé</li>
              <li>✓ Reçu fiscal possible</li>
            </ul>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Calendar className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Soutien mensuel</h3>
            <p className="text-muted-foreground mb-4">
              Devenez mécène en soutenant régulièrement vos créateurs préférés. Accédez à du contenu exclusif et des avantages spéciaux.
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>✓ Engagement flexible</li>
              <li>✓ Contenu exclusif</li>
              <li>✓ Relation privilégiée</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-card rounded-xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Prêt à démarrer votre projet ?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Rejoignez notre communauté de créateurs et donnez vie à vos idées grâce au soutien participatif.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Créer votre compte gratuitement
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}