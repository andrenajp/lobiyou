import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/auth/validation";
import { createUser, getUserByEmail } from "@/lib/auth/user";
import { SignJWT } from "jose";
import { getJwtSecret } from "@/lib/auth/config";
import { sendVerificationEmail } from '@/lib/mailer';
const secret = getJwtSecret();

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = signupSchema.parse(body);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    const user = await createUser({ name, email, password, role });

    // Créer le token JWT
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
          userType: user.userType,
        }
      },
      { status: 201 }
    );

    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 heures
    });

    console.log("User email:", email);
    console.log("JWT token:", token);

    // Envoyer l'email de validation
    await sendVerificationEmail(email, token);

    return response;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}