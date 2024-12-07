"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateProject() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Projet en cours de création",
      description: "Cette fonctionnalité sera bientôt disponible.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Link>
      </Button>

      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Créer votre projet</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Titre du projet
            </label>
            <Input id="title" placeholder="Donnez un titre accrocheur à votre projet" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Décrivez votre projet en détail"
              rows={6}
            />
          </div>

          <div>
            <label htmlFor="goal" className="block text-sm font-medium mb-2">
              Objectif de financement (€)
            </label>
            <Input
              id="goal"
              type="number"
              min="1"
              placeholder="Montant souhaité"
            />
          </div>

          <Button type="submit" className="w-full">
            Créer le projet
          </Button>
        </form>
      </Card>
    </div>
  )
}