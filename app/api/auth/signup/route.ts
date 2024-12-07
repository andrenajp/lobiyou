import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/auth/validation";
import { createUser, getUserByEmail } from "@/lib/auth/user";
import { SignJWT } from "jose";
import { getJwtSecret } from "@/lib/auth/config";
import { sendVerificationEmail } from '@/lib/mailer';
import { createVerificationToken } from '@/lib/auth/verification';

const secret = getJwtSecret();

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = signupSchema.parse(body);

    // Vérifier si l'email existe déjà
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    const user = await createUser({ name, email, password, role });

    console.log('Created user:', {
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Créer le token de vérification
    const verificationToken = await createVerificationToken(user.id);

    // Créer le token JWT pour l'authentification
    const token = await new SignJWT({ 
      userId: user.id,
      email: user.email,
      role: user.role 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    // Définir le cookie
    const response = NextResponse.json(
      { 
        success: true, 
        message: "Inscription réussie",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          userType: user.role,
        }
      },
      { status: 201 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 // 24 heures
    });

    // Envoyer l'email de validation
    await sendVerificationEmail(email, verificationToken);

    return response;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}