import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/auth/validation";
import { createUser, getUserByEmail } from "@/lib/auth/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, userType } = signupSchema.parse(body);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    const user = await createUser({ name, email, password, userType });

    return NextResponse.json(
      {
        user,
        message: "Utilisateur créé avec succès",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}