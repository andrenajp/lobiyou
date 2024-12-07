import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/verification";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token manquant" },
        { status: 400 }
      );
    }

    const userId = await verifyToken(token);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email vérifié avec succès"
    });
  } catch (error) {
    console.error("Erreur lors de la vérification:", error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification" },
      { status: 500 }
    );
  }
}
