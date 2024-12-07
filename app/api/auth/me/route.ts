import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getUserById } from "@/lib/auth/user";
import { getJwtSecret } from "@/lib/auth/config";

const secret = getJwtSecret();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token.value, secret);
    if (!payload.userId || typeof payload.userId !== 'string') {
      return NextResponse.json(
        { error: "Token invalide" },
        { status: 401 }
      );
    }

    const userId = payload.userId;
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification:", error);
    return NextResponse.json(
      { error: "Erreur d'authentification" },
      { status: 401 }
    );
  }
}
