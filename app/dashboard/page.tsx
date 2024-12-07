"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

interface User {
  id: string;
  email: string;
  name: string;
  userType: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          router.push("/login");
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bienvenue, {user.name}!</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Type d'utilisateur:</span> {user.userType}</p>
        </div>
      </Card>
    </div>
  );
}
