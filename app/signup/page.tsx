"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const signupSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  userType: z.enum(["DONOR", "PROJECT_OWNER"], {
    required_error: "Veuillez sélectionner un type d'utilisateur",
  }),
})

type SignupForm = z.infer<typeof signupSchema>

export default function SignUp() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription")
      }

      toast({
        title: "Inscription réussie !",
        description: "Vous pouvez maintenant vous connecter.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Link>
      </Button>

      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Créer votre compte</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nom complet
            </label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Votre nom"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="votre@email.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">
              Type de compte
            </label>
            <RadioGroup
              defaultValue="DONOR"
              {...register("userType")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="DONOR"
                  id="donor"
                  className="peer sr-only"
                />
                <label
                  htmlFor="donor"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-sm font-medium">Donateur/Investisseur</span>
                </label>
              </div>
              <div>
                <RadioGroupItem
                  value="PROJECT_OWNER"
                  id="project-owner"
                  className="peer sr-only"
                />
                <label
                  htmlFor="project-owner"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-sm font-medium">Porteur de projet</span>
                </label>
              </div>
            </RadioGroup>
            {errors.userType && (
              <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Déjà inscrit ?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}