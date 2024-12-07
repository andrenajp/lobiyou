import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "Festival de musique éco-responsable",
    description: "Un festival qui allie musique et conscience environnementale",
    goal: 15000,
    raised: 8750,
    daysLeft: 12,
    category: "Culture",
  },
  {
    id: 2,
    title: "Jardin communautaire urbain",
    description: "Création d'un espace vert participatif au cœur de la ville",
    goal: 5000,
    raised: 4200,
    daysLeft: 8,
    category: "Environnement",
  },
  {
    id: 3,
    title: "Application mobile solidaire",
    description: "Une app pour connecter les bénévoles aux associations locales",
    goal: 10000,
    raised: 3000,
    daysLeft: 20,
    category: "Tech",
  },
]

export default function DiscoverProjects() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-8">Découvrez les projets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_PROJECTS.map((project) => (
          <Card key={project.id} className="p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                {project.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            
            <div className="space-y-2 mb-4">
              <Progress value={(project.raised / project.goal) * 100} />
              <div className="flex justify-between text-sm">
                <span>{project.raised}€ collectés</span>
                <span>Objectif: {project.goal}€</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {project.daysLeft} jours restants
              </span>
              <Button asChild>
                <Link href={`/projects/${project.id}`}>
                  Voir le projet
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}