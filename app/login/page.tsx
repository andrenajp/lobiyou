"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
})

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Identifiants invalides")
      }

      toast({
        title: "Connexion réussie !",
        description: "Vous allez être redirigé...",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Email ou mot de passe incorrect.",
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
        <h1 className="text-3xl font-bold mb-6">Connexion</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>

          <div className="space-y-2 text-center text-sm">
            <p className="text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                S'inscrire
              </Link>
            </p>
            <Link
              href="/forgot-password"
              className="text-primary hover:underline block"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}